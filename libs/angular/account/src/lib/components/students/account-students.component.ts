import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    input,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AvatarComponent } from '@sol/angular/avatar';
import { SkeletonComponent } from '@sol/angular/skeleton';
import {
    AccountStudentsApiService,
    StudentSummary,
} from '../../services/account-students-api.service';

@Component({
    selector: 'sol-student-card',
    template: `@let s = student();
        <div class="student-card">
            <div class="student-header">
                <sol-avatar
                    [label]="initials()"
                    size="4rem"
                    shape="circle"
                    [style.background]="avatarColor()"
                    [style.color]="'#ffffff'"
                    [style.fontWeight]="600"
                />
                <div class="student-info">
                    <h3 class="student-name">{{ s.name }}</h3>
                    @if (s.currentClasses.length > 0) {
                        <span class="status-tag status-success">
                            {{ s.currentClasses.length }} Active Class{{
                                s.currentClasses.length > 1 ? 'es' : ''
                            }}
                        </span>
                    }
                </div>
            </div>

            <div class="student-stats">
                <div class="stat">
                    <span class="stat-value">{{ s.completedUnitsCount }}</span>
                    <span class="stat-label">Units Completed</span>
                </div>
                <div class="stat">
                    <span class="stat-value">{{
                        s.currentClasses.length
                    }}</span>
                    <span class="stat-label">Current Classes</span>
                </div>
            </div>

            <div class="student-actions">
                <a
                    [href]="getUnitTreeUrl(s.id)"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="action-link"
                >
                    <button mat-stroked-button class="w-full" type="button">
                        <mat-icon>account_tree</mat-icon>
                        View Learning Path
                    </button>
                </a>
            </div>
        </div>`,
    styles: [
        `
            .student-card {
                background: white;
                border-radius: 12px;
                padding: 1.5rem;
                box-shadow:
                    0 1px 3px rgba(0, 0, 0, 0.1),
                    0 1px 2px rgba(0, 0, 0, 0.06);
                transition: box-shadow 0.2s ease;
            }

            .student-card:hover {
                box-shadow:
                    0 4px 6px rgba(0, 0, 0, 0.1),
                    0 2px 4px rgba(0, 0, 0, 0.06);
            }

            .student-header {
                display: flex;
                align-items: center;
                gap: 1rem;
                margin-bottom: 1.25rem;
            }

            .student-info {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }

            .student-name {
                margin: 0;
                font-size: 1.25rem;
                font-weight: 600;
                color: #1f2937;
            }

            .status-tag {
                display: inline-block;
                padding: 0.25rem 0.625rem;
                border-radius: 999px;
                font-size: 0.75rem;
                font-weight: 600;
                line-height: 1.2;
                width: fit-content;
            }

            .status-success {
                background: #d1fae5;
                color: #065f46;
            }

            .student-stats {
                display: flex;
                gap: 1.5rem;
                padding: 1rem 0;
                border-top: 1px solid #e5e7eb;
                border-bottom: 1px solid #e5e7eb;
                margin-bottom: 1.25rem;
            }

            .stat {
                display: flex;
                flex-direction: column;
                align-items: center;
                flex: 1;
            }

            .stat-value {
                font-size: 1.5rem;
                font-weight: 700;
                color: #0077b6;
            }

            .stat-label {
                font-size: 0.75rem;
                color: #6b7280;
                text-transform: uppercase;
                letter-spacing: 0.05em;
            }

            .student-actions {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }

            .action-link {
                text-decoration: none;
                display: block;
            }

            .w-full {
                width: 100%;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [AvatarComponent, MatButtonModule, MatIconModule],
    standalone: true,
})
export class StudentCardComponent {
    readonly student = input.required<StudentSummary>();

    readonly initials = computed(() => {
        const name = this.student().name;
        const parts = name.split(' ');
        if (parts.length >= 2) {
            return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    });

    readonly avatarColor = computed(() => {
        const colors = [
            '#0077b6',
            '#00b4d8',
            '#48cae4',
            '#90be6d',
            '#f9844a',
            '#f3722c',
            '#9b5de5',
            '#f15bb5',
        ];
        const name = this.student().name;
        const hash = name
            .split('')
            .reduce((acc, char) => acc + char.charCodeAt(0), 0);
        return colors[hash % colors.length];
    });

    getUnitTreeUrl(studentId: string): string {
        return `https://students.mountainsol.org/units/student/${studentId}`;
    }
}

@Component({
    selector: 'sol-student-card-skeleton',
    template: `
        <div class="student-card">
            <div class="student-header">
                <sol-skeleton shape="circle" width="4rem" height="4rem" />
                <div class="student-info">
                    <sol-skeleton width="10rem" height="1.5rem" />
                    <sol-skeleton width="6rem" height="1.25rem" />
                </div>
            </div>
            <div class="student-stats">
                <div class="stat">
                    <sol-skeleton width="2rem" height="1.5rem" />
                    <sol-skeleton width="5rem" height="0.75rem" />
                </div>
                <div class="stat">
                    <sol-skeleton width="2rem" height="1.5rem" />
                    <sol-skeleton width="5rem" height="0.75rem" />
                </div>
            </div>
            <sol-skeleton width="100%" height="2.5rem" />
        </div>
    `,
    styles: [
        `
            .student-card {
                background: white;
                border-radius: 12px;
                padding: 1.5rem;
                box-shadow:
                    0 1px 3px rgba(0, 0, 0, 0.1),
                    0 1px 2px rgba(0, 0, 0, 0.06);
            }

            .student-header {
                display: flex;
                align-items: center;
                gap: 1rem;
                margin-bottom: 1.25rem;
            }

            .student-info {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }

            .student-stats {
                display: flex;
                gap: 1.5rem;
                padding: 1rem 0;
                border-top: 1px solid #e5e7eb;
                border-bottom: 1px solid #e5e7eb;
                margin-bottom: 1.25rem;
            }

            .stat {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.25rem;
                flex: 1;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [SkeletonComponent],
    standalone: true,
})
export class StudentCardSkeletonComponent {}

@Component({
    selector: 'sol-account-students',
    template: `<h2>Students</h2>
        @switch (studentsResource.status()) {
            @case ('loading') {
                <div class="students-grid">
                    <sol-student-card-skeleton />
                    <sol-student-card-skeleton />
                </div>
            }
            @case ('idle') {
                <div class="students-grid">
                    <sol-student-card-skeleton />
                    <sol-student-card-skeleton />
                </div>
            }
            @case ('error') {
                <div class="error-state">
                    <mat-icon class="state-icon">error</mat-icon>
                    <p>There was an error loading your students.</p>
                    <button
                        mat-stroked-button
                        type="button"
                        (click)="studentsResource.reload()"
                    >
                        <mat-icon>refresh</mat-icon>
                        Try Again
                    </button>
                </div>
            }
            @default {
                @let studentsValue = studentsResource.value();
                @if (studentsValue && studentsValue.students.length > 0) {
                    <div class="students-grid">
                        @for (
                            student of studentsValue.students;
                            track student.id
                        ) {
                            <sol-student-card [student]="student" />
                        }
                    </div>
                } @else {
                    <div class="empty-state">
                        <mat-icon class="state-icon">group</mat-icon>
                        <p>No students found</p>
                        <span
                            >Students will appear here after you complete an
                            enrollment.</span
                        >
                    </div>
                }
            }
        }`,
    styles: [
        `
            :host {
                display: block;
            }

            h2 {
                color: #1f2937;
                margin-bottom: 1.5rem;
            }

            .students-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
                gap: 1.5rem;
            }

            .empty-state,
            .error-state {
                text-align: center;
                padding: 3rem 1.5rem;
                background: #f9fafb;
                border-radius: 12px;
                border: 2px dashed #e5e7eb;
            }

            .state-icon {
                font-size: 3rem;
                width: 3rem;
                height: 3rem;
                color: #9ca3af;
                margin-bottom: 1rem;
            }

            .error-state .state-icon {
                color: #ef4444;
            }

            .empty-state p,
            .error-state p {
                font-size: 1.125rem;
                font-weight: 600;
                color: #374151;
                margin: 0 0 0.5rem 0;
            }

            .empty-state span {
                color: #6b7280;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        StudentCardComponent,
        StudentCardSkeletonComponent,
        MatButtonModule,
        MatIconModule,
    ],
    standalone: true,
})
export class AccountStudentsComponent {
    readonly #accountStudentsApiService = inject(AccountStudentsApiService);

    readonly studentsResource = rxResource({
        stream: () => this.#accountStudentsApiService.getAll(),
    });
}
