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

    // Nature-inspired chart colors (Mountain SOL brand palette)
    readonly #colors = [
        '#006633', // Forest green (primary)
        '#357214', // Light forest green
        '#4a7c23', // Moss green
        '#8B4513', // Saddle brown
        '#A0522D', // Sienna
        '#CD853F', // Peru
        '#4682B4', // Steel blue (sky/water)
        '#5F9EA0', // Cadet blue (water)
        '#D2691E', // Chocolate (autumn)
        '#B8860B', // Dark goldenrod (autumn)
        '#2E8B57', // Sea green
        '#6B8E23', // Olive drab
        '#8FBC8F', // Dark sea green
        '#DAA520', // Goldenrod
        '#BC8F8F', // Rosy brown
        '#9ACD32', // Yellow green
        '#708090', // Slate gray
        '#556B2F', // Dark olive green
        '#BDB76B', // Dark khaki
        '#CD5C5C', // Indian red (autumn leaf)
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
                                backgroundColor: 'rgba(0, 102, 51, 0.5)', // Mountain SOL green with transparency
                                label: 'Enrolled Students',
                                data: response.classes.map(
                                    ({ enrolledCount }) => Number(enrolledCount)
                                ),
                                pointBackgroundColor: response.classes.map(
                                    (_, i) => {
                                        return this.#colors[
                                            i % this.#colors.length
                                        ];
                                    }
                                ),
                            },
                        ],
                    };
                })
            );
    }
}
