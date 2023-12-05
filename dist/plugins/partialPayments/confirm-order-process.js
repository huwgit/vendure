"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.confirmOrderProcess = void 0;
exports.confirmOrderProcess = {
    transitions: {
        ArrangingPayment: {
            to: ['CreateInvoice'],
        },
        CreateInvoice: {
            to: ['ArrangingPayment'],
        },
    },
};
