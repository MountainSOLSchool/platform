import { AmountDiscount } from './amount';
import { ClassesPercentDiscount } from './classes-percent';
import { DiscountDbo } from './discount.dbo';
import { FreeClassesDiscount } from './free-classes-discount';
import { PercentDiscount } from './percent';
import { BuyXClassTypePercentDiscount } from './buy-x-class-type-percent.discount';

export class DiscountFactory {
    static fromDbo(dbo: DiscountDbo) {
        switch (dbo.type) {
            case 'amount':
                return new AmountDiscount(dbo as AmountDiscount);
            case 'buy-x-class-type-percent':
                return new BuyXClassTypePercentDiscount(
                    dbo as BuyXClassTypePercentDiscount
                );
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
