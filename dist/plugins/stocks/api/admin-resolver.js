"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockCancellationEntityResolver = exports.StockAllocationEntityResolver = exports.StocksAdminResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const core_1 = require("@vendure/core");
let StocksAdminResolver = exports.StocksAdminResolver = class StocksAdminResolver {
    constructor(stockMovementService) {
        this.stockMovementService = stockMovementService;
    }
    async variantStockMovements(ctx, args) {
        return this.stockMovementService.getStockMovementsByProductVariantId(ctx, args.id, args.options);
    }
};
__decorate([
    (0, graphql_1.Query)(),
    __param(0, (0, core_1.Ctx)()),
    __param(1, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.RequestContext, Object]),
    __metadata("design:returntype", Promise)
], StocksAdminResolver.prototype, "variantStockMovements", null);
exports.StocksAdminResolver = StocksAdminResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [core_1.StockMovementService])
], StocksAdminResolver);
let StockAllocationEntityResolver = exports.StockAllocationEntityResolver = class StockAllocationEntityResolver {
    constructor(connection) {
        this.connection = connection;
    }
    async orderLine(ctx, movement) {
        const data = await this.connection
            .getRepository(ctx, core_1.Allocation)
            .createQueryBuilder("allocation")
            .where("allocation.id = :allocationId", { allocationId: movement.id })
            .leftJoinAndSelect("allocation.orderLine", "orderLine")
            .getOne();
        return data === null || data === void 0 ? void 0 : data.orderLine;
    }
};
__decorate([
    (0, graphql_1.ResolveField)(),
    __param(0, (0, core_1.Ctx)()),
    __param(1, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.RequestContext,
        core_1.StockMovement]),
    __metadata("design:returntype", Promise)
], StockAllocationEntityResolver.prototype, "orderLine", null);
exports.StockAllocationEntityResolver = StockAllocationEntityResolver = __decorate([
    (0, graphql_1.Resolver)("Allocation"),
    __metadata("design:paramtypes", [core_1.TransactionalConnection])
], StockAllocationEntityResolver);
let StockCancellationEntityResolver = exports.StockCancellationEntityResolver = class StockCancellationEntityResolver {
    constructor(connection) {
        this.connection = connection;
    }
    async orderLine(ctx, movement) {
        const data = await this.connection
            .getRepository(ctx, core_1.Cancellation)
            .createQueryBuilder("cancellation")
            .where("cancellation.id = :cancellation", { cancellationId: movement.id })
            .leftJoinAndSelect("cancellation.orderLine", "orderLine")
            .getOne();
        return data === null || data === void 0 ? void 0 : data.orderLine;
    }
};
__decorate([
    (0, graphql_1.ResolveField)(),
    __param(0, (0, core_1.Ctx)()),
    __param(1, (0, graphql_1.Parent)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.RequestContext,
        core_1.StockMovement]),
    __metadata("design:returntype", Promise)
], StockCancellationEntityResolver.prototype, "orderLine", null);
exports.StockCancellationEntityResolver = StockCancellationEntityResolver = __decorate([
    (0, graphql_1.Resolver)("Cancellation"),
    __metadata("design:paramtypes", [core_1.TransactionalConnection])
], StockCancellationEntityResolver);
