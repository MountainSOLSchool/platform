import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FunctionsApi } from '@sol/firebase/functions-api';
import { ChartData } from 'chart.js';
import { map, Observable } from 'rxjs';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
    constructor(private readonly functionsApi: FunctionsApi) {}

    data$: Observable<ChartData> | undefined;

    chartOptions = {};

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

    ngOnInit(): void {
        this.data$ = this.functionsApi
            .call<{
                classes: Array<{ title: string; enrolledCount: string }>;
            }>('classes')
            .pipe(
                map((response) => {
                    return {
                        labels: response.classes.map(({ title }) => title),
                        datasets: [
                            {
                                data: response.classes.map(
                                    ({ enrolledCount }) => Number(enrolledCount)
                                ),
                                backgroundColor: response.classes.map(
                                    (c, i) => {
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
