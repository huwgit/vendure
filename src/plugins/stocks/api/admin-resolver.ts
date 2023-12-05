import { Resolver, Parent, ResolveField, Query, Args } from "@nestjs/graphql";
import {
    Allocation,
    Cancellation,
    Ctx,
    RequestContext,
    StockMovement,
    StockMovementService,
    TransactionalConnection,
} from "@vendure/core";
import { QueryVariantStockMovementsArgs } from "../../../codegen/adminTypes";

@Resolver()
export class StocksAdminResolver {
    constructor(private stockMovementService: StockMovementService) { }

    @Query()
    async variantStockMovements(
        @Ctx() ctx: RequestContext,
        @Args() args: QueryVariantStockMovementsArgs,
    ) {
        return this.stockMovementService.getStockMovementsByProductVariantId(
            ctx,
            args.id,
            args.options,
        );
    }
}

@Resolver("Allocation")
export class StockAllocationEntityResolver {
    constructor(private connection: TransactionalConnection) { }

    @ResolveField()
    async orderLine(
        @Ctx() ctx: RequestContext,
        @Parent() movement: StockMovement,
    ) {
        const data = await this.connection
            .getRepository(ctx, Allocation)
            .createQueryBuilder("allocation")
            .where("allocation.id = :allocationId", { allocationId: movement.id })
            .leftJoinAndSelect("allocation.orderLine", "orderLine")
            .getOne();
        return data?.orderLine;
    }
}

@Resolver("Cancellation")
export class StockCancellationEntityResolver {
    constructor(private connection: TransactionalConnection) { }

    @ResolveField()
    async orderLine(
        @Ctx() ctx: RequestContext,
        @Parent() movement: StockMovement,
    ) {
        const data = await this.connection
            .getRepository(ctx, Cancellation)
            .createQueryBuilder("cancellation")
            .where("cancellation.id = :cancellation", { cancellationId: movement.id })
            .leftJoinAndSelect("cancellation.orderLine", "orderLine")
            .getOne();
        return data?.orderLine;
    }
}
