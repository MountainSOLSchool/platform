import { inject, Injectable } from '@angular/core';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import {
    RequestedOperatorsUtility,
    RequestService,
} from '@sol/angular/request';
import { AdditionalInfoPanel } from '@sol/classes/domain'; // Add to your imports

type Semester = 'Spring' | 'Summer' | 'Fall' | 'Winter';

@Injectable({
    providedIn: 'root',
})
export class ClassesSemesterListService {
    private readonly functions = inject(FirebaseFunctionsService);
    private readonly requestService = inject(RequestService);

    private readonly getEnrollableSemestersRequest =
        this.requestService.declareRequest(() =>
            this.functions.call<{
                semesters: Array<{
                    id: string;
                    name: string;
                    additionalInfoPanel?: AdditionalInfoPanel;
                }>;
            }>('semestersAvailableToEnroll')
        );

    private readonly getAllSemestersRequest =
        this.requestService.declareRequest(() =>
            this.functions.call<{
                semesters: Array<{ id: string; name: string }>;
                activeSemesterId: string;
            }>('historicalSemesters')
        );

    getEnrollableSemesters() {
        return this.getEnrollableSemestersRequest
            .getCachedAndLoadWhenEmptyOrFailed()
            .pipe(RequestedOperatorsUtility.mapLoaded((r) => r.semesters));
    }

    getAllSemestersWithCurrentFirst() {
        return this.getAllSemestersRequest
            .getCachedAndLoadWhenEmptyOrFailed()
            .pipe(
                RequestedOperatorsUtility.mapLoaded((r) => {
                    const currentSemester =
                        r.semesters.find(
                            (semester) => semester.id === r.activeSemesterId
                        ) ?? r.semesters[0];
                    return [
                        currentSemester,
                        ...this.sortSemesters(
                            r.semesters
                                .filter((semester) => !!semester.name)
                                .filter(
                                    (semester) =>
                                        semester.id !== r.activeSemesterId
                                )
                        ),
                    ];
                })
            );
    }

    private sortSemesters(semesters: Array<{ id: string; name: string }>) {
        const order: Record<Semester, number> = {
            Winter: 1,
            Spring: 2,
            Summer: 3,
            Fall: 4,
        };
        return semesters
            .concat()
            .sort(({ name: a }, { name: b }) => {
                const [semA, yearA] = a.split(' ');
                const [semB, yearB] = b.split(' ');
                return yearA === yearB
                    ? order[semA as Semester] - order[semB as Semester]
                    : parseInt(yearA) - parseInt(yearB);
            })
            .reverse();
    }
}
