import {
    ChangeDetectionStrategy,
    Component,
    effect,
    ElementRef,
    inject,
    linkedSignal,
    viewChild,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { map, of } from 'rxjs';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { RequestedOperatorsUtility } from '@sol/angular/request';
import { rxResource } from '@angular/core/rxjs-interop';
import { ClassesSemesterListService } from '@sol/angular/classes/semester-list';
import { FormsModule } from '@angular/forms';

Chart.register(...registerables);

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        RouterModule,
        MatCardModule,
        MatFormFieldModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        FormsModule,
    ],
    templateUrl: './dashboard.component.html',
    styles: [
        `
            .nav-card,
            .chart-card {
                margin-right: 20px;
                margin-bottom: 20px;
                box-shadow: none;
                border: 1px solid var(--sol-input-border, #e0e0e0);
                background: var(--sol-surface, #fff);
            }
            .chart-card {
                flex: 1 1 auto;
                min-width: 0;
            }
            .chart-canvas {
                width: 100%;
                height: 400px;
            }
            .chart-spinner {
                margin-left: auto;
                margin-right: auto;
                width: fit-content;
                padding: 1rem;
            }
        `,
    ],
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

    readonly canvas = viewChild<ElementRef<HTMLCanvasElement>>('chartCanvas');

    #chart: Chart | undefined;

    readonly #colors = [
        '#006633',
        '#357214',
        '#4a7c23',
        '#8B4513',
        '#A0522D',
        '#CD853F',
        '#4682B4',
        '#5F9EA0',
        '#D2691E',
        '#B8860B',
        '#2E8B57',
        '#6B8E23',
        '#8FBC8F',
        '#DAA520',
        '#BC8F8F',
        '#9ACD32',
        '#708090',
        '#556B2F',
        '#BDB76B',
        '#CD5C5C',
    ];

    constructor() {
        effect(() => {
            const canvasRef = this.canvas();
            const data = this.semesterEnrollmentChartData.value();
            if (!canvasRef || !data) return;
            this.#chart?.destroy();
            const config: ChartConfiguration<'radar'> = {
                type: 'radar',
                data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    layout: {
                        padding: { top: 16, bottom: 16, left: 40, right: 40 },
                    },
                    scales: {
                        r: {
                            pointLabels: {
                                font: { size: 11 },
                                centerPointLabels: false,
                                callback: (label: string) => {
                                    if (label.length <= 18) return label;
                                    const words = label.split(' ');
                                    const lines: string[] = [];
                                    let current = '';
                                    for (const w of words) {
                                        if (
                                            (current + ' ' + w).trim().length >
                                            18
                                        ) {
                                            if (current)
                                                lines.push(current.trim());
                                            current = w;
                                        } else {
                                            current = (
                                                current +
                                                ' ' +
                                                w
                                            ).trim();
                                        }
                                    }
                                    if (current) lines.push(current);
                                    return lines as unknown as string;
                                },
                            },
                        },
                    },
                },
            };
            this.#chart = new Chart(canvasRef.nativeElement, config);
        });
    }

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
                                backgroundColor: 'rgba(0, 102, 51, 0.5)',
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
