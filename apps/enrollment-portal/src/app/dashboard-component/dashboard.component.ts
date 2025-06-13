import {
    ChangeDetectionStrategy,
    Component,
    inject,
    linkedSignal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import { ChartModule } from 'primeng/chart';
import { map, of } from 'rxjs';
import { ChartOptions } from 'chart.js';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { PanelModule } from 'primeng/panel';
import { RequestedOperatorsUtility } from '@sol/angular/request';
import { rxResource } from '@angular/core/rxjs-interop';
import { ClassesSemesterListService } from '@sol/angular/classes/semester-list';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ChartModule,
        RouterModule,
        ProgressSpinnerModule,
        PanelModule,
        DropdownModule,
        FormsModule,
    ],
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
    readonly #functionsApi = inject(FirebaseFunctionsService);
    readonly #classesSemesterListService = inject(ClassesSemesterListService);

    readonly semesters = rxResource({
        stream: () =>
            this.#classesSemesterListService
                .getEnrollableSemesters()
                .pipe(RequestedOperatorsUtility.ignoreAllStatesButLoaded()),
    });

    readonly selectedSemester = linkedSignal(() => {
        const semesters = this.semesters.value();
        return semesters?.[0]?.id ?? '';
    });

    readonly semesterEnrollmentChartData = rxResource({
        params: () => this.selectedSemester(),
        stream: ({ params: semesterId }) => {
            if (!semesterId) {
                return of(undefined);
            }
            return this.#getSemesterEnrollmentChart(semesterId);
        },
    });

    readonly chartOptions: ChartOptions = {};

    readonly #colors = [
        'red',
        'orange',
        'green',
        'indigo',
        'violet',
        'magenta',
        'deeppink',
        'indianred',
        'darksalmon',
        'blue',
        'greenyellow',
        'lightseagreen',
        'mediumturquoise',
        'LemonChiffon',
        'lightpink',
        'yellow',
        'powderblue',
        'rebeccapurple',
        'palegreen',
        'midnightblue',
        'plum',
        'slateblue',
        'seagreen',
    ];

    #getSemesterEnrollmentChart(semesterId: string) {
        return this.#functionsApi
            .call<{
                classes: Array<{
                    title: string;
                    enrolledCount: string;
                }>;
            }>('classes', { query: { semesterId } })
            .pipe(
                RequestedOperatorsUtility.ignoreAllStatesButLoaded(),
                map((response) => {
                    return {
                        labels: response.classes.map(({ title }) => title),
                        datasets: [
                            {
                                backgroundColor: 'rgba(0, 110, 255, 0.5)',
                                label: 'Enrolled Students',
                                data: response.classes.map(
                                    ({ enrolledCount }) => Number(enrolledCount)
                                ),
                                pointBackgroundColor: response.classes.map(
                                    (_, i) => {
                                        return this.#colors[i];
                                    }
                                ),
                            },
                        ],
                    };
                })
            );
    }
}
