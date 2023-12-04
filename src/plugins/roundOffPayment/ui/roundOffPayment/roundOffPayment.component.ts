import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker'
import { Component } from '@angular/core'
import { of, EMPTY, Observable, switchMap } from 'rxjs'
import { ResultOf } from '@graphql-typed-document-node/core'
import {
    UntypedFormGroup,
    UntypedFormControl,
    Validators,
} from '@angular/forms'
import {
    CustomDetailComponent,
    SharedModule,
    ItemOf,
    GetAddManualPaymentMethodListQuery,
    OrderDetailQueryDocument,
    DataService,
    NotificationService,
} from '@vendure/admin-ui/core'
import gql from 'graphql-tag'

type OrderEntity = ResultOf<typeof OrderDetailQueryDocument>['order']

const ADD_PARTIAL_MANUAL_PAYMENT = gql`
    mutation AddSurchageToOrder($input: OrderSurchageInput!) {
        addSurchageToOrder(input: $input) {
            __typename
        }
    }
`

@Component({
    templateUrl: 'roundOffPayment.component.html',
    standalone: true,
    providers: [],
    imports: [SharedModule],
})
export class RoundOffPaymentComponent
    implements CustomDetailComponent
{
    entity$: Observable<OrderEntity>
    detailForm: UntypedFormGroup

    entity: NonNullable<OrderEntity>

    form = new UntypedFormGroup({
        amount: new UntypedFormControl(0, Validators.required),
    })

    constructor(
        private dataService: DataService,
        private notificationService: NotificationService
    ) {}

    ngOnInit() {
        this.entity$.subscribe(d => {
            if (d) this.entity = d
        })
    }

    submit() {
        const formValue = this.form.value
        this.dataService
            .mutate(ADD_PARTIAL_MANUAL_PAYMENT, {
                input: {
                    amount: formValue.amount,
                    orderId: this.entity.id,
                },
            })
            .pipe(
                switchMap(result => {
                    const addSurchargeToOrder = (result as any)
                        .addSurchageToOrder;
                    if(addSurchargeToOrder.__typename === 'Order'){
                        this.form.reset()
                        this.notificationService.success(
                            _('order.add-payment-to-order-success')
                        )
                        return of(true)
                    }else{
                        this.notificationService.error(
                            addSurchargeToOrder.message
                        )
                        return EMPTY
                    }
                })
            )
            .subscribe(() => location.reload())
    }
}
