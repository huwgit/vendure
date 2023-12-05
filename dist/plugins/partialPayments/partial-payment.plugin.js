"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PartialPaymentPlugin = void 0;
const core_1 = require("@vendure/core");
const test_partial_payment_handler_1 = require("./handler/test-partial-payment.handler");
const partial_payment_process_1 = require("./partial-payment.process");
const path_1 = __importDefault(require("path"));
const partial_payment_schema_1 = require("./api/partial-payment.schema");
const partial_payment_resolver_1 = require("./api/partial-payment.resolver");
const confirm_order_process_1 = require("./confirm-order-process");
class OrderPlacedOnSettled {
    shouldSetAsPlaced(_ctx, _fromState, toState, _order) {
        return toState == "PaymentSettled";
    }
}
class StockAllocationOnSettled {
    shouldAllocateStock(_ctx, _fromState, toState, _order) {
        return toState === "PaymentSettled";
    }
}
let PartialPaymentPlugin = exports.PartialPaymentPlugin = class PartialPaymentPlugin {
};
PartialPaymentPlugin.uiExtension = {
    extensionPath: path_1.default.join(__dirname, "ui"),
    ngModules: [
        {
            type: "shared",
            ngModuleName: "PartialPaymentSharedModule",
            ngModuleFileName: "shared.module.ts",
        },
    ],
};
exports.PartialPaymentPlugin = PartialPaymentPlugin = __decorate([
    (0, core_1.VendurePlugin)({
        imports: [core_1.PluginCommonModule],
        adminApiExtensions: {
            schema: partial_payment_schema_1.PARTIAL_PAYMENT_ADMIN_EXTENSION,
            resolvers: [partial_payment_resolver_1.PartialPaymentResolver],
        },
        configuration: (config) => {
            config.paymentOptions.process = [partial_payment_process_1.PartialPaymentProcess];
            config.paymentOptions.paymentMethodHandlers.push(test_partial_payment_handler_1.TestPartialPaymentHandler);
            config.orderOptions.process = [
                (0, core_1.configureDefaultOrderProcess)({ checkPaymentsCoverTotal: false }),
            ];
            config.orderOptions.orderPlacedStrategy = new OrderPlacedOnSettled();
            config.orderOptions.stockAllocationStrategy =
                new StockAllocationOnSettled();
            config.orderOptions.process = [core_1.defaultOrderProcess, confirm_order_process_1.confirmOrderProcess];
            return config;
        },
    })
], PartialPaymentPlugin);
