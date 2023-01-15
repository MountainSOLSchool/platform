import { BasketDiscount } from './basket-discount';
import { Class } from '../class';

export class PercentDicount extends BasketDiscount {
    override type = 'percent';
    constructor(discount: {
        [K in keyof Omit<PercentDicount, 'type'>]: PercentDicount[K];
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
