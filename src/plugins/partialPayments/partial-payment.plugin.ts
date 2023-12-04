import {
  configureDefaultOrderProcess,
  Order,
  OrderPlacedStrategy,
  OrderState,
  PluginCommonModule,
  RequestContext,
  StockAllocationStrategy,
  VendurePlugin,
  defaultOrderProcess,
} from "@vendure/core";
import { TestPartialPaymentHandler } from "./handler/test-partial-payment.handler";
import { PartialPaymentProcess } from "./partial-payment.process";
import { AdminUiExtension } from "@vendure/ui-devkit/compiler";
import path from "path";
import { PARTIAL_PAYMENT_ADMIN_EXTENSION } from "./api/partial-payment.schema";
import { PartialPaymentResolver } from "./api/partial-payment.resolver";
import { confirmOrderProcess } from './confirm-order-process';

class OrderPlacedOnSettled implements OrderPlacedStrategy {
  shouldSetAsPlaced(
    _ctx: RequestContext,
    _fromState: OrderState,
    toState: OrderState,
    _order: Order,
  ): boolean | Promise<boolean> {
    return toState == "PaymentSettled";
  }
}

class StockAllocationOnSettled implements StockAllocationStrategy {
  shouldAllocateStock(
    _ctx: RequestContext,
    _fromState: OrderState,
    toState: OrderState,
    _order: Order,
  ): boolean | Promise<boolean> {
    return toState === "PaymentSettled";
  }
}

@VendurePlugin({
  imports: [PluginCommonModule],
  adminApiExtensions: {
    schema: PARTIAL_PAYMENT_ADMIN_EXTENSION,
    resolvers: [PartialPaymentResolver],
  },
  configuration: (config) => {
    config.paymentOptions.process = [PartialPaymentProcess];

    config.paymentOptions.paymentMethodHandlers.push(TestPartialPaymentHandler);

    config.orderOptions.process = [
      configureDefaultOrderProcess({ checkPaymentsCoverTotal: false }),
    ];

    config.orderOptions.orderPlacedStrategy = new OrderPlacedOnSettled();
    config.orderOptions.stockAllocationStrategy =
      new StockAllocationOnSettled();
      config.orderOptions.process = [defaultOrderProcess, confirmOrderProcess];

    return config;
  },
})
export class PartialPaymentPlugin {
  static uiExtension: AdminUiExtension = {
    extensionPath: path.join(__dirname, "ui"),
    ngModules: [
      {
        type: "shared",
        ngModuleName: "PartialPaymentSharedModule",
        ngModuleFileName: "shared.module.ts",
      },
    ],
  };
}
