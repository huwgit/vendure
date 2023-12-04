import {
  dummyPaymentHandler,
  DefaultJobQueuePlugin,
  DefaultSearchPlugin,
  VendureConfig,
  RequestContext,
  Order,
  InjectableStrategy,
} from "@vendure/core";
import { LanguageCode } from "@vendure/core";
import { defaultEmailHandlers, EmailPlugin } from "@vendure/email-plugin";
import { AssetServerPlugin } from "@vendure/asset-server-plugin";
import { AdminUiPlugin } from "@vendure/admin-ui-plugin";
import "dotenv/config";
import { json } from "body-parser";
import path from "path";
import { InvoicePlugin } from "@pinelab/vendure-plugin-invoices";
import { DraftOrderPlacementPlugin } from "./draft-order-placement.plugin";
import { StripePlugin } from "@vendure/payments-plugin/package/stripe";

import { RoundOffPaymentPlugin } from "./plugins/roundOffPayment/roundOff-payment.plugin";
import { customAdminUi } from "./custom-admin-ui/compile-admin-ui";
import { MigrationV2Plugin } from "@vendure/migrate-v2";
import { PartialPaymentPlugin } from "./plugins/partialPayments/partial-payment.plugin";

const IS_DEV = process.env.APP_ENV === "dev";
const UI_DEV = process.env.UI_ENV === "dev";

interface OrderByCodeAccessStrategy extends InjectableStrategy {
  canAccessOrder(ctx: RequestContext, order: Order): boolean | Promise<boolean>;
}

class TestOrderByCodeAccessStrategy implements OrderByCodeAccessStrategy {
  canAccessOrder(ctx: RequestContext, order: Order): boolean {
    // always allow access - do not use in production!
    return true;
  }
}

export const config: VendureConfig = {
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
        handler: json({ limit: "5mb" }),
      },
    ],
    ...(IS_DEV
      ? {
          adminApiPlayground: {
            settings: { "request.credentials": "include" } as any,
          },
          adminApiDebug: true,
          shopApiPlayground: {
            settings: { "request.credentials": "include" } as any,
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
    migrations: [path.join(__dirname, "./migrations/*.+(js|ts)")],
    logging: false,
    database: path.join(__dirname, "../vendure.sqlite"),
  },
  paymentOptions: {
    paymentMethodHandlers: [dummyPaymentHandler],
  },
  customFields: {
    Product: [
      { name: "weight", type: "string" },
      { name: "thickness", type: "string" },
      {
        name: "size",
        type: "localeString",
        label: [{ languageCode: LanguageCode.en, value: "Dimensions LxWxT" }],
      },
      {
        name: "area",
        type: "string",
        label: [{ languageCode: LanguageCode.en, value: "Tile area" }],
      },
      {
        name: "boxarea",
        type: "string",
        label: [{ languageCode: LanguageCode.en, value: "Box area" }],
      },
      {
        name: "pricem2",
        type: "string",
        label: [{ languageCode: LanguageCode.en, value: "Price per SQM" }],
      },
      {
        name: "pricebox",
        type: "string",
        label: [{ languageCode: LanguageCode.en, value: "Price per Box" }],
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
    MigrationV2Plugin,
    DraftOrderPlacementPlugin,
    PartialPaymentPlugin,
    RoundOffPaymentPlugin,
    AssetServerPlugin.init({
      route: "assets",
      assetUploadDir: path.join(__dirname, "../static/assets"),
      // For local dev, the correct value for assetUrlPrefix should
      // be guessed correctly, but for production it will usually need
      // to be set manually to match your production url.
      assetUrlPrefix: IS_DEV ? undefined : "https://abnstone.co.uk/assets",
    }),
    DefaultJobQueuePlugin.init({ useDatabaseForBuffer: true }),
    DefaultSearchPlugin.init({ bufferUpdates: false, indexStockStatus: true }),
    EmailPlugin.init({
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
      handlers: defaultEmailHandlers,
      templatePath: path.join(__dirname, "../static/email/templates"),
      outputPath: path.join(__dirname, "../static/email/test-emails"),
      globalTemplateVars: {
        // The following variables will change depending on your storefront implementation.
        // Here we are assuming a storefront running at http://localhost:8080.
        fromAddress: '"ABN Stone Ltd" <info@abnstone.co.uk>',
        verifyEmailAddressUrl: "http://localhost:3000/verify",
        passwordResetUrl: "http://localhost:3000/password-reset",
        changeEmailAddressUrl:
          "http://localhost:3000/verify-email-address-change",
      },
    }),
    InvoicePlugin.init({
      licenseKey: String(process.env.PINELAB_LICENSE),
      vendureHost: "https://abnstone.co.uk",
    }),
    AdminUiPlugin.init({
      port: 3002,
      route: "admin",
      app: customAdminUi({
        recompile: UI_DEV,
        devMode: UI_DEV,
      }),
    }),
    StripePlugin.init({
      storeCustomersInStripe: true,
    }),
  ],
};
