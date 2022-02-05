import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SelectClassesCalendarComponent } from './components/classes-calendar.component';

const routes: Routes = [
    {
        path: 'classes',
        component: SelectClassesCalendarComponent,
        children: [],
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CalendarRoutingModule {}
