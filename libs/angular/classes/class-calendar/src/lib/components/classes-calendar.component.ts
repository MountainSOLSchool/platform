import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { EventApi, EventInput } from '@fullcalendar/core';
import { SemesterClass } from '@sol/classes/domain';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import { mergeMap, Observable, scan, Subject, map, startWith } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { CalendarComponent } from '@sol/calendar';
import { CardModule } from 'primeng/card';
import { RequestedOperatorsUtility } from '@sol/angular/request';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [AsyncPipe, CalendarComponent, CardModule],
    templateUrl: './classes-calendar.component.html'
})
export class SelectClassesCalendarComponent {
    private readonly functionsApi = inject(FirebaseFunctionsService);

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
                          title: classThatToggledSelection.title,
                          cost: 0,
                      } as SemesterClass,
                  ]
                : selectedClasses.filter(
                      (c) => c.id !== classThatToggledSelection.id
                  );
        }, new Array<SemesterClass>())
    );

    #serverClassEvents$ = this.functionsApi
        .call<{
            classes: Array<{
                title: string;
                startMs: number;
                endMs: number;
                id: string;
            }>;
        }>('classes')
        .pipe(
            RequestedOperatorsUtility.ignoreAllStatesButLoaded(),
            map((response) => response.classes)
        );

    classEvents$: Observable<Array<EventInput>> = this.#serverClassEvents$.pipe(
        map((classes) =>
            classes.map((c) => {
                const start = new Date(c.startMs ?? 0);
                const end = new Date(c.endMs ?? 0);
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
