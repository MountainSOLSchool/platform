import { SemesterClass } from '../semester-class';
import { ClassesDiscount } from './classes-discount';
import { SemesterClassGroup } from '../semester-class-group';

export class ClassesPercentDiscount extends ClassesDiscount {
    override type = 'classes-percent';

    constructor(discount: {
        [K in keyof Omit<
            ClassesPercentDiscount,
            'type'
        >]: ClassesPercentDiscount[K];
    }) {
        super(discount);
        Object.assign(this, discount);
    }

    percent!: number;

    apply({
        classes,
        groups,
    }: {
        classes: Array<SemesterClass>;
        groups: Array<SemesterClassGroup>;
    }) {
        const updatedClasses = classes.map((c) => {
            if (this.classOrGroupIds.includes(c.id)) {
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
        const updatedGroups = groups.map((g) => {
            if (this.classOrGroupIds.includes(g.id)) {
                return {
                    ...g,
                    cost: this.atLeastZero(
                        (g.cost ?? 0) * (1 - this.percent / 100)
                    ),
                };
            } else {
                return g;
            }
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
    }
}
