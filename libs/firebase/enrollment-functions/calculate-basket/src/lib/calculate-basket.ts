import { Functions } from '@sol/firebase/functions';
import { _calculateEnrollmentCost } from '@sol/firebase/enrollment-functions/shared';

export const calculateBasket = Functions.endpoint.handle<{
    codes: Array<string>;
    classes: Array<{
        id: string;
        semesterId: string;
        additionalOptionIds: Array<string>;
    }>;
    userCostsToClassIds: Record<string, number | undefined>;
    overrideCosts?: Record<string, number>;
}>(async (request, response) => {
    const {
        codes,
        classes: requestClasses,
        userCostsToClassIds,
        overrideCosts,
    } = request.body.data;

    const result = await _calculateEnrollmentCost({
        selectedClasses: requestClasses,
        discountCodes: codes,
        userCostsToClassIds,
        overrideCosts,
    });

    if ('error' in result) {
        response.status(400).send(result);
        return;
    }

    const { discountAmounts, finalTotal, originalTotal } = result;
    response.send({ discountAmounts, finalTotal, originalTotal });
});
