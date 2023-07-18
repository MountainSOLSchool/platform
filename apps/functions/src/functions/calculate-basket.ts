import { Functions } from '@sol/firebase/functions';
import { DiscountRepository } from '@sol/classes/repository';
import { Discount, EnrollmentUtility } from '@sol/classes/domain';
import { Semester } from '@sol/firebase/classes/semester';

export const calculateBasket = Functions.endpoint.handle<{
    codes: Array<string>;
    classIds: Array<string>;
}>(async (request, response) => {
    const { codes, classIds } = request.body.data;
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

    const { discountAmounts, finalTotal, originalTotal } =
        EnrollmentUtility.getEnrollmentCost(discounts, classes, groups);
    response.send({ discountAmounts, finalTotal, originalTotal });
});
