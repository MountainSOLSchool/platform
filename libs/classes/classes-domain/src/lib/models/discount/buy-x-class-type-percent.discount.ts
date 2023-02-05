import { SemesterClass } from '../semester-class';
import { SemesterClassGroup } from '../semester-class-group';
import { ClassesDiscount } from './classes-discount';

/**
 * Discounts the cost of every class by a percent when there are X or more classes of the same type
 */
export class BuyXClassTypePercentDiscount extends ClassesDiscount {
    override type = 'buy-x-class-type-percent';

    constructor(discount: {
        [K in keyof Omit<
            BuyXClassTypePercentDiscount,
            'type'
        >]: BuyXClassTypePercentDiscount[K];
    }) {
        super(discount);
        Object.assign(this, discount);
    }

    percent!: number;
    classType!: string;
    minimum!: number;

    apply({
        classes,
        groups,
    }: {
        classes: Array<SemesterClass>;
        groups: Array<SemesterClassGroup>;
    }) {
        const hasMinimum =
            classes.filter((c) => c.classType === this.classType).length >=
            this.minimum;
        if (hasMinimum) {
            const updatedClasses = classes.map((c) => {
                return {
                    ...c,
                    cost: this.atLeastZero(
                        (c.cost ?? 0) * (1 - this.percent / 100)
                    ),
                };
            });
            const updatedGroups = groups.map((g) => {
                return {
                    ...g,
                    cost: this.atLeastZero(
                        (g.cost ?? 0) * (1 - this.percent / 100)
                    ),
                };
            });
            const amount =
                classes.reduce((acc, c) => acc + (c.cost ?? 0), 0) -
                updatedClasses.reduce((acc, c) => acc + (c.cost ?? 0), 0) +
                (groups.reduce((acc, g) => acc + (g.cost ?? 0), 0) -
                    updatedGroups.reduce((acc, g) => acc + (g.cost ?? 0), 0));
            return {
                updated: { classes: updatedClasses, groups: updatedGroups },
                amount,
            };
        } else {
            return { updated: { classes, groups }, amount: 0 };
        }
    }
}
