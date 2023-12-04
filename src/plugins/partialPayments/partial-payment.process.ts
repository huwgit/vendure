import {
    PaymentProcess,
    PaymentState,
    orderTotalIsCovered,
    OrderService,
    HistoryService,
} from '@vendure/core'
import { HistoryEntryType } from '@vendure/common/lib/generated-types';

declare module '@vendure/core/dist/service/helpers/payment-state-machine/payment-state' {
    interface PaymentStates {
        Authorized: never
        Settled: never
        Declined: never
    }
}

let orderService: OrderService
let historyService: HistoryService

export const PartialPaymentProcess: PaymentProcess<PaymentState> = {
    transitions: {
        Created: {
            to: ['Authorized', 'Settled', 'Declined', 'Error', 'Cancelled'],
        },
        Authorized: {
            to: ['Settled', 'Error', 'Cancelled'],
        },
        Settled: {
            to: ['Cancelled'],
        },
        Declined: {
            to: ['Cancelled'],
        },
        Error: {
            to: ['Cancelled'],
        },
        Cancelled: {
            to: [],
        },
    },
    async init(injector) {
        orderService = injector.get(OrderService)
        historyService = injector.get(HistoryService)
    },
    async onTransitionStart(_fromState, _toState, _data) {
        // nothing here by default
    },
    async onTransitionEnd(fromState, toState, data) {
        const { ctx, order } = data
        order.payments = await orderService.getOrderPayments(ctx, order.id)

        await historyService.createHistoryEntryForOrder({
            ctx: data.ctx,
            orderId: data.order.id,
            type: HistoryEntryType.ORDER_PAYMENT_TRANSITION,
            data: {
                paymentId: data.payment.id,
                from: fromState,
                to: toState,
            },
        })

        if (
            order.state !== 'PaymentSettled' &&
            orderTotalIsCovered(order, 'Settled')
        ) {
            await orderService.transitionToState(
                ctx,
                order.id,
                'PaymentSettled'
            )
        } else if (
            order.state !== 'PaymentAuthorized' &&
            orderTotalIsCovered(order, ['Authorized', 'Settled'])
        ) {
            await orderService.transitionToState(
                ctx,
                order.id,
                'PaymentAuthorized'
            )
        } else {
            // Since default order process doesnot allow
            // ArrangingPayment -> ArrangingAdditionalPayment
            // so we need to go to another intermediate state
            await orderService.transitionToState(
                ctx,
                order.id,
                'PaymentAuthorized'
            )
            await orderService.transitionToState(
                ctx,
                order.id,
                'ArrangingAdditionalPayment'
            )
        }
    },
}
