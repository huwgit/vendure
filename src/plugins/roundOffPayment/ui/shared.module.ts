import { NgModule } from '@angular/core'
import {
    registerCustomDetailComponent,
    SharedModule,
} from '@vendure/admin-ui/core'
import { RoundOffPaymentComponent } from './roundOffPayment/roundOffPayment.component'

@NgModule({
    imports: [SharedModule],
    declarations: [],
    providers: [
        registerCustomDetailComponent({
            locationId: 'order-detail',
            component: RoundOffPaymentComponent,
        }),
    ],
})
export class RoundOffPaymentSharedModule {}
