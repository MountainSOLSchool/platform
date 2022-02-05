import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
    CalendarOptions,
    EventApi,
    EventClickArg,
    EventInput,
} from '@fullcalendar/angular';
import { FunctionsApi } from '@sol/firebase/functions-api';
import { mergeMap, Observable, of, scan, Subject, map, startWith } from 'rxjs';

interface Class {
    name: string;
    id: string;
}

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<full-calendar
            [options]="(options$ | async) ?? undefined"
        ></full-calendar>
        <p-card
            *ngFor="let class of selectedClasses$ | async"
            [header]="class.name"
            [style]="{ width: '25rem', 'margin-bottom': '2em' }"
        >
            <p>Hey I'm the details.</p>
        </p-card>`,
})
export class CalendarComponent {
    constructor(private readonly firebaseApi: FunctionsApi) {}

    // Stream of class selection events
    private _classSelected$ = new Subject<EventApi>();

    // Stream of array of selected classes
    public selectedClasses$ = this._classSelected$.pipe(
        scan(
            (classes, selected) =>
                !classes.find((c) => c.id === selected.id)
                    ? [...classes, { id: selected.id, name: selected.title }]
                    : classes.filter((c) => c.id !== selected.id),
            new Array<Class>()
        )
    );

    private _initialClassEvents$ = this.firebaseApi
        .get<{
            classes: Array<EventInput>;
        }>('classes')
        .pipe(map((response) => response.classes));

    // Stream of classes as events, with color mapped to green when selected
    private _classEvents$: Observable<Array<EventInput>> =
        this._initialClassEvents$.pipe(
            mergeMap((initialClassEvents) =>
                this._classSelected$.pipe(
                    scan(
                        (classEvents, selectedClass) =>
                            classEvents.map((classEvent) =>
                                classEvent.id === selectedClass.id
                                    ? {
                                          ...classEvent,
                                          color:
                                              classEvent.color === 'green'
                                                  ? 'default'
                                                  : 'green',
                                      }
                                    : classEvent
                            ),
                        initialClassEvents
                    ),
                    startWith(initialClassEvents)
                )
            )
        );

    // Configuration provided to calendar component
    private _options: CalendarOptions = {
        initialDate: '2019-01-01',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
        },
        editable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: true,
        height: 600,
        eventClick: ({ event }: EventClickArg) =>
            this._classSelected$.next(event),
    };

    // Stream of calendar configuration, which includes stream of calendar events
    public options$: Observable<CalendarOptions> = of(this._options).pipe(
        mergeMap((options) =>
            this._classEvents$.pipe(
                map((classEvents) => ({
                    ...options,
                    events: classEvents,
                })),
                startWith(options)
            )
        )
    );
}
