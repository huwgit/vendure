"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ADMIN_API_EXTENSION = void 0;
const graphql_tag_1 = __importDefault(require("graphql-tag"));
exports.ADMIN_API_EXTENSION = (0, graphql_tag_1.default) `
  extend type Query {
    variantStockMovements(
      id: ID!
      options: StockMovementListOptions!
    ): StockMovementList!
  }
`;
