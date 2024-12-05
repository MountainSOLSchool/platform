import {
    ChangeDetectionStrategy,
    Component,
    inject,
    Input,
    Output,
} from '@angular/core';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import {
    mergeMap,
    Observable,
    of,
    Subject,
    map,
    startWith,
    ReplaySubject,
} from 'rxjs';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import {
    EventApi,
    EventInput,
    EventClickArg,
    CalendarOptions,
} from '@fullcalendar/core';
import { AsyncPipe } from '@angular/common';
import { SkeletonModule } from 'primeng/skeleton';
import { FullCalendarModule } from '@fullcalendar/angular';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [AsyncPipe, FullCalendarModule, SkeletonModule],
    selector: 'sol-calendar',
    templateUrl: './calendar.component.html'
})
export class CalendarComponent {
    private readonly firebaseApi = inject(FirebaseFunctionsService);

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
