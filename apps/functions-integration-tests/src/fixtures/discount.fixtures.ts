import type { CreateDiscountRequest } from '@sol/ts/firebase/api-types';

export const AMOUNT_DISCOUNT: CreateDiscountRequest = {
    code: 'SAVE20',
    type: 'amount',
    active: true,
    amount: 20,
};

export const PERCENT_DISCOUNT: CreateDiscountRequest = {
    code: 'HALF',
    type: 'percent',
    active: true,
    percent: 50,
};

export const INACTIVE_DISCOUNT: CreateDiscountRequest = {
    code: 'EXPIRED',
    type: 'amount',
    active: false,
    amount: 10,
};

export const AMOUNT_BEFORE_DATE_DISCOUNT: CreateDiscountRequest = {
    code: 'EARLYBIRD',
    type: 'amount-before-date',
    active: true,
    amount: 30,
    date: '2025-12-31T23:59:59.000Z',
};

export const CLASSES_PERCENT_DISCOUNT: CreateDiscountRequest = {
    code: 'CLASSOFF',
    type: 'classes-percent',
    active: true,
    percent: 25,
    classOrGroupIds: ['class-1', 'class-2'],
};
