import { Discount } from './discount';

export interface AmountDiscount extends Discount {
    type: 'amount';
    amount: number;
}
