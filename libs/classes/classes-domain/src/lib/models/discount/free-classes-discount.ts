import { Class } from '../class';
import { ClassesDiscount } from './class-discount';

export class FreeClassesDiscount extends ClassesDiscount {
    constructor(discount: {
        [K in keyof Omit<FreeClassesDiscount, 'type'>]: FreeClassesDiscount[K];
    }) {
        super(discount);
        Object.assign(this, discount);
    }
    override type = 'free-classes';
    override apply(classes: Array<Class>): Array<Class> {
        return classes.map((c) =>
            this.classIds.includes(c.id) ? { ...c, cost: 0 } : c
        );
    }
}
