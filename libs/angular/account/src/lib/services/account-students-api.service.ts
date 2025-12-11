import { inject, Injectable } from '@angular/core';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';

export interface ClassEnrollment {
    id: string;
    semesterId: string;
}

export interface StudentSummary {
    id: string;
    name: string;
    birthday: string;
    completedUnitsCount: number;
    currentClasses: ClassEnrollment[];
}

@Injectable({
    providedIn: 'root',
})
export class AccountStudentsApiService {
    readonly #functions = inject(FirebaseFunctionsService);

    getAll() {
        return this.#functions.callFn<{ students: Array<StudentSummary> }>(
            'myEnrolledStudents'
        );
    }
}
