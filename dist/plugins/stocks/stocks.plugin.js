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
exports.StocksPlugin = void 0;
const core_1 = require("@vendure/core");
const path_1 = __importDefault(require("path"));
const admin_resolver_1 = require("./api/admin-resolver");
const api_extension_1 = require("./api/api-extension");
let StocksPlugin = exports.StocksPlugin = class StocksPlugin {
};
StocksPlugin.uiExtension = {
    id: "stock-ui",
    extensionPath: path_1.default.join(__dirname, "ui"),
    providers: ["providers.ts"],
};
exports.StocksPlugin = StocksPlugin = __decorate([
    (0, core_1.VendurePlugin)({
        imports: [core_1.PluginCommonModule],
        adminApiExtensions: {
            schema: api_extension_1.ADMIN_API_EXTENSION,
            resolvers: [admin_resolver_1.StocksAdminResolver, admin_resolver_1.StockAllocationEntityResolver, admin_resolver_1.StockCancellationEntityResolver],
        },
    })
], StocksPlugin);
