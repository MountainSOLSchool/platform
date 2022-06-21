import { NgModule } from '@angular/core';
import { TshirtsComponent } from './tshirts.component';
import { FunctionsApiModule } from '@sol/firebase/functions-api';
import { CommonModule } from '@angular/common';
import { TshirtsRoutingModule } from './tshirts-routing.module';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';

@NgModule({
    imports: [
        CommonModule,
        FunctionsApiModule,
        TshirtsRoutingModule,
        ProgressBarModule,
        TableModule,
    ],
    declarations: [TshirtsComponent],
})
export class TshirtsComponentModule {}
