import { BasketDiscount } from './basket-discount';

export class PercentDicount extends BasketDiscount {
    override type = 'percent';
    constructor(discount: {
        [K in keyof Omit<PercentDicount, 'type'>]: PercentDicount[K];
    }) {
        super(discount);
        Object.assign(this, discount);
    }
    percent!: number;

    apply(total: number): number {
        return this.atLeastZero(total * (1 - this.percent / 100));
    }
}
