import { _getSemestersAvailableToEnroll } from '@sol/firebase/enrollment-functions/shared';
import { Functions } from '@sol/firebase/functions';

export const semestersAvailableToEnroll = Functions.endpoint.handle<
    | {
        ids: Array<string>;
    }
    | undefined
>(async (_, response) => {
    const semesters = await _getSemestersAvailableToEnroll();

    response.send({
        semesters,
    });
});
