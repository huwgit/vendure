import {
    LanguageCode,
    PaymentMethodHandler,
    TransactionalConnection,
} from '@vendure/core'

let connection: TransactionalConnection

export const TestPartialPaymentHandler = new PaymentMethodHandler({
    code: 'partial',
    description: [{ languageCode: LanguageCode.en, value: 'Partial Payment' }],
    args: {},

    init: injector => {
        connection = injector.get(TransactionalConnection)
    },

    async createPayment(_ctx, _order, _amount, _args, metadata) {
        return {
            amount: metadata.amount,
            state: 'Settled',
            metadata: {},
        }
    },

    async settlePayment() {
        return { success: true }
    },
})
