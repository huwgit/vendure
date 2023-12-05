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
exports.PartialPaymentResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const core_1 = require("@vendure/core/");
const shared_utils_1 = require("@vendure/common/lib/shared-utils");
const order_modification_entity_1 = require("@vendure/core/dist/entity/order-modification/order-modification.entity");
let PartialPaymentResolver = exports.PartialPaymentResolver = class PartialPaymentResolver {
    constructor(orderService, paymentService, connection) {
        this.orderService = orderService;
        this.paymentService = paymentService;
        this.connection = connection;
    }
    async addPartialManualPaymentToOrder(ctx, input) {
        const order = await this.orderService.findOne(ctx, input.orderId);
        if (!order) {
            throw new core_1.EntityNotFoundError('Order', input.orderId);
        }
        if (order.state !== 'ArrangingAdditionalPayment' &&
            order.state !== 'ArrangingPayment') {
            return new core_1.ManualPaymentStateError();
        }
        const existingPayments = await this.orderService.getOrderPayments(ctx, order.id);
        order.payments = existingPayments;
        const { amount, ...payment_input } = input;
        const modifications = await this.orderService.getOrderModifications(ctx, order.id);
        const unsettledModifications = modifications.filter(m => !m.isSettled);
        if (0 < unsettledModifications.length) {
            const outstandingModificationsTotal = (0, shared_utils_1.summate)(unsettledModifications, 'priceChange');
            if (outstandingModificationsTotal !== amount) {
                throw new core_1.InternalServerError(`The outstanding order amount (${amount}) should equal the unsettled OrderModifications total (${outstandingModificationsTotal})`);
            }
        }
        const payment = await this.paymentService.createManualPayment(ctx, order, amount, payment_input);
        await this.connection
            .getRepository(ctx, core_1.Order)
            .createQueryBuilder('order')
            .relation('payments')
            .of(order)
            .add(payment);
        for (const modification of unsettledModifications) {
            modification.payment = payment;
            await this.connection
                .getRepository(ctx, order_modification_entity_1.OrderModification)
                .save(modification);
        }
        return (0, core_1.assertFound)(this.orderService.findOne(ctx, order.id));
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
], PartialPaymentResolver.prototype, "addPartialManualPaymentToOrder", null);
exports.PartialPaymentResolver = PartialPaymentResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [core_1.OrderService,
        core_1.PaymentService,
        core_1.TransactionalConnection])
], PartialPaymentResolver);
