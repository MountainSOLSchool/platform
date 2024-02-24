import { Functions } from '@sol/firebase/functions';
import { _getCategorizedClasses } from './_getCategorizedClasses';

export const availableEnrollmentClasses = Functions.endpoint.handle(
    async (request, response) => {
        const { groups, classesNotInGroups } = await _getCategorizedClasses();

        response.send({ classes: classesNotInGroups, groups });
    }
);
