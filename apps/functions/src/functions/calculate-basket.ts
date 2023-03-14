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
    classGroupIds: Array<string>;
}>(async (request, response) => {
    const { codes, classIds, classGroupIds } = request.body.data;
    const discounts = (
        await Promise.all(
            codes.map(async (code) => await DiscountRepository.get(code))
        )
    ).filter((code): code is Discount<unknown> => !!code);
    const classes = await Promise.all(
        classIds.map(
            async (id) =>
                await SemesterRepository.of(SUMMER_2023_SEMESTER).classes.get(
                    id
                )
        )
    );
    const groups = await Promise.all(
        classGroupIds.map(
            async (id) =>
                await SemesterRepository.of(SUMMER_2023_SEMESTER).groups.get(id)
        )
    );
    const { discountAmounts, finalTotal, originalTotal } =
        EnrollmentUtility.getEnrollmentCost(discounts, classes, groups);
    response.send({ discountAmounts, finalTotal, originalTotal });
});
