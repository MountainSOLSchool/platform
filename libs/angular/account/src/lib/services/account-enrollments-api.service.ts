import { inject, Injectable } from '@angular/core';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import { SemesterEnrollment } from '@sol/classes/domain';

@Injectable({
    providedIn: 'root',
})
export class AccountEnrollmentsApiService {
    readonly #functions = inject(FirebaseFunctionsService);

    getAll() {
        return this.#functions.callFn<Array<SemesterEnrollment>>('enrollments');
    }
}
