import { V1DatabaseUtility } from '@sol/firebase/database';

export async function _getSemestersAvailableToEnrollV1() {
    const activeSemesterDoc = await V1DatabaseUtility.getDocumentRef(
        `config/activeSemester`
    );
    const activeSemester = await activeSemesterDoc.get();
    const otherSemestersAvailableToEnrollDoc =
        await V1DatabaseUtility.getDocumentRef(
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
                const semesterDoc = await V1DatabaseUtility.getDocumentRef(
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
    return semesters;
}
