import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { FunctionsApiModule } from '@sol/firebase/functions-api';

@NgModule({
    imports: [
        CommonModule,
        FunctionsApiModule,
        DashboardRoutingModule,
        ChartModule,
    ],
    declarations: [DashboardComponent],
})
export class DashboardComponentModule {}
