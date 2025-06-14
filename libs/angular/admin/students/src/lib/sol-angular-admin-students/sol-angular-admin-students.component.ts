// @Component({
//     selector: 'sol-sol-angular-admin-students',
//     imports: [CommonModule],
//     templateUrl: './sol-angular-admin-students.component.html',
//     styleUrl: './sol-angular-admin-students.component.css',
// })
// export class SolAngularAdminStudentsComponent {}

// student-info.service.ts
import { Injectable } from '@angular/core';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class StudentInfoService {
    readonly #functionsApi = inject(FirebaseFunctionsService);

    getAllStudents(): Observable<{ students: Array<Partial<StudentDbEntry>> }> {
        return this.#functionsApi
            .call<{ students: Array<Partial<StudentDbEntry>> }>('allStudents', {
                fields: [
                    'id',
                    'first_name',
                    'last_name',
                    'birth_date',
                    'school',
                    'student_email',
                    'student_phone',
                    'primary_email',
                    'has_life_threatening_allergies',
                    'allergies',
                ],
            })
            .pipe(RequestedOperatorsUtility.ignoreAllStatesButLoaded());
    }

    getStudentInfoSheet(studentId: string): Observable<{ html: string }> {
        return this.#functionsApi
            .call<{ html: string }>(`studentInfoSheet?studentId=${studentId}`)
            .pipe(RequestedOperatorsUtility.ignoreAllStatesButLoaded());
    }
}

// student-info-display.component.ts
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

@Component({
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ButtonModule, ProgressSpinnerModule],
    template: `<div class="flex flex-col m-4">
        @let infoSheetValue = infoSheet.value();
        @if (infoSheetValue) {
            <div class="relative w-full">
                <div class="flex justify-between items-center mb-2">
                    <h2 class="text-xl font-bold">{{ studentName }}</h2>
                    <div class="flex gap-2">
                        <button
                            pButton
                            icon="pi pi-print"
                            label="Print"
                            class="p-button-primary"
                            (click)="print()"
                        ></button>
                        <button
                            pButton
                            icon="pi pi-times"
                            class="p-button-secondary"
                            (click)="close()"
                        ></button>
                    </div>
                </div>
                <div
                    class="overflow-auto border rounded-lg p-4"
                    style="max-height: 80vh"
                    [innerHTML]="infoSheetValue.html"
                ></div>
            </div>
        } @else {
            <div class="flex justify-center items-center p-8">
                <p-progressSpinner />
            </div>
        }
    </div>`,
})
export class StudentInfoDisplayComponent {
    readonly #data = inject<{
        studentId: string;
        studentName: string;
    }>(DIALOG_DATA);

    readonly #studentInfoService = inject(StudentInfoService);
    readonly #dialogRef = inject(DialogRef);

    readonly studentName = this.#data.studentName;

    readonly infoSheet = rxResource({
        stream: () =>
            this.#studentInfoService.getStudentInfoSheet(this.#data.studentId),
    });

    print() {
        const infoSheetValue = this.infoSheet.value();
        if (infoSheetValue) {
            const win = window.open('', '_blank');
            win?.document.write(infoSheetValue.html);
            win?.document.close();
            win?.print();
            win?.close();
        }
    }

    close() {
        this.#dialogRef.close();
    }
}

// student-info-loading.component.ts
import { TableModule } from 'primeng/table';

