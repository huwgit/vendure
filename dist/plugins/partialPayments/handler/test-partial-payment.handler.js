"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestPartialPaymentHandler = void 0;
const core_1 = require("@vendure/core");
let connection;
exports.TestPartialPaymentHandler = new core_1.PaymentMethodHandler({
    code: 'partial',
    description: [{ languageCode: core_1.LanguageCode.en, value: 'Partial Payment' }],
    args: {},
    init: injector => {
        connection = injector.get(core_1.TransactionalConnection);
    },
    async createPayment(_ctx, _order, _amount, _args, metadata) {
        return {
            amount: metadata.amount,
            state: 'Settled',
            metadata: {},
        };
    },
    async settlePayment() {
        return { success: true };
    },
});
