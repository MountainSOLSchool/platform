import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { ButtonModule } from 'primeng/button';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { StudentInfoService } from '../services/student-info.service';
import { DomSanitizer } from '@angular/platform-browser';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [ButtonModule, ProgressSpinnerModule],
    template: `<div class="flex flex-col m-4">
        @let infoSheetValue = infoSheet.value();
        @if (infoSheetValue) {
            <div class="relative w-full">
                <div class="flex justify-between items-center mb-2">
                    <div class="flex gap-2">
                        <button
                            pButton
                            icon="pi pi-print"
                            label="Print"
                            class="p-button-primary"
                            (click)="print()"
                        ></button>
                    </div>
                </div>
                <iframe
                    class="w-full border rounded-lg"
                    style="height: 80vh"
                    [src]="sanitize.bypassSecurityTrustResourceUrl(createBlobUrl(infoSheetValue.html))"
                    frameborder="0"
                ></iframe>
            </div>
        } @else {
            <div class="flex-1 flex justify-content-center items-center">
                <p-progressSpinner />
            </div>
        }
    </div>`,
})
export class StudentInfoDisplayComponent {
    readonly #data = inject<{
        studentId: string;
        studentName: string;
    }>(DIALOG_DATA);

    readonly #studentInfoService = inject(StudentInfoService);
    readonly #dialogRef = inject(DialogRef);
    readonly sanitize = inject(DomSanitizer);

    readonly studentName = this.#data.studentName;

    readonly infoSheet = rxResource({
        stream: () =>
            this.#studentInfoService.getStudentInfoSheet(this.#data.studentId),
    });

    createBlobUrl(html: string): string {
        const blob = new Blob([html], { type: 'text/html' });
        return URL.createObjectURL(blob);
    }

    print() {
        const infoSheetValue = this.infoSheet.value();
        if (infoSheetValue) {
            const win = window.open('', '_blank');
            win?.document.write(infoSheetValue.html);
            win?.document.close();
            win?.print();
            win?.close();
        }
    }

    close() {
        this.#dialogRef.close();
    }
}
