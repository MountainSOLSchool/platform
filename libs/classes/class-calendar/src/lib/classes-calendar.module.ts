import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SolCalendarModule } from '@sol/calendar';
import { SelectClassesCalendarComponent } from './components/classes-calendar.component';
import { CardModule } from 'primeng/card';
import { FunctionsApiModule } from '@sol/firebase/functions-api';
import { CalendarRoutingModule } from './calendar-routing.module';

@NgModule({
    imports: [
        CommonModule,
        SolCalendarModule,
        CardModule,
        FunctionsApiModule,
        CalendarRoutingModule,
    ],
    declarations: [SelectClassesCalendarComponent],
})
export class ClassesCalendarModule {}
