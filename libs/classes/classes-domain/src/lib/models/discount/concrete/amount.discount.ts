import { BasketAbstractDiscount } from '../abstract/basket.abstract.discount';
import { DiscountConstructor } from '../discount.constructor.type';

export class AmountDiscount extends BasketAbstractDiscount {
    override type = 'amount';
    constructor(discount: DiscountConstructor<AmountDiscount>) {
        super(discount);
    }
    amount!: number;

    apply(total: number): { updated: number; amount: number } {
        const updated = this.atLeastZero(total - this.amount);
        return { updated, amount: this.amount };
    }
}
