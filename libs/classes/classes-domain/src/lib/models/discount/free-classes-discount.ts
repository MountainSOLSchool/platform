import { SemesterClass } from '../semester-class';
import { ClassesDiscount } from './class-discount';

export class FreeClassesDiscount extends ClassesDiscount {
    constructor(discount: {
        [K in keyof Omit<FreeClassesDiscount, 'type'>]: FreeClassesDiscount[K];
    }) {
        super(discount);
        Object.assign(this, discount);
    }
    override type = 'free-classes';
    override apply(classes: Array<SemesterClass>): {
        updated: Array<SemesterClass>;
        amount: number;
    } {
        const updated = classes.map((c) =>
            this.classIds.includes(c.id) ? { ...c, cost: 0 } : c
        );
        const amount = classes
            .filter((c) => this.classIds.includes(c.id))
            .reduce((acc, c) => acc + (c.cost ?? 0), 0);
        return { updated, amount };
    }
}
