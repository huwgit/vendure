import { OrderProcess } from '@vendure/core';

export const confirmOrderProcess: OrderProcess<'CreateInvoice'> = {
  transitions: {
    ArrangingPayment: {
      to: ['CreateInvoice'],
    },
    CreateInvoice: {
      to: ['ArrangingPayment'],
    },
  },
};