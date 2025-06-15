import {
    ChangeDetectionStrategy,
    Component,
    inject,
    OnInit,
    signal,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { RequestedOperatorsUtility } from '@sol/angular/request';
import { map, pipe, switchMap } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Dialog } from '@angular/cdk/dialog';
import { DialogContainerComponent } from '@sol/angular/dialog';
import { StudentDbEntry } from '@sol/student/domain';
import { StudentInfoService } from '../services/student-info.service';
import { StudentInfoDisplayComponent } from '../components/student-info-display.component';
import {
    StudentInfoTableViewComponent,
    StudentTableRow,
} from '../components/student-info-table-view.component';

@Component({
    template: `<sol-student-info-table-view
        [students]="studentRows.value()"
        [studentIdBeingViewed]="studentBeingViewed()?.id"
        (viewInfoClick)="viewInfoClick($event)"
    ></sol-student-info-table-view>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [StudentInfoTableViewComponent],
})
export class StudentInfoTableComponent implements OnInit {
    readonly #studentInfoService = inject(StudentInfoService);
    readonly #dialog = inject(Dialog);

    readonly studentRows = rxResource({
        stream: () =>
            this.#studentInfoService.getAllStudents().pipe(
                RequestedOperatorsUtility.ignoreAllStatesButLoaded(),
                map((response) => this.#mapToStudentRows(response.students))
            ),
    });

    readonly studentBeingViewed = signal<StudentTableRow | undefined>(
        undefined
    );

    readonly #viewStudentInfo = rxMethod<StudentTableRow | undefined>(
        pipe(
            switchMap((student) => {
                if (!student) return [];

                this.#dialog.open(StudentInfoDisplayComponent, {
                    container: DialogContainerComponent,
                    data: {
                        studentId: student.id,
                        studentName: `${student.firstName} ${student.lastName}`,
                        fullscreen: true,
                    },
                });

                this.studentBeingViewed.set(undefined);
                return [];
            })
        )
    );

    ngOnInit() {
        this.#viewStudentInfo(this.studentBeingViewed);
    }

    viewInfoClick(student: StudentTableRow) {
        this.studentBeingViewed.set(student);
    }

    #mapToStudentRows(
        students: Array<Partial<StudentDbEntry>>
    ): Array<StudentTableRow> {
        return students.map((student) => ({
            id: student.id || '',
            firstName: student.first_name || '',
            lastName: student.last_name || '',
            birthDate: student.birth_date || '',
            age: this.#calculateAge(student.birth_date || ''),
            school: student.school || '',
            email: student.student_email || student.primary_email || '',
            phone: student.student_phone || '',
            hasLifeThreateningAllergies:
                student.has_life_threatening_allergies || false,
            allergies: student.allergies,
        }));
    }

    #calculateAge(birthdate: string): number {
        if (!birthdate) return 0;
        const today = new Date();
        const birth = new Date(birthdate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birth.getDate())
        ) {
            age--;
        }
        return age;
    }
}
