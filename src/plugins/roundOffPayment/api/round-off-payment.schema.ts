import gql from 'graphql-tag'

export const ROUND_OFF_PAYMENT_ADMIN_EXTENSION = gql`
    input OrderSurchageInput {
        orderId: ID!
        amount: Int!
    }

    extend type Mutation {
        addSurchageToOrder(
            input: OrderSurchageInput!
        ): Order
    }
`
