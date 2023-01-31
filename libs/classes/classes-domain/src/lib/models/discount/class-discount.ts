import { SemesterClass } from '../semester-class';
import { Discount } from './discount';

class _ClassesDiscount extends Discount<Array<SemesterClass>> {
    apply(classes: Array<SemesterClass>): {
        updated: Array<SemesterClass>;
        amount: number;
    } {
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
    abstract override apply(classes: Array<SemesterClass>): {
        updated: Array<SemesterClass>;
        amount: number;
    };
}

export const isClassesDiscount = (
    discount: Discount<unknown>
): discount is ClassesDiscount => discount instanceof _ClassesDiscount;
