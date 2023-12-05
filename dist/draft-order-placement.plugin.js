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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DraftOrderPlacementPlugin = void 0;
const core_1 = require("@vendure/core");
/**
 * This plugin places an order when a Draft is transitioned to the ArrangingPayment state.
 */
let DraftOrderPlacementPlugin = exports.DraftOrderPlacementPlugin = class DraftOrderPlacementPlugin {
    constructor(eventBus, connection) {
        this.eventBus = eventBus;
        this.connection = connection;
        this.loggerCtx = 'DraftOrderPlacementPlugin';
    }
    onApplicationBootstrap() {
        this.eventBus
            .ofType(core_1.OrderStateTransitionEvent)
            .subscribe(({ ctx, order, fromState, toState }) => {
            if (fromState === 'ArrangingPayment' &&
                (toState !== 'Draft') &&
                !order.orderPlacedAt) {
                this.connection
                    .getRepository(ctx, core_1.Order)
                    .update({ id: order.id }, { orderPlacedAt: new Date() });
                this.eventBus.publish(new core_1.OrderPlacedEvent(fromState, toState, ctx, order));
                core_1.Logger.info(`Marked draft order ${order.code} as settled`, this.loggerCtx);
            }
        });
    }
};
exports.DraftOrderPlacementPlugin = DraftOrderPlacementPlugin = __decorate([
    (0, core_1.VendurePlugin)({
        imports: [core_1.PluginCommonModule],
    }),
    __metadata("design:paramtypes", [core_1.EventBus,
        core_1.TransactionalConnection])
], DraftOrderPlacementPlugin);
