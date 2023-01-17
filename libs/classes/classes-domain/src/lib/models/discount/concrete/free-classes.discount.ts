import { Class } from '../../class';
import { ClassesAbstractDiscount } from '../abstract/classes.abstract.discount';
import { DiscountConstructor } from '../discount.constructor.type';

export class FreeClassesDiscount extends ClassesAbstractDiscount {
    constructor(discount: DiscountConstructor<FreeClassesDiscount>) {
        super(discount);
    }
    override type = 'free-classes';
    override apply(classes: Array<Class>): {
        updated: Array<Class>;
        amount: number;
    } {
        const updated = classes.map((c) =>
            this.classIds.includes(c.id) ? { ...c, cost: 0 } : c
        );
        const amount = classes
            .filter((c) => this.classIds.includes(c.id))
            .reduce((acc, c) => acc + (c.cost ?? 0), 0);
        return { updated, amount };
    }
}
