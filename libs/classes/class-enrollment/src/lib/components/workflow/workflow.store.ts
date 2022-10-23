import { HttpClient } from '@angular/common/http';
import { inject, Injectable, NgModule } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { FunctionsApi } from '@sol/firebase/functions-api';
import {
    distinctUntilChanged,
    filter,
    map,
    Observable,
    of,
    startWith,
    switchMap,
    take,
    tap,
    withLatestFrom,
} from 'rxjs';
import { QualifiedTransaction } from '@sol/payments/transactions';
import { NavigationEnd, Router } from '@angular/router';

@NgModule({
    imports: [FunctionsApi],
})
@Injectable()
export class WorkflowStore extends ComponentStore<{
    transaction: QualifiedTransaction | undefined;
    visitedSteps: string[];
}> {
    private readonly http = inject(HttpClient);
    private readonly functions = inject(FunctionsApi);
    private readonly router = inject(Router);

    private readonly steps = [
        { label: 'Classes', routerLink: 'classes' },
        { label: 'Info', routerLink: 'info' },
        { label: 'Checkout', routerLink: 'checkout' },
        {
            label: 'Confirmation',
            routerLink: 'confirmation',
        },
    ];

    constructor() {
        super({
            transaction: undefined,
            visitedSteps: [],
        });
    }

    readonly submit = this.effect((submit$: Observable<void>) => {
        return submit$.pipe(
            switchMap(() => {
                return this.selectUncommittedTransaction().pipe(
                    take(1),
                    switchMap((transaction) => {
                        return this.functions.call('enroll', transaction);
                    })
                );
            })
        );
    });

    selectUncommittedTransaction(): Observable<QualifiedTransaction> {
        return this.state$.pipe(
            map(({ transaction }) => transaction),
            filter(
                (transaction): transaction is QualifiedTransaction =>
                    !!transaction
            )
        );
    }

    selectSteps() {
        return this.state$.pipe(
            map(({ visitedSteps }) =>
                this.steps.map((step) => ({
                    ...step,
                    disabled: !visitedSteps.includes(step.label),
                }))
            )
        );
    }

    selectCurrentStep() {
        return this.selectSteps().pipe(
            switchMap((steps) => {
                return this.router.events.pipe(
                    filter((event) => event instanceof NavigationEnd),
                    map(() => this.router.url),
                    map((url) => {
                        console.log(url);
                        const step = steps.find((step) =>
                            url.endsWith(`/${step.routerLink}`)
                        );
                        return step?.label;
                    }),
                    startWith(
                        steps.find((step) =>
                            window.location.pathname.endsWith(
                                `/${step.routerLink}`
                            )
                        )?.label
                    ),
                    filter((step): step is string => !!step),
                    tap((step) =>
                        this.setState((state) =>
                            state.visitedSteps.includes(step)
                                ? state
                                : {
                                      ...state,
                                      visitedSteps: [
                                          ...state.visitedSteps,
                                          step,
                                      ],
                                  }
                        )
                    )
                );
            })
        );
    }

    selectNextStepLink() {
        return this.selectCurrentStep().pipe(
            map((currentStep) => {
                const currentStepIndex = this.steps.findIndex(
                    (step) => step.label === currentStep
                );
                const nextStep = this.steps[currentStepIndex + 1];
                return nextStep?.routerLink;
            })
        );
    }
}
