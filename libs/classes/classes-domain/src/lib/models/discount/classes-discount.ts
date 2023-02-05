import { SemesterClass } from '../semester-class';
import { Discount } from './discount';
import { SemesterClassGroup } from '../semester-class-group';

class _ClassesDiscount extends Discount<{
    classes: Array<SemesterClass>;
    groups: Array<SemesterClassGroup>;
}> {
    apply({
        classes,
        groups,
    }: {
        classes: Array<SemesterClass>;
        groups: Array<SemesterClassGroup>;
    }): {
        updated: {
            classes: Array<SemesterClass>;
            groups: Array<SemesterClassGroup>;
        };
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
    classOrGroupIds!: Array<string>;
    abstract override apply({
        classes,
        groups,
    }: {
        classes: Array<SemesterClass>;
        groups: Array<SemesterClassGroup>;
    }): {
        updated: {
            classes: Array<SemesterClass>;
            groups: Array<SemesterClassGroup>;
        };
        amount: number;
    };
}

export const isClassesDiscount = (
    discount: Discount<unknown>
): discount is ClassesDiscount => discount instanceof _ClassesDiscount;
