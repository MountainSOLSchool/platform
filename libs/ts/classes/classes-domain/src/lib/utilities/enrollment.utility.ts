import {
    BasketDiscount,
    isBasketDiscount,
} from '../models/discount/basket-discount.abstract';
import {
    ClassesDiscount,
    isClassesDiscount,
} from '../models/discount/classes-discount.abstract';
import { Discount } from '../models/discount/discount';
import { SemesterClass } from '../models/semester-class';
import { SemesterClassGroup } from '../models/semester-class-group';

export type EnrollmentCostResult = {
    finalTotal: number;
    discountAmounts: Array<{ code: string; amount: number }>;
    originalTotal: number;
};

export class EnrollmentUtility {
    static applyUserCosts(
        classes: Array<SemesterClass>,
        userCostsToClassIds: Record<string, number | undefined>
    ): Array<SemesterClass> | { error: string } {
        if (
            classes.some((c) => {
                const userCost = userCostsToClassIds[c.id];
                return userCost
                    ? !c.paymentRange ||
                          userCost < (c.paymentRange.lowest ?? c.cost) ||
                          userCost > (c.paymentRange.highest ?? c.cost)
                    : false;
            })
        ) {
            return {
                error: 'User cost is not within the payment range of the class',
            };
        }
        return classes.map((c) => ({
            ...c,
            cost: c.paymentRange ? userCostsToClassIds[c.id] ?? c.cost : c.cost,
        }));
    }

    static getEnrollmentCost(
        discounts: Discount<unknown>[],
        classes: SemesterClass[],
        classGroups: SemesterClassGroup[],
        additionalOptionIds: Array<string>
    ): EnrollmentCostResult {
        const activeDiscounts = discounts.filter((d) => d.active);

        const classesDiscounts = activeDiscounts.filter(
            (d): d is ClassesDiscount => isClassesDiscount(d)
        );

        const [
            { classes: updatedClasses, groups: updatedGroups },
            classDiscountAmounts,
        ] = classesDiscounts.reduce(
            ([{ classes, groups }, amounts], discount) => {
                const appliedDiscount = discount.apply({ classes, groups });
                return [
                    appliedDiscount.updated,
                    [
                        ...amounts,
                        { code: discount.code, amount: appliedDiscount.amount },
                    ],
                ] satisfies [
                    {
                        classes: Array<SemesterClass>;
                        groups: Array<SemesterClassGroup>;
                    },
                    Array<{ code: string; amount: number }>,
                ];
            },
            [
                { classes, groups: classGroups },
                new Array<{ code: string; amount: number }>(),
            ] satisfies [
                {
                    classes: Array<SemesterClass>;
                    groups: Array<SemesterClassGroup>;
                },
                Array<{ code: string; amount: number }>,
            ]
        );

        const additionalCosts = additionalOptionIds.flatMap((id) =>
            [...classes, ...classGroups.flatMap((cg) => cg.classes)].flatMap(
                (c) => c.additionalOptions?.find((o) => o.id === id)?.cost ?? 0
            )
        );

        const basketDiscounts = activeDiscounts.filter(
            (d): d is BasketDiscount => isBasketDiscount(d)
        );

        const classIdsOfClassesInGroups = classGroups.flatMap((g) =>
            g.classes.map((c) => c.id)
        );
        const updatedClassesNotInGroups = updatedClasses.filter(
            (c) => !classIdsOfClassesInGroups.includes(c.id)
        );

        const classesCostsTotal = [
            ...updatedClassesNotInGroups,
            ...updatedGroups,
        ].reduce((total, { cost }) => total + (cost ?? 0), 0);

        const additionalCostsTotal = additionalCosts.reduce(
            (total, cost) => total + cost,
            0
        );

        const basketTotal = classesCostsTotal + additionalCostsTotal;

        const [finalTotal, basketDiscountAmounts] = basketDiscounts.reduce(
            ([updated, amounts], discount) => {
                const appliedDiscount = discount.apply(updated);
                return [
                    appliedDiscount.updated,
                    [
                        ...amounts,
                        { code: discount.code, amount: appliedDiscount.amount },
                    ],
                ] satisfies [number, Array<{ code: string; amount: number }>];
            },
            [
                basketTotal,
                new Array<{ code: string; amount: number }>(),
            ] satisfies [number, Array<{ code: string; amount: number }>]
        );

        const originalClassGroupsTotal = classGroups.reduce(
            (total, { cost }) => total + (cost ?? 0),
            0
        );
        const originalClassesNotInGroups = classes.filter(
            (c) => !classIdsOfClassesInGroups.includes(c.id)
        );
        const originalClassesNotInGroupsTotal =
            originalClassesNotInGroups.reduce(
                (total, { cost }) => total + (cost ?? 0),
                0
            );

        const originalTotal =
            originalClassGroupsTotal +
            originalClassesNotInGroupsTotal +
            additionalCostsTotal;

        return {
            finalTotal,
            discountAmounts: [
                ...classDiscountAmounts,
                ...basketDiscountAmounts,
            ],
            originalTotal,
        };
    }
}
