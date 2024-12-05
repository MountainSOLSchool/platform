import {
    ChangeDetectionStrategy,
    Component,
    inject,
    signal,
} from '@angular/core';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import { map, shareReplay, switchMap, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { RxLet } from '@rx-angular/template/let';
import { RequestedOperatorsUtility } from '@sol/angular/request';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { ClassesSemesterListService } from '@sol/angular/classes/semester-list';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        AsyncPipe,
        ProgressBarModule,
        TableModule,
        RxLet,
        DropdownModule,
        FormsModule,
    ],
    templateUrl: './tshirts.component.html'
})
export class TshirtsComponent {
    private readonly functionsApi = inject(FirebaseFunctionsService);

    readonly selectedSemester = signal('');

    readonly semesterOptions = toSignal(
        inject(ClassesSemesterListService)
            .getAllSemestersWithCurrentFirst()
            .pipe(
                RequestedOperatorsUtility.ignoreAllStatesButLoaded(),
                tap(([first]) => this.selectedSemester.set(first.id))
            )
    );

    students$ = toObservable(this.selectedSemester).pipe(
        switchMap((selectedSemester) =>
            this.functionsApi
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
                    ),
                    shareReplay()
                )
        )
    );

    sizeCounts$ = this.students$.pipe(
        map((students) => {
            return ['XS', 'S', 'M', 'L', 'XL'].map((size) => ({
                size,
                count: this.getSizeCount(size, students),
            }));
        })
    );

    getSizeCount(size: string, students: Array<{ size: string }>) {
        return students.filter((student) => student.size === size).length;
    }
}
