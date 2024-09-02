import {
    connectFunctionsEmulator,
    getFunctions,
    httpsCallable,
} from 'firebase/functions';
import { StudentDbEntry } from '@sol/student/domain';
import { UnitDbEntry } from '@sol/classes/domain';
import { Path } from '../models/path.type';

let _functions: ReturnType<typeof getFunctions> | undefined;

const isProduction = process.env.NODE_ENV === 'production';

export class FirebaseFunctions {
    private static get functions() {
        _functions ??= getConfiguredFunctions();
        return _functions;
    }

    static getAllStudents(
        fields: Array<keyof StudentDbEntry>
    ): Promise<Array<StudentDbEntry>> {
        const allStudentsFn = httpsCallable<
            { fields: Array<keyof StudentDbEntry> },
            { students: Array<StudentDbEntry> }
        >(this.functions, 'allStudents');
        return allStudentsFn({ fields }).then((result) => result.data.students);
    }

    static getFullUnitsAndPaths(): Promise<{
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
        return getPathsFn().then((result) => result.data);
    }

    static updateCompletedUnits(
        studentId: string,
        completedUnitIds: Array<string>
    ): Promise<void> {
        const updateCompletedUnitsFn = httpsCallable<
            { studentId: string; completedUnitIds: Array<string> },
            void
        >(this.functions, 'updateCompletedUnits');
        return updateCompletedUnitsFn({ studentId, completedUnitIds }).then(
            () => undefined
        );
    }

    static getCompletedUnitIds(studentId: string): Promise<Array<string>> {
        const getCompletedUnitsFn = httpsCallable<
            { studentId: string },
            {
                completedUnitIds: Array<string>;
            }
        >(this.functions, 'getCompletedUnits');
        return getCompletedUnitsFn({ studentId }).then(
            (result) => result.data.completedUnitIds
        );
    }
}

function getConfiguredFunctions() {
    const functions = getFunctions();
    if (!isProduction) {
        connectFunctionsEmulator(functions, 'localhost', 5001);
    }
    return functions;
}
