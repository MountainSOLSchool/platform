import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    signal,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MountainSolApiService } from '@sol/angular/firebase/api';
import { CurrencyPipe } from '@angular/common';

interface MedicClassAdmin {
    id: string;
    name: string;
    description: string;
    cost: number;
    minStudents: number;
    maxStudents: number;
    status: string;
    enrolledCount: number;
    createdAt: string;
    updatedAt: string;
}

type ListState =
    | { status: 'loading' }
    | { status: 'loaded'; classes: MedicClassAdmin[] }
    | { status: 'error'; message: string };

@Component({
    selector: 'sol-medic-admin-class-list',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        RouterModule,
        MatButtonModule,
        MatTableModule,
        MatChipsModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatSlideToggleModule,
        CurrencyPipe,
    ],
    styles: [`
        :host { display: block; }
        .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
        .header-left { display: flex; align-items: center; gap: 1.5rem; }
        table { width: 100%; }
        .spinner-container { display: flex; justify-content: center; padding: 3rem; }
        .status-draft { background-color: #fff3cd; color: #856404; }
        .status-published { background-color: #d4edda; color: #155724; }
        .status-archived { background-color: #e2e3e5; color: #383d41; }
    `],
    template: `
        <div class="header">
            <div class="header-left">
                <h2 style="margin: 0;">Medic Classes</h2>
                <mat-slide-toggle
                    [checked]="showArchived()"
                    (change)="showArchived.set($event.checked)"
                >Show Archived</mat-slide-toggle>
            </div>
            <a mat-flat-button color="primary" routerLink="create">
                <mat-icon>add</mat-icon> New Class
            </a>
        </div>

        @switch (state().status) {
            @case ('loading') {
                <div class="spinner-container">
                    <mat-spinner diameter="48"></mat-spinner>
                </div>
            }

            @case ('loaded') {
                @if (filteredClasses().length === 0) {
                    <p>No classes found.</p>
                } @else {
                    <table mat-table [dataSource]="filteredClasses()">
                        <ng-container matColumnDef="name">
                            <th mat-header-cell *matHeaderCellDef>Name</th>
                            <td mat-cell *matCellDef="let cls">{{ cls.name }}</td>
                        </ng-container>

                        <ng-container matColumnDef="cost">
                            <th mat-header-cell *matHeaderCellDef>Cost</th>
                            <td mat-cell *matCellDef="let cls">{{ cls.cost | currency }}</td>
                        </ng-container>

                        <ng-container matColumnDef="enrollment">
                            <th mat-header-cell *matHeaderCellDef>Enrolled</th>
                            <td mat-cell *matCellDef="let cls">{{ cls.enrolledCount }} / {{ cls.maxStudents }}</td>
                        </ng-container>

                        <ng-container matColumnDef="status">
                            <th mat-header-cell *matHeaderCellDef>Status</th>
                            <td mat-cell *matCellDef="let cls">
                                <mat-chip [class]="'status-' + cls.status">{{ cls.status }}</mat-chip>
                            </td>
                        </ng-container>

                        <ng-container matColumnDef="actions">
                            <th mat-header-cell *matHeaderCellDef>Actions</th>
                            <td mat-cell *matCellDef="let cls">
                                <a mat-icon-button [routerLink]="'edit/' + cls.id" matTooltip="Edit">
                                    <mat-icon>edit</mat-icon>
                                </a>
                                <a mat-icon-button [routerLink]="'enrollments/' + cls.id" matTooltip="View Enrollments">
                                    <mat-icon>people</mat-icon>
                                </a>
                            </td>
                        </ng-container>

                        <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
                        <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
                    </table>
                }
            }

            @case ('error') {
                <p style="color: var(--sol-error, red);">{{ errorMessage() }}</p>
                <button mat-flat-button (click)="load()">Retry</button>
            }
        }
    `,
})
export class MedicAdminClassListComponent {
    readonly #api = inject(MountainSolApiService);

    readonly state = signal<ListState>({ status: 'loading' });
    readonly showArchived = signal(false);
    readonly displayedColumns = ['name', 'cost', 'enrollment', 'status', 'actions'];

    readonly allClasses = computed(() => {
        const s = this.state();
        return s.status === 'loaded' ? s.classes : [];
    });

    readonly filteredClasses = computed(() => {
        const classes = this.allClasses();
        return this.showArchived()
            ? classes
            : classes.filter((c) => c.status !== 'archived');
    });

    readonly errorMessage = computed(() => {
        const s = this.state();
        return s.status === 'error' ? s.message : '';
    });

    constructor() {
        this.load();
    }

    load(): void {
        this.state.set({ status: 'loading' });
        this.#api.getMedicClassesAdmin(undefined as never).subscribe({
            next: (res) => this.state.set({ status: 'loaded', classes: res.classes }),
            error: () => this.state.set({ status: 'error', message: 'Failed to load classes' }),
        });
    }
}
