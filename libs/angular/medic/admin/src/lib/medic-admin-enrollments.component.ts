import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MountainSolApiService } from '@sol/angular/firebase/api';
import { CurrencyPipe, DatePipe } from '@angular/common';

interface MedicEnrollmentRow {
    id: string;
    classId: string;
    className: string;
    studentName: string;
    studentEmail: string;
    transactionId: string;
    amount: number;
    status: string;
    timestamp: string;
}

interface MedicClassOption {
    id: string;
    name: string;
    status: string;
}

type EnrollmentState =
    | { status: 'loading' }
    | { status: 'loaded'; enrollments: MedicEnrollmentRow[] }
    | { status: 'error'; message: string };

@Component({
    selector: 'sol-medic-admin-enrollments',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatButtonModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatFormFieldModule,
        MatSlideToggleModule,
        CurrencyPipe,
        DatePipe,
    ],
    styles: [`
        :host { display: block; }
        table { width: 100%; }
        .spinner-container { display: flex; justify-content: center; padding: 3rem; }
        .filters { display: flex; align-items: center; gap: 1.5rem; margin-bottom: 1rem; }
        .filters mat-form-field { min-width: 220px; }
    `],
    template: `
        <h2>Enrollments</h2>

        <div class="filters">
            <mat-form-field>
                <mat-label>Filter by Class</mat-label>
                <mat-select
                    [value]="selectedClassId()"
                    (selectionChange)="onClassFilterChange($event.value)"
                >
                    <mat-option [value]="null">All Classes</mat-option>
                    @for (cls of filteredClassOptions(); track cls.id) {
                        <mat-option [value]="cls.id">{{ cls.name }}</mat-option>
                    }
                </mat-select>
            </mat-form-field>

            <mat-slide-toggle
                [checked]="showArchived()"
                (change)="onShowArchivedChange($event.checked)"
            >Show Archived Classes</mat-slide-toggle>
        </div>

        @switch (state().status) {
            @case ('loading') {
                <div class="spinner-container">
                    <mat-spinner diameter="48"></mat-spinner>
                </div>
            }

            @case ('loaded') {
                @if (enrollments().length === 0) {
                    <p>No enrollments found.</p>
                } @else {
                    <table mat-table [dataSource]="enrollments()">
                        <ng-container matColumnDef="studentName">
                            <th mat-header-cell *matHeaderCellDef>Student Name</th>
                            <td mat-cell *matCellDef="let e">{{ e.studentName }}</td>
                        </ng-container>

                        <ng-container matColumnDef="studentEmail">
                            <th mat-header-cell *matHeaderCellDef>Email</th>
                            <td mat-cell *matCellDef="let e">{{ e.studentEmail }}</td>
                        </ng-container>

                        <ng-container matColumnDef="className">
                            <th mat-header-cell *matHeaderCellDef>Class</th>
                            <td mat-cell *matCellDef="let e">{{ e.className }}</td>
                        </ng-container>

                        <ng-container matColumnDef="amount">
                            <th mat-header-cell *matHeaderCellDef>Amount</th>
                            <td mat-cell *matCellDef="let e">{{ e.amount | currency }}</td>
                        </ng-container>

                        <ng-container matColumnDef="transactionId">
                            <th mat-header-cell *matHeaderCellDef>Transaction ID</th>
                            <td mat-cell *matCellDef="let e">{{ e.transactionId }}</td>
                        </ng-container>

                        <ng-container matColumnDef="timestamp">
                            <th mat-header-cell *matHeaderCellDef>Date</th>
                            <td mat-cell *matCellDef="let e">{{ e.timestamp | date:'short' }}</td>
                        </ng-container>

                        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
                    </table>
                }
            }

            @case ('error') {
                <p style="color: var(--sol-error, red);">{{ errorMessage() }}</p>
                <button mat-flat-button (click)="loadEnrollments()">Retry</button>
            }
        }
    `,
})
export class MedicAdminEnrollmentsComponent {
    readonly #api = inject(MountainSolApiService);
    readonly #route = inject(ActivatedRoute);

    readonly state = signal<EnrollmentState>({ status: 'loading' });
    readonly selectedClassId = signal<string | null>(null);
    readonly showArchived = signal(false);
    readonly allClassOptions = signal<MedicClassOption[]>([]);
    readonly displayedColumns = ['studentName', 'studentEmail', 'className', 'amount', 'transactionId', 'timestamp'];

    readonly filteredClassOptions = computed(() => {
        const classes = this.allClassOptions();
        return this.showArchived()
            ? classes
            : classes.filter((c) => c.status !== 'archived');
    });

    readonly enrollments = computed(() => {
        const s = this.state();
        return s.status === 'loaded' ? s.enrollments : [];
    });

    readonly errorMessage = computed(() => {
        const s = this.state();
        return s.status === 'error' ? s.message : '';
    });

    constructor() {
        const id = this.#route.snapshot.paramMap.get('classId');
        if (id) this.selectedClassId.set(id);
        this.loadClassOptions();
        this.loadEnrollments();
    }

    loadClassOptions(): void {
        this.#api.getMedicClassesAdmin(undefined as never).subscribe({
            next: (res) => this.allClassOptions.set(
                res.classes.map((c) => ({ id: c.id, name: c.name, status: c.status }))
            ),
        });
    }

    loadEnrollments(): void {
        this.state.set({ status: 'loading' });
        this.#api.getMedicEnrollments({
            classId: this.selectedClassId() ?? undefined,
        }).subscribe({
            next: (res) => this.state.set({ status: 'loaded', enrollments: res.enrollments }),
            error: () => this.state.set({ status: 'error', message: 'Failed to load enrollments' }),
        });
    }

    onClassFilterChange(classId: string | null): void {
        this.selectedClassId.set(classId);
        this.loadEnrollments();
    }

    onShowArchivedChange(checked: boolean): void {
        this.showArchived.set(checked);
        const current = this.selectedClassId();
        if (current) {
            const stillVisible = this.filteredClassOptions().some((c) => c.id === current);
            if (!stillVisible) {
                this.selectedClassId.set(null);
                this.loadEnrollments();
            }
        }
    }
}
