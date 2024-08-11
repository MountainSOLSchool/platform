import {
    connectFunctionsEmulator,
    getFunctions,
    httpsCallable,
} from 'firebase/functions';
import { StudentDbEntry } from '@sol/student/domain';
import { PathDbEntry, UnitDbEntry } from '@sol/classes/domain';

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
        paths: Array<PathDbEntry>;
        units: Record<string, UnitDbEntry>;
    }> {
        const getPathsFn = httpsCallable<
            void,
            {
                paths: Array<PathDbEntry>;
                units: Record<string, UnitDbEntry>;
            }
        >(this.functions, 'fullUnitsAndPaths');
        return getPathsFn().then((result) => result.data);
    }
}

function getConfiguredFunctions() {
    const functions = getFunctions();
    if (!isProduction) {
        connectFunctionsEmulator(functions, 'localhost', 5001);
    }
    return functions;
}
