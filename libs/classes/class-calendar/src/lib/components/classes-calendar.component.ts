import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EventApi, EventInput } from '@fullcalendar/angular';
import { Class } from '@sol/classes/domain';
import { FunctionsApi } from '@sol/firebase/functions-api';
import { mergeMap, Observable, scan, Subject, map, startWith } from 'rxjs';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<sol-calendar
            [events]="classEvents$ | async"
            (eventClick)="classSelected$.next($event)"
        ></sol-calendar>
        <p-card
            *ngFor="let class of selectedClasses$ | async"
            [header]="class.name"
            [style]="{ width: '25rem', 'margin-bottom': '2em' }"
        >
            <p>Hey I'm the details.</p>
        </p-card>`,
})
export class SelectClassesCalendarComponent {
    constructor(private readonly functionsApi: FunctionsApi) {}

    public classSelected$ = new Subject<EventApi>();

    selectedClasses$ = this.classSelected$.pipe(
        scan((selectedClasses, classThatToggledSelection) => {
            const wasClassSelected = !selectedClasses.find(
                (c) => c.id === classThatToggledSelection.id
            );
            return wasClassSelected
                ? [
                      ...selectedClasses,
                      {
                          id: classThatToggledSelection.id,
                          name: classThatToggledSelection.title,
                      },
                  ]
                : selectedClasses.filter(
                      (c) => c.id !== classThatToggledSelection.id
                  );
        }, new Array<Class>())
    );

    #serverClassEvents$ = this.functionsApi
        .call<{
            classes: Array<EventInput>;
        }>('classes')
        .pipe(map((response) => response.classes));

    classEvents$: Observable<Array<EventInput>> = this.#serverClassEvents$.pipe(
        mergeMap((initialClassEvents) =>
            this.classSelected$.pipe(
                scan(
                    (classEvents, selectedClass) =>
                        this.#mapToClassesWithUpdatedColors(
                            classEvents,
                            selectedClass
                        ),
                    initialClassEvents
                ),
                startWith(initialClassEvents)
            )
        )
    );

    #mapToClassesWithUpdatedColors(
        classEvents: Array<EventInput>,
        selectedClass: EventApi
    ): Array<EventInput> {
        return classEvents.map((classEvent) => {
            const didSelectionChange = classEvent.id === selectedClass.id;
            return didSelectionChange
                ? {
                      ...classEvent,
                      color: classEvent.color === 'green' ? 'default' : 'green',
                  }
                : classEvent;
        });
    }
}
