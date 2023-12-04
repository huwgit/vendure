import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker'
import { Component, OnInit } from '@angular/core'
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
    GetAddManualPaymentMethodListDocument,
    OrderDetailQueryDocument,
    DataService,
    NotificationService,
} from '@vendure/admin-ui/core'
import gql from 'graphql-tag'

type OrderEntity = ResultOf<typeof OrderDetailQueryDocument>['order']

const ADD_PARTIAL_MANUAL_PAYMENT = gql`
    mutation AddPartialManualPaymentToOrder($input: ManualPartialPaymentInput) {
        addPartialManualPaymentToOrder(input: $input) {
            __typename
        }
    }
`

@Component({
    templateUrl: 'addManualPayment.component.html',
    standalone: true,
    providers: [],
    imports: [SharedModule],
})
export class AddManualPaymentComponent
    implements CustomDetailComponent, OnInit
{
    entity$: Observable<OrderEntity>
    detailForm: UntypedFormGroup

    entity: NonNullable<OrderEntity>

    form = new UntypedFormGroup({
        method: new UntypedFormControl('', Validators.required),
        transactionId: new UntypedFormControl(''),
        amount: new UntypedFormControl(0, Validators.required),
    })

    paymentMethods$: Observable<
        Array<ItemOf<GetAddManualPaymentMethodListQuery, 'paymentMethods'>>
    >
    constructor(
        private dataService: DataService,
        private notificationService: NotificationService
    ) {}

    ngOnInit() {
        this.entity$.subscribe(d => {
            if (d) this.entity = d
        })
        this.paymentMethods$ = this.dataService
            .query(GetAddManualPaymentMethodListDocument, {
                options:{}
            })
            .mapSingle(data => data.paymentMethods.items)
    }

    submit() {
        const formValue = this.form.value
        this.dataService
            .mutate(ADD_PARTIAL_MANUAL_PAYMENT, {
                input: {
                    orderId: this.entity.id,
                    method: formValue.method,
                    transactionId: formValue.transactionId,
                    metadata: {},
                    amount: formValue.amount,
                },
            })
            .pipe(
                switchMap(result => {
                    const addPartialManualPaymentToOrder = (result as any)
                        .addPartialManualPaymentToOrder
                    switch (addPartialManualPaymentToOrder.__typename) {
                        case 'Order':
                            this.form.reset()
                            this.notificationService.success(
                                _('order.add-payment-to-order-success')
                            )
                            return of(true)
                        case 'ManualPaymentStateError':
                            this.notificationService.error(
                                addPartialManualPaymentToOrder.message
                            )
                            return EMPTY
                        default:
                            return EMPTY
                    }
                })
            )
            .subscribe(() => location.reload())
    }
}
