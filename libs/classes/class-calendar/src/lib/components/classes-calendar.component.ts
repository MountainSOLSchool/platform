import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { EventApi, EventInput } from '@fullcalendar/core';
import { Class } from '@sol/classes/domain';
import { FunctionsApi } from '@sol/firebase/functions-api';
import { mergeMap, Observable, scan, Subject, map, startWith } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from '@sol/calendar';
import { CardModule } from 'primeng/card';

@Component({
    standalone: true,
    imports: [CommonModule, CalendarComponent, CardModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './classes-calendar.component.html',
})
export class SelectClassesCalendarComponent {
    private readonly functionsApi = inject(FunctionsApi);

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
                          cost: 0,
                      },
                  ]
                : selectedClasses.filter(
                      (c) => c.id !== classThatToggledSelection.id
                  );
        }, new Array<Class>())
    );

    #serverClassEvents$ = this.functionsApi
        .call<{
            classes: Array<{
                title: string;
                start: { _seconds: number };
                end: { _seconds: number };
                id: string;
            }>;
        }>('classes')
        .pipe(map((response) => response.classes));

    classEvents$: Observable<Array<EventInput>> = this.#serverClassEvents$.pipe(
        map((classes) =>
            classes.map((c) => {
                const start = new Date((c.start?._seconds ?? 0) * 1000);
                const end = new Date((c.start?._seconds ?? 0) * 1000);
                const event: EventInput = {
                    id: c.id,
                    title: c.title,
                    start,
                    end,
                };
                return event;
            })
        ),
        mergeMap((initialClassEvents) => {
            return this.classSelected$.pipe(
                scan(
                    (classEvents, selectedClass) =>
                        this.#mapToClassesWithUpdatedColors(
                            classEvents,
                            selectedClass
                        ),
                    initialClassEvents
                ),
                startWith(initialClassEvents)
            );
        })
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
