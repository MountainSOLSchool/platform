import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { FunctionsApi } from '@sol/firebase/functions-api';
import { ChartData } from 'chart.js';
import { ChartModule } from 'primeng/chart';
import { map, Observable } from 'rxjs';

@Component({
    standalone: true,
    imports: [CommonModule, ChartModule, RouterModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
    private readonly functionsApi = inject(FunctionsApi);

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
