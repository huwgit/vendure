import { NgModule } from '@angular/core'
import {
    registerCustomDetailComponent,
    SharedModule,
} from '@vendure/admin-ui/core'
import { AddManualPaymentComponent } from './addManualPayment/addManualPayment.component'

@NgModule({
    imports: [SharedModule],
    declarations: [],
    providers: [
        registerCustomDetailComponent({
            locationId: 'order-detail',
            component: AddManualPaymentComponent,
        }),
    ],
})
export class PartialPaymentSharedModule {}
