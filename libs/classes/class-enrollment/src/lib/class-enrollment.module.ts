import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EnrollmentComponent } from './components/enrollment/enrollment.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: '', pathMatch: 'full', component: EnrollmentComponent },
        ]),
    ],
})
export class ClassEnrollmentModule {}
