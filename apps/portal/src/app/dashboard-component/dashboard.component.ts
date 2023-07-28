import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FunctionsApi } from '@sol/firebase/functions-api';
import { ChartModule } from 'primeng/chart';
import { map } from 'rxjs';
import { ChartOptions } from 'chart.js';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RxLet } from '@rx-angular/template/let';
import { PanelModule } from 'primeng/panel';

@Component({
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        CommonModule,
        RxLet,
        ChartModule,
        RouterModule,
        ProgressSpinnerModule,
        PanelModule,
    ],
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
    private readonly functionsApi = inject(FunctionsApi);

    readonly data$ = this.functionsApi
        .call<{
            classes: Array<{ title: string; enrolledCount: string }>;
        }>('classes')
        .pipe(
            map((response) => {
                return {
                    labels: response.classes.map(({ title }) => title),
                    datasets: [
                        {
                            // make the background of the radar transparent green
                            backgroundColor: 'rgba(0, 110, 255, 0.5)',
                            label: 'Enrolled Students',
                            data: response.classes.map(({ enrolledCount }) =>
                                Number(enrolledCount)
                            ),
                            pointBackgroundColor: response.classes.map(
                                (c, i) => {
                                    return this.#colors[i];
                                }
                            ),
                        },
                    ],
                };
            })
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
