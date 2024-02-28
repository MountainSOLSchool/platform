import { SemesterClass } from '@sol/classes/domain';
import { Semester } from '@sol/firebase/classes/semester';

export async function _getClassesForSemester(
    semesterId: string
): Promise<Array<SemesterClass>> {
    return await Semester.of(semesterId).classes.getAll();
}
