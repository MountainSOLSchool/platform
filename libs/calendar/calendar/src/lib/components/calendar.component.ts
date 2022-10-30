import {
    ChangeDetectionStrategy,
    Component,
    CUSTOM_ELEMENTS_SCHEMA,
    inject,
    Input,
    Output,
} from '@angular/core';
import { FunctionsApi } from '@sol/firebase/functions-api';
import {
    mergeMap,
    Observable,
    of,
    Subject,
    map,
    startWith,
    ReplaySubject,
} from 'rxjs';
import {
    CalendarOptions,
    defineFullCalendarElement,
} from '@fullcalendar/web-component';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import { EventApi, EventInput, EventClickArg } from '@fullcalendar/core';
import { CommonModule } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';

defineFullCalendarElement();

@Component({
    standalone: true,
    imports: [CommonModule, SkeletonModule],
    selector: 'sol-calendar',
    changeDetection: ChangeDetectionStrategy.OnPush,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    templateUrl: './calendar.component.html',
})
export class CalendarComponent {
    private readonly firebaseApi = inject(FunctionsApi);

    @Input() set events(events: Array<EventInput> | null) {
        this.#events$.next(events);
    }

    calendarRows = Array(6);
    calendarColumns = Array(7);

    #events$ = new ReplaySubject<Array<EventInput> | null>();

    areEventsLoaded$ = this.#events$.pipe(map((events) => !!events));

    @Output() eventClick = new Subject<EventApi>();

    private _options: CalendarOptions = {
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
        initialDate: new Date(),
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
        },
        editable: false,
        selectable: false,
        selectMirror: true,
        dayMaxEvents: true,
        height: 600,
        eventClick: ({ event }: EventClickArg) => this.eventClick.next(event),
    };

    public options$: Observable<CalendarOptions> = of(this._options).pipe(
        mergeMap((options) =>
            this.#events$.pipe(
                map((events) => ({
                    ...options,
                    events: events ?? [],
                })),
                startWith(options)
            )
        )
    );
}
