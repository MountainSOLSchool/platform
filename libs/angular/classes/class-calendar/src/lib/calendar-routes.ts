import { Routes } from '@angular/router';
import { SelectClassesCalendarComponent } from './components/classes-calendar.component';

export const calendarRoutes: Routes = [
    {
        path: 'classes',
        component: SelectClassesCalendarComponent,
        children: [],
    },
];
