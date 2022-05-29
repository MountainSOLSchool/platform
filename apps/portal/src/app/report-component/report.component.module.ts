import { NgModule } from '@angular/core';
import { ReportComponent } from './report.component';
import { FunctionsApiModule } from '@sol/firebase/functions-api';
import { CommonModule } from '@angular/common';
import { ReportRoutingModule } from './report-routing.module';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';

@NgModule({
    imports: [
        CommonModule,
        FunctionsApiModule,
        ReportRoutingModule,
        ButtonModule,
        InputTextModule,
        AutoCompleteModule,
        FileUploadModule,
        ProgressBarModule,
        TableModule,
    ],
    declarations: [ReportComponent],
})
export class ReportComponentModule {}
