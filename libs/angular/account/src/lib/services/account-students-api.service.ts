import { inject, Injectable } from '@angular/core';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';

export interface StudentSummary {
    id: string;
    name: string;
    birthday: string;
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
