import {
    ChangeDetectionStrategy,
    Component,
    inject,
    input,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import {
    AccountStudentsApiService,
    StudentSummary,
} from '../../services/account-students-api.service';

@Component({
    selector: 'sol-student-card',
    template: `@let studentValue = student();
        <p-card [header]="studentValue.name">
            <a
                [href]="getUnitTreeUrl(studentValue.id)"
                target="_blank"
                rel="noopener noreferrer"
            >
                <p-button
                    label="View Unit Path Tree"
                    icon="pi pi-external-link"
                    styleClass="p-button-outlined"
                />
            </a>
        </p-card>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CardModule, ButtonModule],
    standalone: true,
})
export class StudentCardComponent {
    readonly student = input.required<StudentSummary>();

    getUnitTreeUrl(studentId: string): string {
        return `https://students.mountainsol.org/units/student/${studentId}`;
    }
}

@Component({
    selector: 'sol-account-students',
    template: `<h2>Students</h2>
        @switch (studentsResource.status()) {
            @case ('loading') {
                <p>Loading students...</p>
            }
            @case ('idle') {
                <p>Loading students...</p>
            }
            @case ('error') {
                <p>There was an error loading your students.</p>
            }
            @default {
                @let studentsValue = studentsResource.value();
                @if (studentsValue && studentsValue.students.length > 0) {
                    <div class="students-grid">
                        @for (student of studentsValue.students; track student.id) {
                            <sol-student-card [student]="student" />
                        }
                    </div>
                } @else {
                    <p>No students found. Students will appear here after you complete an enrollment.</p>
                }
            }
        }`,
    styles: [
        `
            .students-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
                gap: 1rem;
                margin-top: 1rem;
            }
        `,
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [StudentCardComponent],
    standalone: true,
})
export class AccountStudentsComponent {
    readonly #accountStudentsApiService = inject(AccountStudentsApiService);

    readonly studentsResource = rxResource({
        stream: () => this.#accountStudentsApiService.getAll(),
    });
}
