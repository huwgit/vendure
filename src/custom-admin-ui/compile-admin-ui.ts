import { compileUiExtensions, setBranding } from "@vendure/ui-devkit/compiler";
import * as path from "path";
import { RoundOffPaymentPlugin } from "../plugins/roundOffPayment/roundOff-payment.plugin";
import { InvoicePlugin } from "@pinelab/vendure-plugin-invoices";
import { PartialPaymentPlugin } from "../plugins/partialPayments/partial-payment.plugin";
import { StocksPlugin } from "../plugins/stocks/stocks.plugin";

if (require.main === module) {
  customAdminUi({ recompile: true, devMode: false })
    .compile?.()
    .then(() => {
      process.exit(0);
    });
}

export function customAdminUi(options: {
  recompile: boolean;
  devMode: boolean;
}) {
  if (options.recompile) {
    return compileUiExtensions({
      outputPath: path.join(__dirname, "../../admin-ui"),
      extensions: [
        {
          globalStyles: path.join(__dirname, "styles.scss"),
        },
        RoundOffPaymentPlugin.uiExtension,
        PartialPaymentPlugin.uiExtension,
        InvoicePlugin.ui,
        StocksPlugin.uiExtension,
        setBranding({}),
      ],
      devMode: options.devMode,
    });
  } else {
    return {
      path:
        process.env.ADMIN_UI_PATH ||
        path.join(__dirname, "../../admin-ui/dist"),
    };
  }
}
