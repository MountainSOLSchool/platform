import { inject, Injectable } from '@angular/core';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import {
    RequestedOperatorsUtility,
    RequestService,
} from '@sol/angular/request';
import { AdditionalInfoPanel } from '@sol/classes/domain';

type Season = 'Spring' | 'Summer' | 'Fall' | 'Winter';

export interface Semester {
    id: string;
    name: string;
    archived: boolean;
}

export interface SemesterConfigData {
    semesters: Semester[];
    activeSemesterId: string;
    otherEnrollableSemesterIds: string[];
}

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
                semesters: Semester[];
                activeSemesterId: string;
                otherEnrollableSemesterIds: string[];
            }>('historicalSemesters')
        );

    getEnrollableSemesters() {
        return this.getEnrollableSemestersRequest
            .getCachedAndLoadWhenEmptyOrFailed()
            .pipe(RequestedOperatorsUtility.mapLoaded((r) => r.semesters));
    }

    getAllSemestersWithCurrentFirst(includeArchived = false) {
        return this.getAllSemestersRequest
            .getCachedAndLoadWhenEmptyOrFailed()
            .pipe(
                RequestedOperatorsUtility.mapLoaded((r) => {
                    const nonArchivedSemesters = includeArchived
                        ? r.semesters
                        : r.semesters.filter((s) => !s.archived);
                    const currentSemester =
                        nonArchivedSemesters.find(
                            (semester) => semester.id === r.activeSemesterId
                        ) ?? nonArchivedSemesters[0];
                    return [
                        currentSemester,
                        ...this.sortSemesters(
                            nonArchivedSemesters
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

    getSemesterConfigDataDirect() {
        return this.functions
            .call<{
                semesters: Semester[];
                activeSemesterId: string;
                otherEnrollableSemesterIds: string[];
            }>('historicalSemesters')
            .pipe(
                RequestedOperatorsUtility.mapLoaded(
                    (r): SemesterConfigData => ({
                        semesters: this.sortSemestersForConfig(
                            r.semesters.filter((s) => !!s.name)
                        ),
                        activeSemesterId: r.activeSemesterId,
                        otherEnrollableSemesterIds:
                            r.otherEnrollableSemesterIds ?? [],
                    })
                )
            );
    }

    sortSemestersForConfig(semesters: Semester[]): Semester[] {
        const seasonOrder: Record<Season, number> = {
            Winter: 1,
            Spring: 2,
            Summer: 3,
            Fall: 4,
        };
        const validSeasons = new Set(['Winter', 'Spring', 'Summer', 'Fall']);

        return semesters.concat().sort(({ name: a }, { name: b }) => {
            const [semA, yearA] = a.split(' ');
            const [semB, yearB] = b.split(' ');

            const aIsValid = validSeasons.has(semA) && !isNaN(parseInt(yearA));
            const bIsValid = validSeasons.has(semB) && !isNaN(parseInt(yearB));

            if (aIsValid && !bIsValid) return -1;
            if (!aIsValid && bIsValid) return 1;
            if (!aIsValid && !bIsValid) return a.localeCompare(b);

            const yearDiff = parseInt(yearB) - parseInt(yearA);
            if (yearDiff !== 0) return yearDiff;

            return seasonOrder[semB as Season] - seasonOrder[semA as Season];
        });
    }

    private sortSemesters(semesters: Semester[]): Semester[] {
        const order: Record<Season, number> = {
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
                    ? order[semA as Season] - order[semB as Season]
                    : parseInt(yearA) - parseInt(yearB);
            })
            .reverse();
    }
}
