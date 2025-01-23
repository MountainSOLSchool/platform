import { Clipboard } from '@angular/cdk/clipboard';
import { inject, Injectable } from '@angular/core';
import { RequestedOperatorsUtility } from '@sol/angular/request';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import { MessageService } from 'primeng/api';
import { delay, EMPTY, expand, finalize, last, map, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CopyClassEmailsService {
    readonly #functionsApi = inject(FirebaseFunctionsService);
    readonly #clipboard = inject(Clipboard);
    readonly #messageService = inject(MessageService);

    readonly #ANGULAR_CDK_COPY_RENDERER_DELAY = 0;

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
                map((emails) => ({
                    pending: this.#clipboard.beginCopy(emails),
                    attempts: 0,
                    success: false,
                })),
                delay(this.#ANGULAR_CDK_COPY_RENDERER_DELAY),
                expand(({ pending, attempts, success }) =>
                    success || attempts > 5
                        ? EMPTY.pipe(finalize(() => pending.destroy()))
                        : of({
                              pending,
                              attempts: attempts + 1,
                              success: pending.copy(),
                          }).pipe(delay(this.#ANGULAR_CDK_COPY_RENDERER_DELAY))
                ),
                last(),
                tap(({ success }) => {
                    if (success) {
                        this.#messageService.add({
                            severity: 'success',
                            summary: `Copied emails for ${classTitle}`,
                        });
                    } else {
                        this.#messageService.add({
                            severity: 'error',
                            summary: 'Something went wrong copying emails.',
                        });
                    }
                })
            );
    }
}
