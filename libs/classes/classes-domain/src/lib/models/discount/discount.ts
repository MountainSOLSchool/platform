import { DiscountConstructor } from './discount.constructor.type';

export abstract class AbstractDiscount<T> {
    constructor(discount: DiscountConstructor<AbstractDiscount<T>>) {
        Object.assign(this, discount);
    }
    type!: string;
    id!: string;
    active = false;
    abstract apply(...dependencies: Array<unknown>): {
        updated: T;
        amount: number;
    };

    protected atLeastZero(value: number): number {
        return value > 0 ? value : 0;
    }
}
