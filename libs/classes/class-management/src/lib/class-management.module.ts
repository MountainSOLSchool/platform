import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClassFormComponent } from './components/class-form.component.ts/class-form.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            {
                path: 'edit/:id',
                pathMatch: 'full',
                component: ClassFormComponent,
            },
        ]),
    ],
    declarations: [ClassFormComponent],
})
export class ClassManagementModule {}
