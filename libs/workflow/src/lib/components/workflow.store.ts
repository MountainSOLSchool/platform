import { inject, Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import {
    filter,
    fromEvent,
    map,
    merge,
    of,
    startWith,
    switchMap,
    take,
    tap,
} from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Step } from '../models/step';

@Injectable({
    providedIn: 'root',
})
export class WorkflowStore extends ComponentStore<{
    steps: Array<Step>;
    visitedSteps: string[];
    currentStep: string;
}> {
    private readonly router = inject(Router);
    private readonly route = inject(ActivatedRoute);

    constructor() {
        super({
            steps: [],
            visitedSteps: [],
            currentStep: '',
        });
    }

    readonly warnRefresh = this.effect((origin$) => {
        return origin$.pipe(
            startWith(undefined),
            switchMap(() => {
                return fromEvent(window, 'beforeunload').pipe(
                    tap((event: BeforeUnloadEvent) => {
                        // Warns the user if they try to refresh the page
                        // event.returnValue = true;
                    })
                );
            })
        );
    });

    readonly trackCurrentStep = this.effect(() => {
        return this.select(({ steps }) => steps).pipe(
            switchMap((steps) => {
                return merge(
                    of(
                        steps.find((step) =>
                            window.location.pathname.endsWith(
                                `/${step.routerLink}`
                            )
                        )?.routerLink
                    ),
                    this.router.events.pipe(
                        filter((event) => event instanceof NavigationEnd),
                        map(() => this.router.url),
                        switchMap((url) =>
                            of(steps).pipe(
                                map(() => {
                                    const step = steps.find((step) =>
                                        url.endsWith(`/${step.routerLink}`)
                                    );
                                    return step?.routerLink;
                                })
                            )
                        )
                    )
                );
            }),

            filter((step): step is string => !!step),
            tap((step) => {
                this.patchState((state) => ({
                    visitedSteps: Array.from(
                        new Set([...state.visitedSteps, step])
                    ),
                    currentStep: step,
                }));
            })
        );
    });

    readonly goToNextStep = this.effect((go$) => {
        return go$.pipe(
            switchMap(() => {
                return this.selectNextStepLink().pipe(
                    filter((step): step is string => !!step),
                    take(1),
                    tap((step) => {
                        this.router.navigate([`${step}`], {
                            relativeTo: this.route,
                        });
                    })
                );
            })
        );
    });

    selectSteps() {
        return this.state$.pipe(
            switchMap(({ steps }) => {
                return this.selectMaxVisitedStepIndex().pipe(
                    map((maxVisitedStepIndex) => {
                        return steps.map((step, i) => {
                            return {
                                ...step,
                                disabled: i > maxVisitedStepIndex,
                            };
                        });
                    })
                );
            })
        );
    }

    selectMaxVisitedStepIndex() {
        return this.state$.pipe(
            map(({ visitedSteps, steps }) => {
                const stepRouterLinks = steps.map((step) => step.routerLink);
                const maxVisitedStep = visitedSteps.reduce(
                    (max, step) => Math.max(max, stepRouterLinks.indexOf(step)),
                    -1
                );
                return maxVisitedStep;
            })
        );
    }

    selectCurrentStepRoute() {
        return this.select(({ currentStep }) => currentStep);
    }

    selectCurrentStepLabel() {
        return this.selectCurrentStepRoute().pipe(
            switchMap((currentStep) => {
                return this.select(({ steps }) => {
                    return steps.find((step) => step.routerLink === currentStep)
                        ?.label;
                });
            })
        );
    }

    selectNextStepLink() {
        return this.select(({ currentStep, steps }) => ({
            currentStep,
            steps,
        })).pipe(
            map(({ currentStep, steps }) => {
                const currentStepIndex = steps.findIndex(
                    (step) => step.routerLink === currentStep
                );
                const nextStep = steps[currentStepIndex + 1];
                return nextStep?.routerLink;
            })
        );
    }
}
