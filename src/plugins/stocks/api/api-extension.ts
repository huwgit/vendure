import gql from "graphql-tag";

export const ADMIN_API_EXTENSION = gql`
  extend type Query {
    variantStockMovements(
      id: ID!
      options: StockMovementListOptions!
    ): StockMovementList!
  }
`;
