import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    linkedSignal,
} from '@angular/core';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import { map } from 'rxjs';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { RequestedOperatorsUtility } from '@sol/angular/request';
import { rxResource } from '@angular/core/rxjs-interop';
import { ClassesSemesterListService } from '@sol/angular/classes/semester-list';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ProgressBarModule, TableModule, DropdownModule, FormsModule],
    templateUrl: './tshirts.component.html',
})
export class TshirtsComponent {
    readonly #functionsApi = inject(FirebaseFunctionsService);
    readonly #classesSemesterListService = inject(ClassesSemesterListService);

    readonly semesterOptions = rxResource({
        loader: () =>
            this.#classesSemesterListService
                .getAllSemestersWithCurrentFirst()
                .pipe(RequestedOperatorsUtility.ignoreAllStatesButLoaded()),
    });

    readonly selectedSemester = linkedSignal(
        () => this.semesterOptions.value()?.[0]?.id ?? ''
    );

    readonly students = rxResource({
        request: () => this.selectedSemester(),
        loader: ({ request: selectedSemester }) =>
            this.#functionsApi
                .call<{
                    list: Array<{
                        firstName: string;
                        lastName: string;
                        size: string;
                    }>;
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

    getSizeCount(size: string, students: Array<{ size: string }>) {
        return students.filter((student) => student.size === size).length;
    }
}
