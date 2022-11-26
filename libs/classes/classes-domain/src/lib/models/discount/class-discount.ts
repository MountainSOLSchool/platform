import { Class } from '../class';
import { Discount } from './discount';

class _ClassesDiscount extends Discount<Array<Class>> {
    apply(classes: Array<Class>): Array<Class> {
        throw new Error('Not implemented in private class');
    }
}

export abstract class ClassesDiscount extends _ClassesDiscount {
    constructor(discount: {
        [K in keyof Omit<ClassesDiscount, 'type'>]: ClassesDiscount[K];
    }) {
        super(discount);
        Object.assign(this, discount);
    }
    classIds!: Array<string>;
    abstract override apply(classes: Array<Class>): Array<Class>;
}

export const isClassesDiscount = (
    discount: Discount<unknown>
): discount is ClassesDiscount => discount instanceof _ClassesDiscount;
