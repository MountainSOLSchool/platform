import {
    ChangeDetectionStrategy,
    Component,
    Input,
    Output,
} from '@angular/core';
import {
    CalendarOptions,
    EventApi,
    EventClickArg,
    EventInput,
} from '@fullcalendar/angular';
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

@Component({
    selector: 'sol-calendar',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <ng-container *ngIf="areEventsLoaded$ | async; else skeleton"
            ><full-calendar
                [options]="(options$ | async) ?? undefined"
            ></full-calendar
        ></ng-container>
        <ng-template #skeleton>
            <h2 style="text-align: center">Loading Calendar...</h2>
            <table
                style="margin-top: 2rem; padding: 0 10px"
                width="100%"
                height="400px"
            >
                <tr *ngFor="let r of calendarRows">
                    <td style="padding: 5px" *ngFor="let c of calendarColumns">
                        <p-skeleton height="75px" width="95%"></p-skeleton>
                    </td>
                </tr>
            </table>
        </ng-template>
    `,
})
export class CalendarComponent {
    constructor(private readonly firebaseApi: FunctionsApi) {}

    @Input() set events(events: Array<EventInput> | null) {
        this.#events$.next(events);
    }

    calendarRows = Array(6);
    calendarColumns = Array(7);

    #events$ = new ReplaySubject<Array<EventInput> | null>();

    areEventsLoaded$ = this.#events$.pipe(map((events) => !!events));

    @Output() eventClick = new Subject<EventApi>();

    private _options: CalendarOptions = {
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
