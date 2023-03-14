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
    classTypes!: Array<string>;
    minimum!: number;

    apply({
        classes,
        groups,
    }: {
        classes: Array<SemesterClass>;
        groups: Array<SemesterClassGroup>;
    }) {
        const hasMinimum =
            classes.filter((c) => this.classTypes.includes(c.classType))
                .length >= this.minimum;
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
            const classIdsOfClassesInGroups = groups
                .map((g) => g.classes.map((c) => c.id))
                .reduce((acc, c) => acc.concat(c), []);
            const updatedClassesNotInGroups = updatedClasses.filter(
                (c) => !classIdsOfClassesInGroups.includes(c.id)
            );
            const originalClassesNotInGroups = classes.filter(
                (c) => !classIdsOfClassesInGroups.includes(c.id)
            );
            const amountSavedFromClassesTotal =
                originalClassesNotInGroups.reduce(
                    (acc, c) => acc + (c.cost ?? 0),
                    0
                ) -
                updatedClassesNotInGroups.reduce(
                    (acc, c) => acc + (c.cost ?? 0),
                    0
                );
            const amountSavedFromGroupsTotal =
                groups.reduce((acc, g) => acc + (g.cost ?? 0), 0) -
                updatedGroups.reduce((acc, g) => acc + (g.cost ?? 0), 0);

            const amount =
                amountSavedFromClassesTotal + amountSavedFromGroupsTotal;

            return {
                updated: { classes: updatedClasses, groups: updatedGroups },
                amount,
            };
        } else {
            return { updated: { classes, groups }, amount: 0 };
        }
    }
}
