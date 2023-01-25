import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FunctionsApi } from '@sol/firebase/functions-api';
import { map, shareReplay } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';

@Component({
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, ProgressBarModule, TableModule],
    templateUrl: './tshirts.component.html',
})
export class TshirtsComponent {
    private readonly functionsApi = inject(FunctionsApi);

    students$ = this.functionsApi
        .call<{
            list: Array<{
                firstName: string;
                lastName: string;
                size: string;
            }>;
        }>('tshirts')
        .pipe(
            map(({ list }) =>
                list.sort((a, b) => {
                    const lastNameDiff = a.lastName.localeCompare(b.lastName);
                    return lastNameDiff === 0
                        ? a.firstName.localeCompare(b.firstName)
                        : lastNameDiff;
                })
            ),
            shareReplay(1)
        );
}
