import { Functions } from '@sol/firebase/functions';
import { _getSemestersAvailableToEnroll } from './_getSemestersAvailableToEnroll';

export const semestersAvailableToEnroll = Functions.endpoint.handle<
    | {
          ids: Array<string>;
      }
    | undefined
>(async (request, response) => {
    const semesters = await _getSemestersAvailableToEnroll();

    response.send({
        semesters,
    });
});
