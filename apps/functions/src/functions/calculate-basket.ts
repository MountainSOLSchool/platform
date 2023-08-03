import { Functions } from '@sol/firebase/functions';
import { DiscountRepository } from '@sol/classes/repository';
import { Discount, EnrollmentUtility } from '@sol/classes/domain';
import { Semester } from '@sol/firebase/classes/semester';

export const calculateBasket = Functions.endpoint.handle<{
    codes: Array<string>;
    classIds: Array<string>;
    userCostsToClassIds: Record<string, number | undefined>;
}>(async (request, response) => {
    const { codes, classIds, userCostsToClassIds } = request.body.data;
    const discounts = (
        await Promise.all(
            codes.map(async (code) => await DiscountRepository.get(code))
        )
    ).filter((code): code is Discount<unknown> => !!code);

    const groups = await Semester.active().groups.getByClassIds(classIds);

    const idsOfStandaloneClasses = classIds.filter(
        (id) =>
            !groups.some(
                (group) =>
                    !group.classes.find(
                        ({ id: groupClassId }) => groupClassId === id
                    )
            )
    );

    const classes = await Semester.active().classes.getMany(
        idsOfStandaloneClasses
    );

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
