import { inject, Injectable } from '@angular/core';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import { SemesterClass, SemesterClassGroup } from '@sol/classes/domain';
import { map } from 'rxjs';
import { RequestedUtility } from '@sol/angular/request';

@Injectable({
    providedIn: 'root',
})
export class ClassesApiService {
    private readonly functions = inject(FirebaseFunctionsService);

    private readonly classesCall = this.functions.call<Array<SemesterClass>>;
    private readonly classesResourcePath = 'classes';

    getCurrentSemesterClasses() {
        return this.classesCall(this.classesResourcePath);
    }

    getClassesByIds(ids: Array<string>) {
        return this.classesCall(this.classesResourcePath, { ids });
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
                    RequestedUtility.isLoaded(response)
                        ? response.groups
                        : response
                )
            );
    }
}
