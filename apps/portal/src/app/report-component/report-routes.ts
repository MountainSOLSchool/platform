import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';
import { provideEffects } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ReportComponent } from './report.component';
import { ReportComponentEffects } from './store/report.effects';
import { reportComponentFeature } from './store/report.feature';

export const reportRoutes: Routes = [
    {
        path: '',
        component: ReportComponent,
        children: [],
        providers: [
            importProvidersFrom(StoreModule.forFeature(reportComponentFeature)),
            importProvidersFrom(ReportComponentEffects),
            provideEffects(ReportComponentEffects),
        ],
    },
];
