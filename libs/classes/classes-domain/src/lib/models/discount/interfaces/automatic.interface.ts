import { Discount } from './discount.interface';

export interface AutomaticDiscount extends Discount {
    automatic: true;
}
