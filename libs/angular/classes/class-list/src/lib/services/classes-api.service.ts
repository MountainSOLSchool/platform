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

    getClasses(
        query: Array<{ id: string; semesterId: string }>
    ): Observable<Requested<{ [semesterId: string]: Array<SemesterClass> }>> {
        return this.functions
            .call<{
                classes: {
                    [semesterId: string]: Array<SemesterClass>;
                };
            }>(this.classesResourcePath, {
                query,
            })
            .pipe(
                map((response) =>
                    RequestedUtility.mapLoaded(response, (r) => r.classes)
                )
            );
    }

    getClassesAvailableForEnrollment() {
        return this.functions.call<{
            [semesterId: string]: {
                classes: Array<SemesterClass>;
                groups: Array<SemesterClassGroup>;
            };
        }>('availableEnrollmentClasses');
    }

    getClassGroups(query: Array<{ id: string; semesterId: string }>) {
        return this.functions
            .call<{
                groups: {
                    [semesterId: string]: Array<SemesterClassGroup>;
                };
            }>('classGroups', query)
            .pipe(
                map((response) =>
                    RequestedUtility.mapLoaded(response, (r) => r.groups)
                )
            );
    }
}
