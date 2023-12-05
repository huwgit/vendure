import { registerCustomDetailComponent } from "@vendure/admin-ui/core";
import { StockMovementListComponent } from "./component/stock_movement/stock_movement";

export default [
    registerCustomDetailComponent({
        component: StockMovementListComponent,
        locationId: "product-variant-detail",
    }),
];
