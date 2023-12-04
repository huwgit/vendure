import { OnApplicationBootstrap } from '@nestjs/common';
import {
  EventBus,
  Logger,
  Order,
  OrderPlacedEvent, OrderStateTransitionEvent,
  PluginCommonModule,
  TransactionalConnection,
  VendurePlugin
} from '@vendure/core';

/**
 * This plugin places an order when a Draft is transitioned to the ArrangingPayment state.
 */
@VendurePlugin({
  imports: [PluginCommonModule],
})
export class DraftOrderPlacementPlugin implements OnApplicationBootstrap {
  loggerCtx = 'DraftOrderPlacementPlugin';

  constructor(
    private eventBus: EventBus,
    private connection: TransactionalConnection
  ) {}

  onApplicationBootstrap() {
    this.eventBus
      .ofType(OrderStateTransitionEvent)
      .subscribe(({ ctx, order, fromState, toState }) => {
        if (
          fromState === 'ArrangingPayment' &&
          (toState !== 'Draft') &&
          !order.orderPlacedAt
        ) {
          this.connection
            .getRepository(ctx, Order)
            .update({ id: order.id }, { orderPlacedAt: new Date() });
          this.eventBus.publish(
            new OrderPlacedEvent(fromState, toState, ctx, order)
          );
          Logger.info(
            `Marked draft order ${order.code} as settled`,
            this.loggerCtx
          );
        }
      });
  }
}