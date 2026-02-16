import type { DiscountAdmin } from '@sol/ts/firebase/api-types';

export const mockDiscountAmount: DiscountAdmin = {
    id: 'disc-001',
    code: 'SAVE20',
    type: 'amount',
    active: true,
    amount: 20,
};

export const mockDiscountPercent: DiscountAdmin = {
    id: 'disc-002',
    code: 'PERCENT10',
    type: 'percent',
    active: true,
    percent: 10,
};

export const mockDiscountAmountBeforeDate: DiscountAdmin = {
    id: 'disc-003',
    code: 'EARLYBIRD23',
    type: 'amount-before-date',
    active: true,
    amount: 15,
    date: '2026-06-01T23:59:59.999Z',
};

export const mockDiscountClassesPercent: DiscountAdmin = {
    id: 'disc-004',
    code: 'CLASSDEAL',
    type: 'classes-percent',
    active: true,
    percent: 20,
    classOrGroupIds: ['class-101', 'class-102'],
};

export const mockDiscountFreeClasses: DiscountAdmin = {
    id: 'disc-005',
    code: 'FREECLASS',
    type: 'free-classes',
    active: false,
    classOrGroupIds: ['class-201'],
};

export const mockDiscountBuyX: DiscountAdmin = {
    id: 'disc-006',
    code: 'BUNDLE15',
    type: 'buy-x-class-type-percent',
    active: true,
    percent: 15,
    classTypes: ['Mountain', 'Water'],
    minimum: 3,
};

export const mockDiscounts: DiscountAdmin[] = [
    mockDiscountAmount,
    mockDiscountPercent,
    mockDiscountAmountBeforeDate,
    mockDiscountClassesPercent,
    mockDiscountFreeClasses,
    mockDiscountBuyX,
];

export const mockDiscountsEmpty: DiscountAdmin[] = [];
