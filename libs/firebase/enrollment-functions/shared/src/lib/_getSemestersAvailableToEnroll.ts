import { DatabaseUtility } from '@sol/firebase/database';
import { AdditionalInfoPanel } from '@sol/classes/domain'; // Add to your imports

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
                const semesterData = semester.data();
                
                return {
                    id: semesterId,
                    name: semesterData?.displayName as string,
                    additionalInfoPanel: semesterData?.additionalInfoPanel as AdditionalInfoPanel | undefined,
                };
            }
        )
    );
    return semesters;
}
