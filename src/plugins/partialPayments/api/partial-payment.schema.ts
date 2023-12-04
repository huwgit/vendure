import gql from 'graphql-tag'

export const PARTIAL_PAYMENT_ADMIN_EXTENSION = gql`
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
`
