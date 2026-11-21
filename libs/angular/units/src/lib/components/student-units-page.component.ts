import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    signal,
} from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { filter, map } from 'rxjs';
import { MountainSolApiService } from '@sol/angular/firebase/api';
import { RequestedUtility } from '@sol/angular/request';
import {
    buildStudentUnitTree,
    type UnitTreeNode,
} from '../utilities/student-unit-tree';
import {
    type SelectedUnit,
    UnitTreeChartComponent,
} from './unit-tree-chart.component';
import { UnitDetailsPanelComponent } from './unit-details-panel.component';

type PageState =
    | { status: 'loading' }
    | { status: 'notFound' }
    | { status: 'ready'; studentName: string; tree: UnitTreeNode };

/** Public page: a student's progress through the paths, as a tree. */
@Component({
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatProgressSpinnerModule,
        UnitTreeChartComponent,
        UnitDetailsPanelComponent,
    ],
    styles: [
        `
            :host {
                display: block;
                padding: 1rem;
            }
            h1 {
                margin: 0 0 1rem;
                font-size: 1.75rem;
            }
            .spinner {
                margin: 2rem auto;
            }
            .muted {
                color: var(--sol-on-surface-variant, #666);
            }
            @media (min-width: 768px) {
                .panel-open {
                    margin-right: 440px;
                }
            }
        `,
    ],
    template: `
        @switch (state().status) {
            @case ('loading') {
                <mat-spinner class="spinner" diameter="48" />
            }
            @case ('notFound') {
                <p class="muted">
                    We couldn't find units for this student. Check the link and
                    try again.
                </p>
            }
            @case ('ready') {
                @if (tree(); as tree) {
                    <div [class.panel-open]="!!selectedUnit()">
                        <h1>{{ studentName() }}'s Units</h1>
                        <sol-unit-tree-chart
                            [tree]="tree"
                            (unitSelect)="selectedUnit.set($event)"
                        />
                    </div>
                }
                @if (selectedUnit(); as unit) {
                    <sol-unit-details-panel [unit]="unit" />
                }
            }
        }
    `,
})
export class StudentUnitsPageComponent {
    readonly #api = inject(MountainSolApiService);

    readonly #studentId = toSignal(
        inject(ActivatedRoute).paramMap.pipe(map((p) => p.get('id') ?? ''))
    );

    readonly #student = rxResource({
        params: () => this.#studentId() || undefined,
        stream: ({ params: studentId }) =>
            this.#api
                .getStudentCompletedUnits({ studentId })
                .pipe(filter((state) => RequestedUtility.isComplete(state))),
    });

    readonly #unitsAndPaths = rxResource({
        stream: () => this.#api.fullUnitsAndPaths(),
    });

    readonly selectedUnit = signal<SelectedUnit | undefined>(undefined);

    readonly state = computed((): PageState => {
        const student = this.#student.value();
        if (RequestedUtility.isError(student)) {
            return { status: 'notFound' };
        }
        const unitsAndPaths = this.#unitsAndPaths.value();
        if (!RequestedUtility.isLoaded(student) || !unitsAndPaths) {
            return { status: 'loading' };
        }
        const studentName = student.student.name;
        return {
            status: 'ready',
            studentName,
            tree: buildStudentUnitTree({
                studentName,
                completedUnitIds: student.student.completed_units ?? [],
                paths: unitsAndPaths.paths,
                units: unitsAndPaths.units,
            }),
        };
    });

    readonly studentName = computed(() => {
        const state = this.state();
        return state.status === 'ready' ? state.studentName : '';
    });

    readonly tree = computed(() => {
        const state = this.state();
        return state.status === 'ready' ? state.tree : undefined;
    });
}
