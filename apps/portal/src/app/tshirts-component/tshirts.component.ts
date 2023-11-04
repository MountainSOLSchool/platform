import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import { map, shareReplay } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { RxLet } from '@rx-angular/template/let';
import { RequestedOperatorsUtility } from '@sol/angular/request';

@Component({
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, ProgressBarModule, TableModule, RxLet],
    templateUrl: './tshirts.component.html',
})
export class TshirtsComponent {
    private readonly functionsApi = inject(FirebaseFunctionsService);

    students$ = this.functionsApi
        .call<{
            list: Array<{
                firstName: string;
                lastName: string;
                size: string;
            }>;
        }>('tshirts')
        .pipe(
            RequestedOperatorsUtility.ignoreAllStatesButLoaded(),
            map(({ list }) =>
                list.sort((a, b) => {
                    const lastNameDiff = a.lastName.localeCompare(b.lastName);
                    return lastNameDiff === 0
                        ? a.firstName.localeCompare(b.firstName)
                        : lastNameDiff;
                })
            ),
            shareReplay()
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
