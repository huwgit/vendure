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
    TransactionalConnection,
    Surcharge,
} from '@vendure/core/'

@Resolver()
export class RoundOffPaymentAdminResolver {
    constructor(
        private orderService: OrderService,
        private connection: TransactionalConnection
    ) {}

    @Transaction()
    @Mutation()
    @Allow(Permission.UpdateOrder)
    async addSurchageToOrder(
        @Ctx() ctx: RequestContext,
        @Args('input')
        input: {
            orderId: ID
            amount: number
        }
    ) {
        const order = await this.orderService.findOne(ctx, input.orderId)
        if (!order) {
            throw new EntityNotFoundError('Order', input.orderId)
        }
        const theSurcharge = await this.connection.getRepository(ctx, Surcharge).findOne({
            where:{
                sku: 'RoundOff',
                order: {
                    id: order.id
                }
            },
            relations: ['order']
        });
        if(theSurcharge){
            await this.orderService.removeSurchargeFromOrder(ctx, order.id, theSurcharge.id);
            this.orderService.addNoteToOrder(ctx, {
                note: `Removed Round Off Payment of ${theSurcharge.listPrice}`,
                isPublic: false,
                id: order.id,
            });
        }
        const finalOrder = await this.orderService.findOne(ctx, input.orderId);
        if(!finalOrder){
            throw new EntityNotFoundError('Order', input.orderId)
        }
        const orderTotal = finalOrder.totalWithTax;
        const orderSurcharge = input.amount - orderTotal;
        const updatedOrder = await this.orderService.addSurchargeToOrder(
            ctx,
            order.id,
            {
                description: 'Round Off Payment',
                sku: 'RoundOff',
                listPrice: orderSurcharge,
            }
        );
        this.orderService.addNoteToOrder(ctx, {
            note: `Added Round Off Payment of ${orderSurcharge}`,
            isPublic: false,
            id: order.id,
        });
        return updatedOrder;
    }
}
