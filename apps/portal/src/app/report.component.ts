import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FunctionsApi } from '@sol/firebase/functions-api';

@Component({
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `<label for="classNameInput">Class Name</label>
        <input id="classNameInput" placeholder="Knots-fall-2021" />
        <button id="downloadBtn" (click)="downloadReport()">
            Download Report
        </button>`,
})
export class ReportComponent {
    constructor(private readonly functionsApi: FunctionsApi) {}

    downloadBlob(blob: Blob, name = 'file.txt') {
        const data = window.URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.href = data;
        link.download = name;

        // this is necessary as link.click() does not work on the latest firefox
        link.dispatchEvent(
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window,
            })
        );

        setTimeout(() => {
            // For Firefox it is necessary to delay revoking the ObjectURL
            window.URL.revokeObjectURL(data);
            link.remove();
        }, 100);
    }

    downloadReport() {
        const downloadButton =
            document.querySelector<HTMLButtonElement>('#downloadBtn');
        if (downloadButton) {
            downloadButton.innerText = 'Downloading...';
            downloadButton.disabled = true;
            this.functionsApi
                .get<{ data: Array<number> }>(
                    `roster?class= ${
                        document.querySelector<HTMLInputElement>(
                            '#classNameInput'
                        )?.value
                    }`
                )
                .subscribe(({ data }) => {
                    const spreadsheetFile = new Blob([new Uint8Array(data)], {
                        type: 'application/pdf',
                    });
                    this.downloadBlob(spreadsheetFile, 'roster.pdf');
                    downloadButton.innerText = 'Download Report';
                    downloadButton.disabled = false;
                });
        }
    }
}
