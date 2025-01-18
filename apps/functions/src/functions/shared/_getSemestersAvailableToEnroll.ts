import { DatabaseUtility } from '@sol/firebase/database';

export async function _getSemestersAvailableToEnroll() {
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

    // const activeSemesterId: string = activeSemester.data()?.id;
    // const otherAvailableSemesterIds: Array<string> =
    //     otherSemestersAvailableToEnroll.data()?.list ?? [];
    const activeSemesterId = 'summer2025';
    const otherAvailableSemesterIds: Array<string> = [];

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
    return semesters;
}
