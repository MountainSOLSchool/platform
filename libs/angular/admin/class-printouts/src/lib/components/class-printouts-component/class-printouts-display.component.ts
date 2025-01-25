import {
    ChangeDetectionStrategy,
    Component,
    inject,
    viewChild,
} from '@angular/core';
import { DownloadClassFormsService } from '../../services/download-class-forms.service';
import { TabView, TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [TabViewModule, ButtonModule, ProgressSpinnerModule],
    template: `<div class="flex flex-col m-4">
        @let printoutsContentValue = printoutsContent.value();
        @if (printoutsContentValue) {
            <div class="relative w-full">
                <div class="flex justify-between items-center mb-2">
                    <div></div>
                    <button
                        pButton
                        icon="pi pi-print"
                        label="Print"
                        class="p-button-primary"
                        (click)="print()"
                    ></button>
                </div>
                <p-tabView #tabs class="flex-1">
                    <p-tabPanel header="Class Roster">
                        <div
                            class="overflow-auto"
                            [innerHTML]="printoutsContentValue.roster.html"
                        ></div>
                    </p-tabPanel>
                    <p-tabPanel header="Sign In/Out Sheet">
                        <div
                            class="overflow-auto"
                            [innerHTML]="printoutsContentValue.signIn.html"
                        ></div>
                    </p-tabPanel>
                    <p-tabPanel header="Student Health">
                        <div
                            class="overflow-auto"
                            [innerHTML]="printoutsContentValue.health.html"
                        ></div>
                    </p-tabPanel>
                </p-tabView>
            </div>
        } @else {
            <div class="flex-1 flex justify-content-center items-center">
                <p-progressSpinner />
            </div>
        }
    </div>`,
    styles: [
        `
            :host ::ng-deep table {
                font-size: 9px;
                border-collapse: collapse;
                width: 100%;
            }

            :host ::ng-deep table td,
            table th {
                border: 1px solid #ddd;
                padding: 8px;
            }

            :host ::ng-deep table tr:nth-child(even) {
                background-color: #f2f2f2;
            }

            :host ::ng-deep table th {
                padding-top: 12px;
                padding-bottom: 12px;
                text-align: left;
                background-color: #000;
                color: white;
            }
        `,
    ],
})
export class ClassPrintoutsDisplayComponent {
    readonly #data = inject<{
        classId: string;
        semesterId: string;
    }>(DIALOG_DATA);

    readonly #formsService = inject(DownloadClassFormsService);
    readonly #dialogRef = inject(DialogRef);
    readonly tabView = viewChild<TabView>('tabs');

    readonly tabs = ['roster', 'signIn', 'health'] as const;

    readonly printoutsContent = rxResource({
        loader: () =>
            this.#formsService.downloadClassForms(
                this.#data.classId,
                this.#data.semesterId
            ),
    });

    print() {
        const tabView = this.tabView();
        const printoutContentsValue = this.printoutsContent.value();
        if (tabView && printoutContentsValue) {
            const printContent =
                printoutContentsValue[this.tabs[tabView.tabindex]].html;
            const win = window.open('', '_blank');
            win?.document.write(printContent);
            win?.document.close();
            win?.print();
            win?.close();
        }
    }

    close() {
        this.#dialogRef.close();
    }
}
