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
exports.RoundOffPaymentAdminResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const core_1 = require("@vendure/core/");
let RoundOffPaymentAdminResolver = exports.RoundOffPaymentAdminResolver = class RoundOffPaymentAdminResolver {
    constructor(orderService, connection) {
        this.orderService = orderService;
        this.connection = connection;
    }
    async addSurchageToOrder(ctx, input) {
        const order = await this.orderService.findOne(ctx, input.orderId);
        if (!order) {
            throw new core_1.EntityNotFoundError('Order', input.orderId);
        }
        const theSurcharge = await this.connection.getRepository(ctx, core_1.Surcharge).findOne({
            where: {
                sku: 'RoundOff',
                order: {
                    id: order.id
                }
            },
            relations: ['order']
        });
        if (theSurcharge) {
            await this.orderService.removeSurchargeFromOrder(ctx, order.id, theSurcharge.id);
            this.orderService.addNoteToOrder(ctx, {
                note: `Removed Round Off Payment of ${theSurcharge.listPrice}`,
                isPublic: false,
                id: order.id,
            });
        }
        const finalOrder = await this.orderService.findOne(ctx, input.orderId);
        if (!finalOrder) {
            throw new core_1.EntityNotFoundError('Order', input.orderId);
        }
        const orderTotal = finalOrder.totalWithTax;
        const orderSurcharge = input.amount - orderTotal;
        const updatedOrder = await this.orderService.addSurchargeToOrder(ctx, order.id, {
            description: 'Round Off Payment',
            sku: 'RoundOff',
            listPrice: orderSurcharge,
        });
        this.orderService.addNoteToOrder(ctx, {
            note: `Added Round Off Payment of ${orderSurcharge}`,
            isPublic: false,
            id: order.id,
        });
        return updatedOrder;
    }
};
__decorate([
    (0, core_1.Transaction)(),
    (0, graphql_1.Mutation)(),
    (0, core_1.Allow)(core_1.Permission.UpdateOrder),
    __param(0, (0, core_1.Ctx)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [core_1.RequestContext, Object]),
    __metadata("design:returntype", Promise)
], RoundOffPaymentAdminResolver.prototype, "addSurchageToOrder", null);
exports.RoundOffPaymentAdminResolver = RoundOffPaymentAdminResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [core_1.OrderService,
        core_1.TransactionalConnection])
], RoundOffPaymentAdminResolver);
