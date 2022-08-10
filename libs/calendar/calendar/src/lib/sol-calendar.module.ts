import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './components/calendar.component';
import { SkeletonModule } from 'primeng/skeleton';

@NgModule({
    imports: [CommonModule, SkeletonModule],
    declarations: [CalendarComponent],
    exports: [CalendarComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SolCalendarModule {}
