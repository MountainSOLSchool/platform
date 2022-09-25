import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FunctionsApi } from '@sol/firebase/functions-api';
import {
    forkJoin,
    from,
    map,
    mapTo,
    startWith,
    Subject,
    switchMap,
    tap,
} from 'rxjs';
import * as Papa from 'papaparse';
import {
    StudentEnrollmentCsvHeaderMap,
    StudentEnrollmentEntry,
} from '@sol/student/import';
import { MessageService } from 'primeng/api';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './import.component.html',
})
export class ImportComponent implements OnInit {
    constructor(
        private readonly functionsApi: FunctionsApi,
        private readonly messageService: MessageService
    ) {}

    uploadClick$ = new Subject<{ files: Array<File> }>();

    isUploading$ = this.uploadClick$.pipe(
        switchMap(({ files }) => {
            return forkJoin(
                files.map((file) => {
                    return from(file.text()).pipe(
                        map((text) => {
                            const repeatedHeaderCount = new Map<
                                string,
                                number
                            >();
                            const enrollmentRecords =
                                Papa.parse<StudentEnrollmentEntry>(text, {
                                    header: true,
                                    transform: (value) => value?.trim() ?? '',
                                    transformHeader: (h) => {
                                        const transformConfig =
                                            StudentEnrollmentCsvHeaderMap[h];
                                        const repeatedCount =
                                            repeatedHeaderCount.get(h) ?? 0;
                                        const transformed =
                                            typeof transformConfig === 'string'
                                                ? transformConfig
                                                : transformConfig[
                                                      repeatedCount
                                                  ];
                                        repeatedHeaderCount.set(
                                            h,
                                            repeatedCount + 1
                                        );
                                        return transformed;
                                    },
                                });
                            return enrollmentRecords.data;
                        })
                    );
                })
            ).pipe(
                map((enrollmentGroups) =>
                    enrollmentGroups.reduce(
                        (agg, group) => [...agg, ...group],
                        []
                    )
                ),
                switchMap((enrollmentEntries) =>
                    this.functionsApi.call<{
                        result: { enrolled: Array<unknown> };
                    }>('importEnrollment', enrollmentEntries)
                ),
                tap((response: { result: { enrolled: Array<unknown> } }) =>
                    this.messageService.add({
                        detail: `Successfully imported ${
                            response.result.enrolled?.length ?? 0
                        } enrollments!`,
                        severity: 'success',
                    })
                ),
                mapTo(false),
                startWith(true)
            );
        })
    );
}
