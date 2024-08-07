import {
    connectFunctionsEmulator,
    getFunctions,
    httpsCallable,
} from 'firebase/functions';
import { StudentDbEntry } from '@sol/student/domain';

let _functions: ReturnType<typeof getFunctions> | undefined;

export class FirebaseFunctions {
    private static get functions() {
        const functions =
            _functions ??
            (() => {
                const functions = getFunctions();
                // TODO: remove this when we are done testing
                connectFunctionsEmulator(functions, 'localhost', 5001);
                _functions = functions;
                return functions;
            })();
        _functions = functions;
        return _functions;
    }

    static getAllStudents(): Promise<Array<StudentDbEntry>> {
        const allStudentsFn = httpsCallable<
            void,
            { students: Array<StudentDbEntry> }
        >(this.functions, 'allStudents');
        return allStudentsFn().then((result) => result.data.students);
    }
}
