import { Resolver, Mutation, Args } from '@nestjs/graphql'
import {
    Transaction,
    Allow,
    Permission,
    RequestContext,
    Ctx,
    ID,
    OrderService,
    EntityNotFoundError,
    ManualPaymentStateError,
    InternalServerError,
    PaymentService,
    TransactionalConnection,
    assertFound,
    Order,
} from '@vendure/core/'
import { summate } from '@vendure/common/lib/shared-utils'
import { OrderModification } from '@vendure/core/dist/entity/order-modification/order-modification.entity'

@Resolver()
export class PartialPaymentResolver {
    constructor(
        private orderService: OrderService,
        private paymentService: PaymentService,
        private connection: TransactionalConnection
    ) {}

    @Transaction()
    @Mutation()
    @Allow(Permission.UpdateOrder)
    async addPartialManualPaymentToOrder(
        @Ctx() ctx: RequestContext,
        @Args('input')
        input: {
            orderId: ID
            method: string
            transactionId?: string
            metadata: string
            amount: number
        }
    ) {
        const order = await this.orderService.findOne(ctx, input.orderId)
        if (!order) {
            throw new EntityNotFoundError('Order', input.orderId)
        }

        if (
            order.state !== 'ArrangingAdditionalPayment' &&
            order.state !== 'ArrangingPayment'
        ) {
            return new ManualPaymentStateError()
        }
        const existingPayments = await this.orderService.getOrderPayments(
            ctx,
            order.id
        )
        order.payments = existingPayments
        const { amount, ...payment_input } = input
        const modifications = await this.orderService.getOrderModifications(
            ctx,
            order.id
        )
        const unsettledModifications = modifications.filter(m => !m.isSettled)
        if (0 < unsettledModifications.length) {
            const outstandingModificationsTotal = summate(
                unsettledModifications,
                'priceChange'
            )
            if (outstandingModificationsTotal !== amount) {
                throw new InternalServerError(
                    `The outstanding order amount (${amount}) should equal the unsettled OrderModifications total (${outstandingModificationsTotal})`
                )
            }
        }

        const payment = await this.paymentService.createManualPayment(
            ctx,
            order,
            amount,
            payment_input
        )
        await this.connection
            .getRepository(ctx, Order)
            .createQueryBuilder('order')
            .relation('payments')
            .of(order)
            .add(payment)
        for (const modification of unsettledModifications) {
            modification.payment = payment
            await this.connection
                .getRepository(ctx, OrderModification)
                .save(modification)
        }
        return assertFound(this.orderService.findOne(ctx, order.id))
    }
}
