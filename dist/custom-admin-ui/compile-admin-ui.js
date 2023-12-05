"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.customAdminUi = void 0;
const compiler_1 = require("@vendure/ui-devkit/compiler");
const path = __importStar(require("path"));
const roundOff_payment_plugin_1 = require("../plugins/roundOffPayment/roundOff-payment.plugin");
const vendure_plugin_invoices_1 = require("@pinelab/vendure-plugin-invoices");
const partial_payment_plugin_1 = require("../plugins/partialPayments/partial-payment.plugin");
const stocks_plugin_1 = require("../plugins/stocks/stocks.plugin");
if (require.main === module) {
    (_b = (_a = customAdminUi({ recompile: true, devMode: false })).compile) === null || _b === void 0 ? void 0 : _b.call(_a).then(() => {
        process.exit(0);
    });
}
function customAdminUi(options) {
    if (options.recompile) {
        return (0, compiler_1.compileUiExtensions)({
            outputPath: path.join(__dirname, "../../admin-ui"),
            extensions: [
                {
                    globalStyles: path.join(__dirname, "styles.scss"),
                },
                roundOff_payment_plugin_1.RoundOffPaymentPlugin.uiExtension,
                partial_payment_plugin_1.PartialPaymentPlugin.uiExtension,
                vendure_plugin_invoices_1.InvoicePlugin.ui,
                stocks_plugin_1.StocksPlugin.uiExtension,
                (0, compiler_1.setBranding)({}),
            ],
            devMode: options.devMode,
        });
    }
    else {
        return {
            path: process.env.ADMIN_UI_PATH ||
                path.join(__dirname, "../../admin-ui/dist"),
        };
    }
}
exports.customAdminUi = customAdminUi;
