"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const core_1 = require("@vendure/core");
const core_2 = require("@vendure/core");
const email_plugin_1 = require("@vendure/email-plugin");
const asset_server_plugin_1 = require("@vendure/asset-server-plugin");
const admin_ui_plugin_1 = require("@vendure/admin-ui-plugin");
require("dotenv/config");
const body_parser_1 = require("body-parser");
const path_1 = __importDefault(require("path"));
const vendure_plugin_invoices_1 = require("@pinelab/vendure-plugin-invoices");
const draft_order_placement_plugin_1 = require("./draft-order-placement.plugin");
const stripe_1 = require("@vendure/payments-plugin/package/stripe");
const roundOff_payment_plugin_1 = require("./plugins/roundOffPayment/roundOff-payment.plugin");
const compile_admin_ui_1 = require("./custom-admin-ui/compile-admin-ui");
const migrate_v2_1 = require("@vendure/migrate-v2");
const partial_payment_plugin_1 = require("./plugins/partialPayments/partial-payment.plugin");
const stocks_plugin_1 = require("./plugins/stocks/stocks.plugin");
const IS_DEV = process.env.APP_ENV === "dev";
const UI_DEV = process.env.UI_ENV === "dev";
class TestOrderByCodeAccessStrategy {
    canAccessOrder(ctx, order) {
        // always allow access - do not use in production!
        return true;
    }
}
exports.config = {
    orderOptions: {
        orderItemsLimit: 2000,
        orderLineItemsLimit: 2000,
        orderByCodeAccessStrategy: new TestOrderByCodeAccessStrategy(),
    },
    apiOptions: {
        port: 3000,
        adminApiPath: "admin-api",
        shopApiPath: "shop-api",
        middleware: [
            {
                route: "/invoices/preview",
                handler: (0, body_parser_1.json)({ limit: "5mb" }),
            },
        ],
        ...(IS_DEV
            ? {
                adminApiPlayground: {
                    settings: { "request.credentials": "include" },
                },
                adminApiDebug: true,
                shopApiPlayground: {
                    settings: { "request.credentials": "include" },
                },
                shopApiDebug: true,
            }
            : {}),
    },
    authOptions: {
        tokenMethod: ["bearer", "cookie"],
        superadminCredentials: {
            identifier: process.env.SUPERADMIN_USERNAME,
            password: process.env.SUPERADMIN_PASSWORD,
        },
        cookieOptions: {
            secret: process.env.COOKIE_SECRET,
        },
    },
    dbConnectionOptions: {
        type: "better-sqlite3",
        synchronize: false,
        migrations: [path_1.default.join(__dirname, "./migrations/*.+(js|ts)")],
        logging: false,
        database: path_1.default.join(__dirname, "../vendure.sqlite"),
    },
    paymentOptions: {
        paymentMethodHandlers: [core_1.dummyPaymentHandler],
    },
    customFields: {
        Product: [
            { name: "weight", type: "string" },
            { name: "thickness", type: "string" },
            {
                name: "size",
                type: "localeString",
                label: [{ languageCode: core_2.LanguageCode.en, value: "Dimensions LxWxT" }],
            },
            {
                name: "area",
                type: "string",
                label: [{ languageCode: core_2.LanguageCode.en, value: "Tile area" }],
            },
            {
                name: "boxarea",
                type: "string",
                label: [{ languageCode: core_2.LanguageCode.en, value: "Box area" }],
            },
            {
                name: "pricem2",
                type: "string",
                label: [{ languageCode: core_2.LanguageCode.en, value: "Price per SQM" }],
            },
            {
                name: "pricebox",
                type: "string",
                label: [{ languageCode: core_2.LanguageCode.en, value: "Price per Box" }],
            },
            {
                name: "material",
                type: "string",
                options: [
                    { value: "Product" },
                    { value: "Granite" },
                    { value: "Marble" },
                    { value: "Quartz" },
                    { value: "Porcelain" },
                    { value: "Ceramic" },
                ],
            },
            {
                name: "finish",
                type: "string",
                options: [{ value: "Matt" }, { value: "Polish" }, { value: "Gloss" }],
            },
            {
                name: "sample",
                type: "string",
                options: [{ value: "Not available" }, { value: "Available" }],
            },
            {
                name: "soldby",
                type: "string",
                defaultValue: "per tile",
                options: [
                    { value: "per tile" },
                    { value: "per box" },
                    { value: "per SQM" },
                ],
            },
        ],
    },
    plugins: [
        migrate_v2_1.MigrationV2Plugin,
        draft_order_placement_plugin_1.DraftOrderPlacementPlugin,
        partial_payment_plugin_1.PartialPaymentPlugin,
        roundOff_payment_plugin_1.RoundOffPaymentPlugin,
        asset_server_plugin_1.AssetServerPlugin.init({
            route: "assets",
            assetUploadDir: path_1.default.join(__dirname, "../static/assets"),
            // For local dev, the correct value for assetUrlPrefix should
            // be guessed correctly, but for production it will usually need
            // to be set manually to match your production url.
            assetUrlPrefix: IS_DEV ? undefined : "https://abnstone.co.uk/assets",
        }),
        core_1.DefaultJobQueuePlugin.init({ useDatabaseForBuffer: true }),
        core_1.DefaultSearchPlugin.init({ bufferUpdates: false, indexStockStatus: true }),
        email_plugin_1.EmailPlugin.init({
            //          devMode: true,
            transport: {
                type: "smtp",
                host: "smtpout.secureserver.net",
                port: 465,
                auth: {
                    user: "info@abnstone.co.uk",
                    pass: process.env.EMAIL_PASSWORD,
                },
            },
            route: "mailbox",
            handlers: email_plugin_1.defaultEmailHandlers,
            templatePath: path_1.default.join(__dirname, "../static/email/templates"),
            outputPath: path_1.default.join(__dirname, "../static/email/test-emails"),
            globalTemplateVars: {
                // The following variables will change depending on your storefront implementation.
                // Here we are assuming a storefront running at http://localhost:8080.
                fromAddress: '"ABN Stone Ltd" <info@abnstone.co.uk>',
                verifyEmailAddressUrl: "http://localhost:3000/verify",
                passwordResetUrl: "http://localhost:3000/password-reset",
                changeEmailAddressUrl: "http://localhost:3000/verify-email-address-change",
            },
        }),
        vendure_plugin_invoices_1.InvoicePlugin.init({
            licenseKey: String(process.env.PINELAB_LICENSE),
            vendureHost: "https://abnstone.co.uk",
        }),
        admin_ui_plugin_1.AdminUiPlugin.init({
            port: 3002,
            route: "admin",
            app: (0, compile_admin_ui_1.customAdminUi)({
                recompile: UI_DEV,
                devMode: UI_DEV,
            }),
        }),
        stripe_1.StripePlugin.init({
            storeCustomersInStripe: true,
        }),
        stocks_plugin_1.StocksPlugin
    ],
};
