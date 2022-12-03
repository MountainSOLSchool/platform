import { AmountDiscount } from './amount';
import { ClassesPercentDicount } from './class-percent';
import { DiscountDbo } from './discount.dbo';
import { FreeClassesDiscount } from './free-classes-discount';
import { PercentDicount } from './percent';

export class DiscountFactory {
    static fromDbo(dbo: DiscountDbo) {
        switch (dbo.type) {
            case 'amount':
                return new AmountDiscount(dbo as AmountDiscount);
            case 'classes-percent':
                return new ClassesPercentDicount(dbo as ClassesPercentDicount);
            case 'free-classes':
                return new FreeClassesDiscount(dbo as FreeClassesDiscount);
            case 'percent':
                return new PercentDicount(dbo as PercentDicount);
        }
        throw new Error(`Unknown discount type: ${dbo.type}`);
    }
}
