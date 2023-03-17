import { Functions } from '@sol/firebase/functions';
import {
    DiscountRepository,
    SemesterRepository,
    SUMMER_2023_SEMESTER,
} from '@sol/classes/repository';
import { Discount, EnrollmentUtility } from '@sol/classes/domain';

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

    const groups = await SemesterRepository.of(
        SUMMER_2023_SEMESTER
    ).groups.getByClassIds(classIds);

    const idsOfStandaloneClasses = classIds.filter(
        (id) =>
            !groups.some(
                (group) =>
                    !group.classes.find(
                        ({ id: groupClassId }) => groupClassId === id
                    )
            )
    );

    const classes = await SemesterRepository.of(
        SUMMER_2023_SEMESTER
    ).classes.getMany(idsOfStandaloneClasses);

    const { discountAmounts, finalTotal, originalTotal } =
        EnrollmentUtility.getEnrollmentCost(discounts, classes, groups);
    response.send({ discountAmounts, finalTotal, originalTotal });
});
