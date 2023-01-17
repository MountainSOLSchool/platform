import { AbstractDiscount } from '../discount';
import { DiscountConstructor } from '../discount.constructor.type';

class _BasketDiscount extends AbstractDiscount<number> {
    override apply(total: number): { updated: number; amount: number } {
        throw new Error('Not implemented in private class');
    }
}

export abstract class BasketAbstractDiscount extends _BasketDiscount {
    constructor(discount: DiscountConstructor<BasketAbstractDiscount>) {
        super(discount);
    }
    abstract override apply(total: number): { updated: number; amount: number };
}

export const isBasketDiscount = (
    discount: AbstractDiscount<unknown>
): discount is BasketAbstractDiscount => discount instanceof _BasketDiscount;
