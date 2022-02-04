import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './components/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CardModule } from 'primeng/card';
import { HttpClientModule } from '@angular/common/http';
import { CalendarRoutingModule } from './calendar-routing.module';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';

FullCalendarModule.registerPlugins([
    interactionPlugin,
    dayGridPlugin,
    timeGridPlugin,
]);

@NgModule({
    imports: [
        CommonModule,
        FullCalendarModule,
        CardModule,
        HttpClientModule,
        CalendarRoutingModule,
    ],
    declarations: [CalendarComponent],
})
export class SolCalendarModule {}
