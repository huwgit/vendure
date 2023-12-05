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
exports.RoundOffPaymentPlugin = void 0;
const core_1 = require("@vendure/core");
const path_1 = __importDefault(require("path"));
const round_off_payment_schema_1 = require("./api/round-off-payment.schema");
const round_off_payment_resolver_1 = require("./api/round-off-payment.resolver");
let RoundOffPaymentPlugin = exports.RoundOffPaymentPlugin = class RoundOffPaymentPlugin {
};
RoundOffPaymentPlugin.uiExtension = {
    extensionPath: path_1.default.join(__dirname, 'ui'),
    ngModules: [
        {
            type: 'shared',
            ngModuleName: 'RoundOffPaymentSharedModule',
            ngModuleFileName: 'shared.module.ts',
        },
    ],
};
exports.RoundOffPaymentPlugin = RoundOffPaymentPlugin = __decorate([
    (0, core_1.VendurePlugin)({
        imports: [core_1.PluginCommonModule],
        adminApiExtensions: {
            schema: round_off_payment_schema_1.ROUND_OFF_PAYMENT_ADMIN_EXTENSION,
            resolvers: [round_off_payment_resolver_1.RoundOffPaymentAdminResolver],
        },
    })
], RoundOffPaymentPlugin);
