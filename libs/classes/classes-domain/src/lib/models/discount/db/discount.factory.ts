import { AmountDiscount } from '../concrete/amount.discount';
import { ClassesPercentDiscount } from '../concrete/classes-percent.discount';
import { Discount } from '../interfaces/discount.interface';
import { FreeClassesDiscount } from '../concrete/free-classes.discount';
import { PercentDiscount } from '../concrete/percent.discount';

export class DiscountFactory {
    static fromDbo(dbo: Discount) {
        switch (dbo.type) {
            case 'amount':
                return new AmountDiscount(dbo as AmountDiscount);
            case 'classes-percent':
                return new ClassesPercentDiscount(
                    dbo as ClassesPercentDiscount
                );
            case 'free-classes':
                return new FreeClassesDiscount(dbo as FreeClassesDiscount);
            case 'percent':
                return new PercentDiscount(dbo as PercentDiscount);
        }
        throw new Error(`Unknown discount type: ${dbo.type}`);
    }
}
