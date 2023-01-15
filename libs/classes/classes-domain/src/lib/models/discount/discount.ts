export abstract class Discount<T> {
    constructor(discount: {
        [K in keyof Omit<Discount<T>, 'type'>]: Discount<T>[K];
    }) {
        Object.assign(this, discount);
    }
    type!: string;
    code!: string;
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
