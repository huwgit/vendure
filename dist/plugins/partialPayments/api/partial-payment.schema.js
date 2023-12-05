"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PARTIAL_PAYMENT_ADMIN_EXTENSION = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.PARTIAL_PAYMENT_ADMIN_EXTENSION = (0, graphql_tag_1.default) `
    input ManualPartialPaymentInput {
        orderId: ID!
        method: String!
        transactionId: String
        metadata: JSON!
        amount: Int!
    }

    extend type Mutation {
        addPartialManualPaymentToOrder(
            input: ManualPartialPaymentInput
        ): AddManualPaymentToOrderResult
    }
`;
