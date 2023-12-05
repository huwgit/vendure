import { PluginCommonModule, VendurePlugin } from "@vendure/core";
import { AdminUiExtension } from "@vendure/ui-devkit/compiler";
import path from "path";
import {
    StockCancellationEntityResolver,
    StockAllocationEntityResolver,
    StocksAdminResolver,
} from "./api/admin-resolver";
import { ADMIN_API_EXTENSION as STOCK_ADMIN_API_EXTENSION } from "./api/api-extension";

@VendurePlugin({
    imports: [PluginCommonModule],
    adminApiExtensions: {
        schema: STOCK_ADMIN_API_EXTENSION,
        resolvers: [StocksAdminResolver, StockAllocationEntityResolver, StockCancellationEntityResolver],
    },
})
export class StocksPlugin {
    static uiExtension: AdminUiExtension = {
        id: "stock-ui",
        extensionPath: path.join(__dirname, "ui"),
        providers: ["providers.ts"],
    };
}
