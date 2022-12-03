import { Discount } from './discount';

class _BasketDiscount extends Discount<number> {
    apply(total: number): number {
        throw new Error('Not implemented in private class');
    }
}

export abstract class BasketDiscount extends _BasketDiscount {
    constructor(discount: {
        [K in keyof Omit<BasketDiscount, 'type'>]: BasketDiscount[K];
    }) {
        super(discount);
        Object.assign(this, discount);
    }
    abstract override apply(total: number): number;
}

export const isBasketDiscount = (
    discount: Discount<unknown>
): discount is BasketDiscount => discount instanceof _BasketDiscount;
