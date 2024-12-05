import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    signal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import { ChartModule } from 'primeng/chart';
import { filter, map, switchMap, tap } from 'rxjs';
import { ChartOptions } from 'chart.js';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RxLet } from '@rx-angular/template/let';
import { PanelModule } from 'primeng/panel';
import {
    RequestedOperatorsUtility,
    RequestedUtility,
} from '@sol/angular/request';
import { AsyncPipe } from '@angular/common';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ClassesSemesterListService } from '@sol/angular/classes/semester-list';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        RxLet,
        ChartModule,
        RouterModule,
        ProgressSpinnerModule,
        PanelModule,
        AsyncPipe,
        DropdownModule,
        FormsModule,
    ],
    templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
    private readonly functionsApi = inject(FirebaseFunctionsService);

    readonly selectedSemester = signal('');

    readonly semesters = toSignal(
        inject(ClassesSemesterListService)
            .getEnrollableSemesters()
            .pipe(
                RequestedOperatorsUtility.ignoreAllStatesButLoaded(),
                tap((semesters) => this.selectedSemester.set(semesters[0].id))
            )
    );

    readonly selectedSemesterName = computed(() =>
        RequestedUtility.mapLoaded(
            this.semesters(),
            (semesters) =>
                semesters?.find(({ id }) => id === this.selectedSemester())
                    ?.name
        )
    );

    readonly isLoaded = RequestedUtility.isLoaded;

    readonly data = toSignal(
        toObservable(this.selectedSemester).pipe(
            filter((semesterId) => !!semesterId),
            switchMap((semesterId) =>
                this.functionsApi
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
                                labels: response.classes.map(
                                    ({ title }) => title
                                ),
                                datasets: [
                                    {
                                        // make the background of the radar transparent green
                                        backgroundColor:
                                            'rgba(0, 110, 255, 0.5)',
                                        label: 'Enrolled Students',
                                        data: response.classes.map(
                                            ({ enrolledCount }) =>
                                                Number(enrolledCount)
                                        ),
                                        pointBackgroundColor:
                                            response.classes.map((c, i) => {
                                                return this.#colors[i];
                                            }),
                                    },
                                ],
                            };
                        })
                    )
            )
        )
    );

    chartOptions: ChartOptions = {};

    #colors = [
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
}
