import { Class } from '../../class';
import { AbstractDiscount } from '../discount';
import { DiscountConstructor } from '../discount.constructor.type';

class _ClassesDiscount extends AbstractDiscount<Array<Class>> {
    apply(classes: Array<Class>): { updated: Array<Class>; amount: number } {
        throw new Error('Not implemented in private class');
    }
}

export abstract class ClassesAbstractDiscount extends _ClassesDiscount {
    constructor(discount: DiscountConstructor<ClassesAbstractDiscount>) {
        super(discount);
    }
    classIds!: Array<string>;
    abstract override apply(classes: Array<Class>): {
        updated: Array<Class>;
        amount: number;
    };
}

export const isClassesDiscount = (
    discount: AbstractDiscount<unknown>
): discount is ClassesAbstractDiscount => discount instanceof _ClassesDiscount;
