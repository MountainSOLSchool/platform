import { Class } from '../class';
import { ClassesDiscount } from './class-discount';

export class ClassesPercentDicount extends ClassesDiscount {
    override type = 'classes-percent';

    constructor(discount: {
        [K in keyof Omit<
            ClassesPercentDicount,
            'type'
        >]: ClassesPercentDicount[K];
    }) {
        super(discount);
        Object.assign(this, discount);
    }

    percent!: number;

    apply(classes: Array<Class>): { updated: Array<Class>; amount: number } {
        const updated = classes.map((c) => {
            if (this.classIds.includes(c.id)) {
                return {
                    ...c,
                    cost: this.atLeastZero(
                        (c.cost ?? 0) * (1 - this.percent / 100)
                    ),
                };
            } else {
                return c;
            }
        });
        const amount =
            classes.reduce((acc, c) => acc + (c.cost ?? 0), 0) -
            updated.reduce((acc, c) => acc + (c.cost ?? 0), 0);
        return { updated, amount };
    }
}
