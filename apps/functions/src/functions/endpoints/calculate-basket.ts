import { Functions } from '@sol/firebase/functions';
import { DiscountRepository } from '@sol/classes/repository';
import { Discount, EnrollmentUtility } from '@sol/classes/domain';
import { Semester } from '@sol/firebase/classes/semester';

export const calculateBasket = Functions.endpoint.handle<{
    codes: Array<string>;
    classes: Array<{ id: string; semesterId: string }>;
    userCostsToClassIds: Record<string, number | undefined>;
}>(async (request, response) => {
    const {
        codes,
        classes: requestClasses,
        userCostsToClassIds,
    } = request.body.data;
    const discounts = (
        await Promise.all(
            codes.map(async (code) => await DiscountRepository.get(code))
        )
    ).filter((code): code is Discount<unknown> => !!code);

    const classIds = requestClasses.map(({ id }) => id);
    const semesterIds = Array.from(
        new Set(requestClasses.map(({ semesterId }) => semesterId))
    );
    const groups = await Promise.all(
        semesterIds.map(async (semesterId) => {
            const groups =
                await Semester.of(semesterId).groups.getByClassIds(classIds);
            return groups;
        })
    ).then((groups) => groups.flat());

    const standaloneClasses = requestClasses.filter(
        (requestClass) =>
            !groups.some(
                (group) =>
                    !group.classes.find(
                        ({ id: groupClassId }) =>
                            groupClassId === requestClass.id
                    )
            )
    );

    const classIdsBySemesterId = standaloneClasses.reduce(
        (acc, { id, semesterId }) => {
            if (!acc[semesterId]) {
                acc[semesterId] = [];
            }
            acc[semesterId].push(id);
            return acc;
        },
        {} as Record<string, Array<string>>
    );
    const classes = await Promise.all(
        Object.entries(classIdsBySemesterId).map(
            async ([semesterId, classIds]) => {
                const classes =
                    await Semester.of(semesterId).classes.getMany(classIds);
                return classes;
            }
        )
    ).then((classes) => classes.flat());

    const classesWithUserCostsApplied = EnrollmentUtility.applyUserCosts(
        classes,
        userCostsToClassIds
    );

    if ('error' in classesWithUserCostsApplied) {
        response.status(400).send(classesWithUserCostsApplied);
        return;
    }

    const { discountAmounts, finalTotal, originalTotal } =
        EnrollmentUtility.getEnrollmentCost(
            discounts,
            classesWithUserCostsApplied,
            groups
        );
    response.send({ discountAmounts, finalTotal, originalTotal });
});
