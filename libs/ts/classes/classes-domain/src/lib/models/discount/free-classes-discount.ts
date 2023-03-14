import { SemesterClass } from '../semester-class';
import { ClassesDiscount } from './classes-discount';
import { SemesterClassGroup } from '../semester-class-group';

export class FreeClassesDiscount extends ClassesDiscount {
    constructor(discount: {
        [K in keyof Omit<FreeClassesDiscount, 'type'>]: FreeClassesDiscount[K];
    }) {
        super(discount);
        Object.assign(this, discount);
    }
    override type = 'free-classes';
    override apply({
        classes,
        groups,
    }: {
        classes: Array<SemesterClass>;
        groups: Array<SemesterClassGroup>;
    }) {
        const updatedClasses = classes.map((c) =>
            this.classOrGroupIds.includes(c.id) ? { ...c, cost: 0 } : c
        );
        const updatedGroups = groups.map((g) =>
            this.classOrGroupIds.includes(g.id) ? { ...g, cost: 0 } : g
        );
        const amount =
            classes
                .filter((c) => this.classOrGroupIds.includes(c.id))
                .reduce((acc, c) => acc + (c.cost ?? 0), 0) +
            groups
                .filter((g) => this.classOrGroupIds.includes(g.id))
                .reduce((acc, g) => acc + (g.cost ?? 0), 0);
        return {
            updated: { classes: updatedClasses, groups: updatedGroups },
            amount,
        };
    }
}
