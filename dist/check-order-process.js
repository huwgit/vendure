"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkOrderProcess = void 0;
exports.checkOrderProcess = {
    transitions: {
        Draft: {
            to: ['CheckOrder'],
            mergeStrategy: 'replace',
        },
        CheckOrder: {
            to: ['ArrangingPayment', 'Draft'],
        },
    },
};
