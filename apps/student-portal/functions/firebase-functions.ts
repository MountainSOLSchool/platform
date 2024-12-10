import {
    connectFunctionsEmulator,
    getFunctions,
    httpsCallable,
} from 'firebase/functions';
import { StudentDbEntry } from '@sol/student/domain';
import { SemesterClass, UnitDbEntry } from '@sol/classes/domain';
import { Path } from '../models/path.type';

let _functions: ReturnType<typeof getFunctions> | undefined;

const isProduction = process.env.NODE_ENV === 'production';

export class FirebaseFunctions {
    private static get functions() {
        _functions ??= getConfiguredFunctions();
        return _functions;
    }

    static async getSemesters(): Promise<Array<{ name: string; id: string }>> {
        const getSemestersFn = httpsCallable<
            void,
            {
                semesters: Array<{ name: string; id: string }>;
                currentSemesterId: string;
            }
        >(this.functions, 'historicalSemesters');
        const result = await getSemestersFn();
        return result.data.semesters;
    }

    static async getClassesForSemester(
        semesterId: string
    ): Promise<Array<SemesterClass>> {
        const getClassesForSemesterFn = httpsCallable<
            { query: { semesterId: string } },
            {
                classes: Array<SemesterClass>;
            }
        >(this.functions, 'classes');
        const result = await getClassesForSemesterFn({ query: { semesterId } });
        return result.data.classes;
    }

    static async getAllStudents(
        fields: Array<keyof StudentDbEntry>
    ): Promise<Array<StudentDbEntry>> {
        const allStudentsFn = httpsCallable<
            { fields: Array<keyof StudentDbEntry> },
            { students: Array<StudentDbEntry> }
        >(this.functions, 'allStudents');
        const result = await allStudentsFn({ fields });
        return result.data.students;
    }

    static async getFullUnitsAndPaths(): Promise<{
        paths: Array<Path>;
        units: Record<string, UnitDbEntry>;
    }> {
        const getPathsFn = httpsCallable<
            void,
            {
                paths: Array<Path>;
                units: Record<string, UnitDbEntry>;
            }
        >(this.functions, 'fullUnitsAndPaths');
        const result = await getPathsFn();
        return result.data;
    }

    static async updateCompletedUnits(
        studentId: string,
        completedUnitIds: Array<string>
    ): Promise<void> {
        const updateCompletedUnitsFn = httpsCallable<
            { studentId: string; completedUnitIds: Array<string> },
            void
        >(this.functions, 'updateCompletedUnits');
        await updateCompletedUnitsFn({ studentId, completedUnitIds });
        return undefined;
    }

    static async getCompletedUnitIds(
        studentId: string
    ): Promise<Array<string>> {
        const getCompletedUnitsFn = httpsCallable<
            { studentId: string },
            {
                completedUnitIds: Array<string>;
            }
        >(this.functions, 'getCompletedUnits');
        const result = await getCompletedUnitsFn({ studentId });
        return result.data.completedUnitIds;
    }
}

function getConfiguredFunctions() {
    const functions = getFunctions();
    if (!isProduction) {
        connectFunctionsEmulator(functions, 'localhost', 5001);
    }
    return functions;
}
