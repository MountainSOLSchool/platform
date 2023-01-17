import { Class } from '../../class';
import { ClassesAbstractDiscount } from '../abstract/classes.abstract.discount';
import { DiscountConstructor } from '../discount.constructor.type';

export class ClassesPercentDiscount extends ClassesAbstractDiscount {
    override type = 'classes-percent';

    constructor(discount: DiscountConstructor<ClassesPercentDiscount>) {
        super(discount);
    }

    percent!: number;

    apply(classes: Array<Class>): { updated: Array<Class>; amount: number } {
        const updated = classes.map((c) => {
            if (this.classIds.includes(c.id)) {
                return {
                    ...c,
                    cost: this.atLeastZero(
                        (c.cost ?? 0) * (1 - this.percent / 100)
                    ),
                };
            } else {
                return c;
            }
        });
        const amount =
            classes.reduce((acc, c) => acc + (c.cost ?? 0), 0) -
            updated.reduce((acc, c) => acc + (c.cost ?? 0), 0);
        return { updated, amount };
    }
}
