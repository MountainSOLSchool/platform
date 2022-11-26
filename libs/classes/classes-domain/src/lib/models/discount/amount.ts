import { BasketDiscount } from './basket-discount';

export class AmountDiscount extends BasketDiscount {
    override type = 'amount';
    constructor(discount: {
        [K in keyof Omit<AmountDiscount, 'type'>]: AmountDiscount[K];
    }) {
        super({ ...discount });
        Object.assign(this, discount);
    }
    amount!: number;

    apply(total: number): number {
        console.log(`${total} - ${this.amount}`);
        return this.atLeastZero(total - this.amount);
    }
}
