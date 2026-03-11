import { Discount, EnrollmentUtility, EnrollmentCostResult } from '@sol/classes/domain';
import { SemesterClass } from '@sol/classes/domain';
import { SemesterClassGroup } from '@sol/classes/domain';
import { DiscountRepository } from '@sol/classes/repository';
import { _getClasses } from './_getClasses';
import { _getClassGroupsFromClasses } from './_getClassGroupsFromClasses';

export interface CalculateEnrollmentCostInput {
    selectedClasses: Array<{
        id: string;
        semesterId: string;
        additionalOptionIds: Array<string>;
    }>;
    discountCodes: Array<string>;
    userCostsToClassIds: Record<string, number | undefined>;
    overrideCosts?: Record<string, number>;
}

export interface CalculateEnrollmentCostResult extends EnrollmentCostResult {
    classes: Array<SemesterClass>;
    classGroups: Array<SemesterClassGroup>;
}

/**
 * Shared cost calculation used by calculateBasket, enroll, and enrollAddendum.
 * This is the single source of truth for enrollment pricing.
 *
 * Steps:
 * 1. Fetch class details and class groups
 * 2. Filter standalone classes (not part of a complete group)
 * 3. Apply user costs (sliding scale)
 * 4. Apply override costs (e.g. zero for locked classes in addendum)
 * 5. Compute final cost via EnrollmentUtility
 */
export async function _calculateEnrollmentCost(
    input: CalculateEnrollmentCostInput
): Promise<CalculateEnrollmentCostResult | { error: string }> {
    const {
        selectedClasses,
        discountCodes,
        userCostsToClassIds,
        overrideCosts,
    } = input;

    // Fetch groups for ALL classes (ensures consistent group detection)
    const classGroups = Object.values(
        await _getClassGroupsFromClasses(selectedClasses)
    ).flatMap((g) => g);

    // Determine which classes are standalone (not part of a COMPLETE group)
    const standaloneClassEntries = selectedClasses.filter(
        (rc) =>
            !classGroups.some(
                (group) =>
                    group.classes.some((c) => c.id === rc.id) &&
                    group.classes.every((groupClass) =>
                        selectedClasses.some(
                            (sc) => sc.id === groupClass.id
                        )
                    )
            )
    );

    // Fetch class details for standalone classes only
    // (grouped classes get their cost from the group)
    const classIdsBySemesterId = standaloneClassEntries.reduce(
        (acc, { id, semesterId }) => {
            if (!acc[semesterId]) {
                acc[semesterId] = [];
            }
            acc[semesterId].push(id);
            return acc;
        },
        {} as Record<string, Array<string>>
    );

    const classes = (
        await Promise.all(
            Object.entries(classIdsBySemesterId).map(
                async ([semesterId, classIds]) => {
                    const fetchedClasses = Object.values(
                        await _getClasses(
                            classIds.map((id) => ({ id, semesterId }))
                        )
                    ).flatMap((c) => c);
                    return fetchedClasses;
                }
            )
        )
    ).flat();

    // Apply user costs (sliding scale)
    const classesWithUserCosts = EnrollmentUtility.applyUserCosts(
        classes,
        userCostsToClassIds
    );

    if ('error' in classesWithUserCosts) {
        return classesWithUserCosts;
    }

    // Apply override costs (e.g. zeroing locked class costs in addendum mode)
    const finalClasses = overrideCosts
        ? classesWithUserCosts.map((c) =>
              overrideCosts[c.id] !== undefined
                  ? { ...c, cost: overrideCosts[c.id] }
                  : c
          )
        : classesWithUserCosts;

    // Fetch discounts
    const discounts = (
        await Promise.all(
            discountCodes.map(
                async (code) => await DiscountRepository.get(code)
            )
        )
    ).filter((d): d is Discount<unknown> => !!d);

    // Calculate cost
    const additionalOptionIds = selectedClasses.flatMap(
        ({ additionalOptionIds }) => additionalOptionIds
    );

    const costResult = EnrollmentUtility.getEnrollmentCost(
        discounts,
        finalClasses,
        classGroups,
        additionalOptionIds
    );

    return {
        ...costResult,
        classes,
        classGroups,
    };
}
