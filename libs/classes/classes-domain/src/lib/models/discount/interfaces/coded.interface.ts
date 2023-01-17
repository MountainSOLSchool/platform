import { Discount } from './discount.interface';

export interface CodedDiscount extends Discount {
    code: string;
}
