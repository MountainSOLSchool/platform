import { NgModule } from '@angular/core';
import { ImportComponent } from './import.component';
import { FunctionsApiModule } from '@sol/firebase/functions-api';
import { CommonModule } from '@angular/common';
import { ImportRoutingModule } from './import-routing.module';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FileUploadModule } from 'primeng/fileupload';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { StoreModule } from '@ngrx/store';
import { reportComponentFeature } from './store/report.feature';
import { EffectsModule } from '@ngrx/effects';
import { ReportComponentEffects } from './store/report.effects';

@NgModule({
    imports: [
        CommonModule,
        FunctionsApiModule,
        ImportRoutingModule,
        ButtonModule,
        InputTextModule,
        AutoCompleteModule,
        FileUploadModule,
        ProgressBarModule,
        TableModule,
        StoreModule.forFeature(reportComponentFeature),
        EffectsModule.forFeature([ReportComponentEffects]),
    ],
    declarations: [ImportComponent],
})
export class ImportComponentModule {}
