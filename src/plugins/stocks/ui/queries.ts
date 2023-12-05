import gql from "graphql-tag";

export const GET_STOCK_MOVEMENTS_FOR_VARIANT = gql`
  query GetStockMovementsForVariant(
    $id: ID!
    $options: StockMovementListOptions!
  ) {
    variantStockMovements(id: $id, options: $options) {
      items {
        ... on StockAdjustment {
          id
          createdAt
          type
          quantity
        }
        ... on Allocation {
          id
          createdAt
          type
          quantity
          orderLine {
            order {
              id
              code
            }
          }
        }
        ... on Sale {
          id
          createdAt
          type
          quantity
        }
        ... on Cancellation {
          id
          createdAt
          type
          quantity
          orderLine {
            order {
              id
              code
            }
          }
        }
        ... on Return {
          id
          createdAt
          type
          quantity
        }
        ... on Release {
          id
          createdAt
          type
          quantity
        }
      }
      totalItems
    }
  }
`;
