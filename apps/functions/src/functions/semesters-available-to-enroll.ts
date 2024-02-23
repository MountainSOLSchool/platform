import { Functions } from '@sol/firebase/functions';

import { DatabaseUtility } from '@sol/firebase/database';

export const semestersAvailableToEnroll = Functions.endpoint.handle<
    | {
          ids: Array<string>;
      }
    | undefined
>(async (request, response) => {
    const activeSemesterDoc = await DatabaseUtility.getDocumentRef(
        `config/activeSemester`
    );
    const activeSemester = await activeSemesterDoc.get();
    const otherSemestersAvailableToEnrollDoc =
        await DatabaseUtility.getDocumentRef(
            `config/otherSemestersAvailableToEnroll`
        );
    const otherSemestersAvailableToEnroll =
        await otherSemestersAvailableToEnrollDoc.get();

    const activeSemesterId: string = activeSemester.data()?.id;
    const otherAvailableSemesterIds: Array<string> =
        otherSemestersAvailableToEnroll.data()?.list ?? [];

    const semesters = await Promise.all(
        [activeSemesterId, ...otherAvailableSemesterIds].map(
            async (semesterId) => {
                const semesterDoc = await DatabaseUtility.getDocumentRef(
                    `semesters/${semesterId}`
                );
                const semester = await semesterDoc.get();
                return {
                    id: semesterId,
                    name: semester.data()?.displayName as string,
                };
            }
        )
    );

    response.send({
        semesters,
    });
});
