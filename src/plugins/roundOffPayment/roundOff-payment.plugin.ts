import {
    EventBus,
    LanguageCode,
    OrderEvent,
    OrderService,
    OrderStateTransitionEvent,
    PluginCommonModule,
    VendurePlugin,
} from '@vendure/core'
import { AdminUiExtension } from '@vendure/ui-devkit/compiler'
import path from 'path'
import { ROUND_OFF_PAYMENT_ADMIN_EXTENSION } from './api/round-off-payment.schema'
import { RoundOffPaymentAdminResolver } from './api/round-off-payment.resolver'

@VendurePlugin({
    imports: [PluginCommonModule],
    adminApiExtensions: {
        schema: ROUND_OFF_PAYMENT_ADMIN_EXTENSION,
        resolvers: [RoundOffPaymentAdminResolver],
    },
})
export class RoundOffPaymentPlugin {
    static uiExtension: AdminUiExtension = {
        extensionPath: path.join(__dirname, 'ui'),
        ngModules: [
            {
                type: 'shared',
                ngModuleName: 'RoundOffPaymentSharedModule',
                ngModuleFileName: 'shared.module.ts',
            },
        ],
    }
}
