import { inject, Injectable } from '@angular/core';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import { SemesterClass, SemesterClassGroup } from '@sol/classes/domain';
import { map, Observable } from 'rxjs';
import { Requested, RequestedUtility } from '@sol/angular/request';

@Injectable({
    providedIn: 'root',
})
export class ClassesApiService {
    private readonly functions = inject(FirebaseFunctionsService);

    private readonly classesResourcePath = 'classes';

    getCurrentSemesterClasses() {
        return this.functions
            .call<{ classes: Array<SemesterClass> }>(this.classesResourcePath)
            .pipe(
                map((response) =>
                    RequestedUtility.mapLoaded(response, (r) => r.classes)
                )
            );
    }

    getClassesByIds(
        ids: Array<string>
    ): Observable<Requested<Array<SemesterClass>>> {
        return this.functions
            .call<{ classes: Array<SemesterClass> }>(this.classesResourcePath, {
                ids,
            })
            .pipe(
                map((response) =>
                    RequestedUtility.mapLoaded(response, (r) => r.classes)
                )
            );
    }

    getClassesAvailableForEnrollment() {
        return this.functions.call<{
            classes: Array<SemesterClass>;
            groups: Array<SemesterClassGroup>;
        }>('availableEnrollmentClasses');
    }

    getCurrentSemesterClassGroups(ids: Array<string>) {
        return this.functions
            .call<{
                groups: Array<SemesterClassGroup>;
            }>('classGroups', ids)
            .pipe(
                map((response) =>
                    RequestedUtility.mapLoaded(response, (r) => r.groups)
                )
            );
    }
}
