import { Class } from '../../class';
import { ClassesAbstractDiscount } from '../abstract/classes.abstract.discount';
import { DiscountConstructor } from '../discount.constructor.type';

export class PairClassesDiscount extends ClassesAbstractDiscount {
    constructor(discount: DiscountConstructor<PairClassesDiscount>) {
        super(discount);
    }
    override type = 'pair-classes';
    classType!: string;
    amount!: number;
    override apply(classes: Array<Class>): {
        updated: Array<Class>;
        amount: number;
    } {
        const classesWithPairIds = classes.filter(
            (c): c is Class => !!c.pairId
        );
        const pairedClasses = classesWithPairIds
            .map((c) => {
                const pair = classes.find(
                    (potential) => potential.id === c.pairId
                );
                return pair ? ([c, pair] as const) : undefined;
            })
            .filter((pair): pair is [Class, Class] => !!pair)
            .reduce((acc, val) => acc.concat(val), new Array<Class>());
        const updatedPairs = pairedClasses.map((c) =>
            this.classIds.includes(c.id)
                ? { ...c, cost: c.cost - this.amount }
                : c
        );
        const pairedClassIds = pairedClasses.map((c) => c.id);
        const updated = [
            ...classes.filter((c) => !pairedClassIds.includes(c.id)),
            ...updatedPairs,
        ];
        const amount = classes
            .filter((c) => this.classIds.includes(c.id))
            .reduce((acc, c) => acc + (c.cost ?? 0), 0);
        return { updated, amount };
    }
}
