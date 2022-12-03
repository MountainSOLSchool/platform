export abstract class Discount<T> {
    constructor(discount: {
        [K in keyof Omit<Discount<T>, 'type'>]: Discount<T>[K];
    }) {
        Object.assign(this, discount);
    }
    type!: string;
    code!: number;
    id!: string;
    abstract apply(...dependencies: Array<unknown>): T;
    protected atLeastZero(value: number): number {
        return value > 0 ? value : 0;
    }
}
