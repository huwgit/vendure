import { OrderProcess } from '@vendure/core';

export const checkOrderProcess: OrderProcess<'CheckOrder'> = {
  transitions: {
    Draft: {
      to: ['CheckOrder'],
      mergeStrategy: 'replace',
    },
    CheckOrder: {
      to: ['ArrangingPayment', 'Draft'],
    },
  },
};