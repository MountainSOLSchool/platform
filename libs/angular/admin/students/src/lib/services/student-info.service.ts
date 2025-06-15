import { inject, Injectable } from '@angular/core';
import { RequestedOperatorsUtility } from '@sol/angular/request';
import { Observable } from 'rxjs';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import { StudentDbEntry } from '@sol/student/domain';

@Injectable({ providedIn: 'root' })
export class StudentInfoService {
    readonly #functionsApi = inject(FirebaseFunctionsService);

    getAllStudents(): Observable<{ students: Array<Partial<StudentDbEntry>> }> {
        return this.#functionsApi
            .call<{ students: Array<Partial<StudentDbEntry>> }>('allStudents', {
                fields: [
                    'id',
                    'first_name',
                    'last_name',
                    'birth_date',
                    'school',
                    'student_email',
                    'student_phone',
                    'primary_email',
                    'has_life_threatening_allergies',
                    'allergies',
                ],
            })
            .pipe(RequestedOperatorsUtility.ignoreAllStatesButLoaded());
    }

    getStudentInfoSheet(studentId: string): Observable<{ html: string }> {
        return this.#functionsApi
            .call<{ html: string }>(`studentInfoSheet?studentId=${studentId}`)
            .pipe(RequestedOperatorsUtility.ignoreAllStatesButLoaded());
    }
}
