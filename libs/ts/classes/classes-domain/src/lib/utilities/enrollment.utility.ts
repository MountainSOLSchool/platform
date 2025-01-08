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
        classGroups: Awaited<SemesterClassGroup>[]
    ) {
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

        const basketDiscounts = activeDiscounts.filter(
            (d): d is BasketDiscount => isBasketDiscount(d)
        );

        const classIdsOfClassesInGroups = classGroups.flatMap((g) =>
            g.classes.map((c) => c.id)
        );
        const classesNotInGroups = updatedClasses.filter(
            (c) => !classIdsOfClassesInGroups.includes(c.id)
        );

        const basketTotal = [...classesNotInGroups, ...updatedGroups].reduce(
            (total, { cost }) => total + (cost ?? 0),
            0
        );

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

        const classGroupsTotal = classGroups.reduce(
            (total, { cost }) => total + (cost ?? 0),
            0
        );
        const classesNotInGroupsTotal = classesNotInGroups.reduce(
            (total, { cost }) => total + (cost ?? 0),
            0
        );

        const originalTotal = classGroupsTotal + classesNotInGroupsTotal;

        return {
            updatedClasses,
            updatedGroups,
            finalTotal,
            discountAmounts: [
                ...classDiscountAmounts,
                ...basketDiscountAmounts,
            ],
            originalTotal,
        };
    }
}
