import { AbstractDiscount } from './discount';

export type DiscountConstructor<
    DiscountType extends AbstractDiscount<unknown>
> = {
    [K in keyof Omit<DiscountType, 'type'>]: DiscountType[K];
};
