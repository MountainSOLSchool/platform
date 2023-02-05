import { AmountDiscount } from './amount';

export class AmountBeforeDateDiscount extends AmountDiscount {
    override type = 'amount-before-date';
    constructor(discount: {
        [K in keyof Omit<AmountDiscount, 'type'>]: AmountDiscount[K];
    }) {
        super({ ...discount });
        Object.assign(this, discount);
    }
    date!: { _seconds: number };

    override apply(total: number): { updated: number; amount: number } {
        if (new Date() < new Date(this.date._seconds * 1000)) {
            return super.apply(total);
        } else {
            return { updated: total, amount: 0 };
        }
    }
}
