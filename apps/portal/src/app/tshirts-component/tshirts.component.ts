import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FunctionsApi } from '@sol/firebase/functions-api';
import { map, shareReplay } from 'rxjs';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './tshirts.component.html',
})
export class TshirtsComponent {
    constructor(private readonly functionsApi: FunctionsApi) {}

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
