import { BasketDiscount } from './basket-discount.abstract';

export class AmountDiscount extends BasketDiscount {
    override type = 'amount';
    constructor(discount: {
        [K in keyof Omit<AmountDiscount, 'type'>]: AmountDiscount[K];
    }) {
        super({ ...discount });
        Object.assign(this, discount);
    }
    amount!: number;

    apply(total: number): { updated: number; amount: number } {
        const updated = this.atLeastZero(total - this.amount);
        return { updated, amount: this.amount };
    }
}
