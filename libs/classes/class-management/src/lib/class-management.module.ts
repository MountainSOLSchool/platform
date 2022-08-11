import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ClassFormComponent } from './components/class-form.component.ts/class-form.component';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';

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
        InputTextModule,
        DropdownModule,
        SliderModule,
        FormsModule,
    ],
    declarations: [ClassFormComponent],
})
export class ClassManagementModule {}
