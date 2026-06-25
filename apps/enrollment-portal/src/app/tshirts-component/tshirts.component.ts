import {
    ChangeDetectionStrategy,
    Component,
    computed,
    effect,
    inject,
    linkedSignal,
    signal,
    viewChild,
} from '@angular/core';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import { map } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { RequestedOperatorsUtility } from '@sol/angular/request';
import { rxResource } from '@angular/core/rxjs-interop';
import { ClassesSemesterListService } from '@sol/angular/classes/semester-list';
import { FormsModule } from '@angular/forms';

interface SizeCount {
    size: string;
    count: number;
}

interface StudentRow {
    firstName: string;
    lastName: string;
    size: string;
}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatFormFieldModule,
        MatProgressBarModule,
        MatSelectModule,
        MatTableModule,
        MatSortModule,
        FormsModule,
    ],
    templateUrl: './tshirts.component.html',
})
export class TshirtsComponent {
    readonly #functionsApi = inject(FirebaseFunctionsService);
    readonly #classesSemesterListService = inject(ClassesSemesterListService);

    readonly semesterOptions = rxResource({
        stream: () =>
            this.#classesSemesterListService
                .getAllSemestersWithCurrentFirst()
                .pipe(RequestedOperatorsUtility.ignoreAllStatesButLoaded()),
    });

    readonly selectedSemester = linkedSignal(
        () => this.semesterOptions.value()?.[0]?.id ?? ''
    );

    readonly students = rxResource({
        params: () => this.selectedSemester(),
        stream: ({ params: selectedSemester }) =>
            this.#functionsApi
                .call<{
                    list: Array<StudentRow>;
                }>('tshirts', { semesterId: selectedSemester })
                .pipe(
                    RequestedOperatorsUtility.ignoreAllStatesButLoaded(),
                    map(({ list }) =>
                        list.sort((a, b) => {
                            const lastNameDiff = a.lastName.localeCompare(
                                b.lastName
                            );
                            return lastNameDiff === 0
                                ? a.firstName.localeCompare(b.firstName)
                                : lastNameDiff;
                        })
                    )
                ),
    });

    readonly sizeCounts = computed(() => {
        const students = this.students.value();
        if (!students) return undefined;
        return ['XS', 'S', 'M', 'L', 'XL'].map((size) => ({
            size,
            count: this.getSizeCount(size, students),
        }));
    });

    readonly sizeCountColumns = ['size', 'count'];
    readonly studentColumns = ['lastName', 'firstName', 'size'];

    readonly sizeCountDataSource = new MatTableDataSource<SizeCount>([]);
    readonly studentDataSource = new MatTableDataSource<StudentRow>([]);

    readonly sizeCountSort = viewChild<MatSort>('sizeCountSort');
    readonly studentSort = viewChild<MatSort>('studentSort');

    readonly isStudentsLoading = signal(false);

    constructor() {
        effect(() => {
            this.sizeCountDataSource.data = this.sizeCounts() ?? [];
        });
        effect(() => {
            this.studentDataSource.data = this.students.value() ?? [];
            this.isStudentsLoading.set(this.students.isLoading());
        });
        effect(() => {
            const s = this.sizeCountSort();
            if (s) this.sizeCountDataSource.sort = s;
        });
        effect(() => {
            const s = this.studentSort();
            if (s) this.studentDataSource.sort = s;
        });
    }

    getSizeCount(size: string, students: Array<{ size: string }>) {
        return students.filter((student) => student.size === size).length;
    }
}
