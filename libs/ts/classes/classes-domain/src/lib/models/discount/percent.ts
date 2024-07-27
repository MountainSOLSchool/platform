import { BasketDiscount } from './basket-discount';

export class PercentDiscount extends BasketDiscount {
    override type = 'percent';
    constructor(discount: {
        [K in keyof Omit<PercentDiscount, 'type'>]: PercentDiscount[K];
    }) {
        super(discount);
        Object.assign(this, discount);
    }
    percent!: number;

    apply(total: number): { updated: number; amount: number } {
        const updated = this.atLeastZero(total * (1 - this.percent / 100));
        return { updated, amount: total - updated };
    }
}
