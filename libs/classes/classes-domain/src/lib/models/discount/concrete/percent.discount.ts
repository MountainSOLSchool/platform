import { BasketAbstractDiscount } from '../abstract/basket.abstract.discount';
import { DiscountConstructor } from '../discount.constructor.type';

export class PercentDiscount extends BasketAbstractDiscount {
    override type = 'percent';
    constructor(discount: DiscountConstructor<PercentDiscount>) {
        super(discount);
    }
    percent!: number;

    apply(total: number): { updated: number; amount: number } {
        const updated = this.atLeastZero(total * (1 - this.percent / 100));
        return { updated, amount: total - updated };
    }
}