@Component({
    selector: 'sol-student-info-loading',
    template: `<p-table [loading]="true">
        <ng-template pTemplate="header">
            <tr>
                <th style="width: 20%">Name</th>
                <th style="width: 10%">Age</th>
                <th style="width: 20%">School</th>
                <th style="width: 20%">Contact</th>
                <th style="width: 15%">Medical</th>
                <th style="width: 15%">Actions</th>
            </tr>
        </ng-template>
    </p-table>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [TableModule],
})
export class StudentInfoLoadingComponent {}

// student-info-table.view.component.ts
import { input, output } from '@angular/core';
import { TagModule } from 'primeng/tag';

export interface StudentTableRow {
    id: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    age: number;
    school: string;
    email: string;
    phone: string;
    hasLifeThreateningAllergies: boolean;
    allergies?: string;
}

@Component({
    selector: 'sol-student-info-table-view',
    template: `<div class="mb-4">
            <h1>Student Information Management</h1>
            <p class="text-gray-600">
                View and print emergency information sheets for all students
            </p>
        </div>
        @let studentsValue = students();
        @if (!studentsValue) {
            <sol-student-info-loading></sol-student-info-loading>
        } @else {
            <div style="margin-top: 20px">
                <p-table
                    #dt
                    [value]="studentsValue"
                    [paginator]="true"
                    [rows]="25"
                    [showCurrentPageReport]="true"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords} students"
                    [globalFilterFields]="['firstName', 'lastName', 'school', 'email']"
                    responsiveLayout="scroll"
                    sortMode="single"
                >
                    <ng-template pTemplate="caption">
                        <div class="flex justify-between items-center">
                            <span>Total Students: {{ studentsValue.length }}</span>
                            <span class="p-input-icon-left">
                                <i class="pi pi-search"></i>
                                <input
                                    pInputText
                                    type="text"
                                    (input)="dt.filterGlobal($any($event.target).value, 'contains')"
                                    placeholder="Search students..."
                                />
                            </span>
                        </div>
                    </ng-template>
                    <ng-template pTemplate="header">
                        <tr>
                            <th pSortableColumn="lastName" style="width: 20%">
                                Name <p-sortIcon field="lastName"></p-sortIcon>
                            </th>
                            <th pSortableColumn="age" style="width: 10%">
                                Age <p-sortIcon field="age"></p-sortIcon>
                            </th>
                            <th pSortableColumn="school" style="width: 20%">
                                School <p-sortIcon field="school"></p-sortIcon>
                            </th>
                            <th style="width: 20%">Contact</th>
                            <th style="width: 15%">Medical</th>
                            <th style="width: 15%">Actions</th>
                        </tr>
                    </ng-template>
                    <ng-template pTemplate="body" let-student let-dt="dt">
                        <tr>
                            <td>
                                <strong>{{ student.lastName }}, {{ student.firstName }}</strong>
                            </td>
                            <td>{{ student.age }}</td>
                            <td>{{ student.school }}</td>
                            <td>
                                <div class="text-sm">
                                    @if (student.email) {
                                        <div>{{ student.email }}</div>
                                    }
                                    @if (student.phone) {
                                        <div>{{ student.phone }}</div>
                                    }
                                </div>
                            </td>
                            <td>
                                @if (student.hasLifeThreateningAllergies) {
                                    <p-tag
                                        severity="danger"
                                        icon="pi pi-exclamation-triangle"
                                        value="Life-Threatening Allergies"
                                    ></p-tag>
                                }
                            </td>
                            <td>
                                <p-button
                                    class="sol-button"
                                    [id]="student.id + 'viewBtn'"
                                    label="View Info Sheet"
                                    icon="pi pi-eye"
                                    size="small"
                                    [loading]="studentIdBeingViewed() === student.id"
                                    (click)="viewInfoClick.emit(student)"
                                >
                                </p-button>
                            </td>
                        </tr>
                    </ng-template>
                    <ng-template pTemplate="emptymessage">
                        <tr>
                            <td colspan="6" class="text-center">
                                No students found.
                            </td>
                        </tr>
                    </ng-template>
                </p-table>
            </div>
        }`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ButtonModule,
        TableModule,
        StudentInfoLoadingComponent,
        TagModule,
    ],
})
export class StudentInfoTableViewComponent {
    readonly students = input.required<Array<StudentTableRow> | undefined>();
    readonly studentIdBeingViewed = input.required<string | undefined>();

    viewInfoClick = output<StudentTableRow>();
}

// student-info-table.component.ts
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

@Component({
    template: `<sol-student-info-table-view
        [students]="studentRows.value()"
        [studentIdBeingViewed]="studentBeingViewed()?.id"
        (viewInfoClick)="viewInfoClick($event)"
    ></sol-student-info-table-view>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [StudentInfoTableViewComponent],
})
export class SolAngularAdminStudentsComponent implements OnInit {
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
                        fullscreen: false,
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
