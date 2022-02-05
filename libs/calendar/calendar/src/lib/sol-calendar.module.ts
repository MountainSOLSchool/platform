import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './components/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { SkeletonModule } from 'primeng/skeleton';

FullCalendarModule.registerPlugins([
    interactionPlugin,
    dayGridPlugin,
    timeGridPlugin,
]);

@NgModule({
    imports: [CommonModule, FullCalendarModule, SkeletonModule],
    declarations: [CalendarComponent],
    exports: [CalendarComponent],
})
export class SolCalendarModule {}
