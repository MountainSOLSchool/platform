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

    apply(classes: Array<Class>): Array<Class> {
        return classes.map((c) => {
            if (this.classIds.includes(c.id)) {
                return {
                    ...c,
                    cost: this.atLeastZero(c.cost * (1 - this.percent / 100)),
                };
            } else {
                return c;
            }
        });
    }
}
