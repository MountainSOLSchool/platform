import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import {
    Requested,
    SolLoadedDirective,
    SolLoadingDirective,
} from '@sol/angular/request';
import { ClassPrintoutsLoadingViewComponent } from './class-printouts-loading.view.component';
import { ClassPrintoutRow } from '../../models/class-printout-row.type';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'sol-class-printouts-view',
    template: `<div
            style="display: flex; align-items: center; gap: 10px; margin-bottom: 20px"
        >
            <h1>Class Forms and Contacts</h1>
            <p-dropdown
                [options]="semesters"
                placeholder="Select a semester"
                optionLabel="name"
                optionValue="id"
                [showClear]="false"
                [ngModel]="selectedSemester"
                (ngModelChange)="selectedSemesterChange.next($event)"
            ></p-dropdown>
        </div>
        <sol-class-printouts-skeleton-view
            *solLoading="rows"
        ></sol-class-printouts-skeleton-view>
        <div *solLoaded="rows" style="margin-top: 20px">
            <p-table [value]="rows" responsiveLayout="scroll" sortMode="single">
                <ng-template pTemplate="header">
                    <tr>
                        <th pSortableColumn="title" style="width: 40%">
                            Name <p-sortIcon field="title"></p-sortIcon>
                        </th>
                        <th pSortableColumn="enrolledCount">
                            # Enrolled Students
                            <p-sortIcon field="enrolledCount"></p-sortIcon>
                        </th>
                        <th pSortableColumn="start">
                            Start
                            <p-sortIcon field="start"></p-sortIcon>
                        </th>
                        <th pSortableColumn="end">
                            End
                            <p-sortIcon field="end"></p-sortIcon>
                        </th>
                        <th style="width: 20%"></th>
                        <th style="width: 15%"></th>
                    </tr>
                </ng-template>
                <ng-template pTemplate="body" let-data>
                    @if (assertSemesterClass(data); as row) {
                        <tr>
                            <td>{{ row.title }}</td>
                            <td>{{ row.enrolledCount }}</td>
                            <td>{{ row.start }}</td>
                            <td>{{ row.end }}</td>
                            <td>
                                <p-button
                                    class="sol-button"
                                    label="View/Print Class Forms"
                                    icon="pi pi-download"
                                    [id]="row.id + 'downloadBtn'"
                                    [loading]="
                                        isClassFormDownloadInProgress[row.id]
                                    "
                                    (click)="downloadClick.emit(row.id)"
                                >
                                </p-button>
                            </td>
                            <td>
                                <p-button
                                    class="sol-button"
                                    [id]="row.id + 'emailsBtn'"
                                    label="Copy Email Lists"
                                    [loading]="isCopyEmailsInProgress[row.id]"
                                    (click)="copyEmailsClick.emit(row)"
                                >
                                </p-button>
                            </td>
                        </tr>
                    }
                </ng-template>
            </p-table>
        </div>`,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ButtonModule,
        TableModule,
        SolLoadingDirective,
        SolLoadedDirective,
        ClassPrintoutsLoadingViewComponent,
        DropdownModule,
        FormsModule,
    ]
})
export class ClassPrintoutsViewComponent {
    @Input({ required: true })
    rows!: Requested<Array<ClassPrintoutRow>>;
    @Input({ required: true })
    isCopyEmailsInProgress!: Record<string, boolean>;
    @Input({ required: true })
    isClassFormDownloadInProgress!: Record<string, boolean>;
    @Input({ required: true })
    semesters!: Array<{ id: string; name: string }>;
    @Input({ required: true })
    selectedSemester!: string;

    @Output()
    copyEmailsClick = new EventEmitter<ClassPrintoutRow>();

    @Output()
    downloadClick = new EventEmitter<string>();

    @Output()
    selectedSemesterChange = new EventEmitter<string>();

    assertSemesterClass(obj: unknown): ClassPrintoutRow {
        return obj as ClassPrintoutRow;
    }
}
