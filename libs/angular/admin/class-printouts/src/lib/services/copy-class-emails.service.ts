import { Clipboard } from '@angular/cdk/clipboard';
import { inject, Injectable } from '@angular/core';
import { RequestedOperatorsUtility } from '@sol/angular/request';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import { MessageService } from 'primeng/api';
import { map, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CopyClassEmailsService {
    readonly #functionsApi = inject(FirebaseFunctionsService);
    readonly #clipboard = inject(Clipboard);
    readonly #messageService = inject(MessageService);

    copyClassEmails({
        classId,
        semesterId,
        classTitle,
    }: {
        classId: string;
        semesterId: string;
        classTitle: string;
    }) {
        return this.#functionsApi
            .call<{
                list: Array<string>;
            }>(`emails?classId=${classId}&semesterId=${semesterId}`)
            .pipe(
                RequestedOperatorsUtility.ignoreAllStatesButLoaded(),
                map(({ list }) => list.join(', ')),
                tap((emails) => {
                    const pending = this.#clipboard.beginCopy(emails);
                    let remainingAttempts = 3;
                    const attempt = () => {
                        const result = pending.copy();
                        if (!result && --remainingAttempts) {
                            setTimeout(attempt);
                        } else {
                            if (result)
                                this.#messageService.add({
                                    severity: 'success',
                                    summary: `Copied emails for ${classTitle}`,
                                });
                            pending.destroy();
                        }
                    };
                    attempt();
                })
            );
    }
}
