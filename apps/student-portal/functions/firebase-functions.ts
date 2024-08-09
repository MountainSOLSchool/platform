import {
    connectFunctionsEmulator,
    getFunctions,
    httpsCallable,
} from 'firebase/functions';
import { StudentDbEntry } from '@sol/student/domain';

const functions = getFunctions();
// TODO: remove this when we are done testing
connectFunctionsEmulator(functions, 'localhost', 5001);

export class FirebaseFunctions {
    static getAllStudents(): Promise<Array<StudentDbEntry>> {
        const allStudentsFn = httpsCallable<
            void,
            { students: Array<StudentDbEntry> }
        >(functions, 'allStudents');
        return allStudentsFn().then((result) => result.data.students);
    }
}
