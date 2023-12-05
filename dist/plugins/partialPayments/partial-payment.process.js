"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartialPaymentProcess = void 0;
const core_1 = require("@vendure/core");
const generated_types_1 = require("@vendure/common/lib/generated-types");
let orderService;
let historyService;
exports.PartialPaymentProcess = {
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
        orderService = injector.get(core_1.OrderService);
        historyService = injector.get(core_1.HistoryService);
    },
    async onTransitionStart(_fromState, _toState, _data) {
        // nothing here by default
    },
    async onTransitionEnd(fromState, toState, data) {
        const { ctx, order } = data;
        order.payments = await orderService.getOrderPayments(ctx, order.id);
        await historyService.createHistoryEntryForOrder({
            ctx: data.ctx,
            orderId: data.order.id,
            type: generated_types_1.HistoryEntryType.ORDER_PAYMENT_TRANSITION,
            data: {
                paymentId: data.payment.id,
                from: fromState,
                to: toState,
            },
        });
        if (order.state !== 'PaymentSettled' &&
            (0, core_1.orderTotalIsCovered)(order, 'Settled')) {
            await orderService.transitionToState(ctx, order.id, 'PaymentSettled');
        }
        else if (order.state !== 'PaymentAuthorized' &&
            (0, core_1.orderTotalIsCovered)(order, ['Authorized', 'Settled'])) {
            await orderService.transitionToState(ctx, order.id, 'PaymentAuthorized');
        }
        else {
            // Since default order process doesnot allow
            // ArrangingPayment -> ArrangingAdditionalPayment
            // so we need to go to another intermediate state
            await orderService.transitionToState(ctx, order.id, 'PaymentAuthorized');
            await orderService.transitionToState(ctx, order.id, 'ArrangingAdditionalPayment');
        }
    },
};
