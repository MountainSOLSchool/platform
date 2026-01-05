import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';
import { Component, inject, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

export type CopySemesterOption = 'same' | 'different' | 'new';

export interface CopyClassDialogData {
    classTitle: string;
    currentSemesterId: string;
    semesters: Array<{ id: string; name: string }>;
}

export interface CopyClassDialogResult {
    targetSemesterId: string;
    newSemesterName?: string;
}

@Component({
    standalone: true,
    imports: [
        FormsModule,
        ButtonModule,
        RadioButtonModule,
        DropdownModule,
        InputTextModule,
    ],
    template: `
        <div class="p-4 min-w-[400px]">
            <p class="mb-4">
                Where would you like to copy
                <strong>"{{ data.classTitle }}"</strong>?
            </p>

            <div class="flex flex-col gap-3 mb-4">
                <div class="flex items-center">
                    <p-radioButton
                        name="semesterOption"
                        value="same"
                        [(ngModel)]="selectedOption"
                        inputId="sameSemester"
                    ></p-radioButton>
                    <label for="sameSemester" class="ml-2 cursor-pointer">
                        Same semester
                    </label>
                </div>

                <div class="flex items-center">
                    <p-radioButton
                        name="semesterOption"
                        value="different"
                        [(ngModel)]="selectedOption"
                        inputId="differentSemester"
                    ></p-radioButton>
                    <label for="differentSemester" class="ml-2 cursor-pointer">
                        Different semester
                    </label>
                </div>

                @if (selectedOption === 'different') {
                    <div class="ml-6">
                        <p-dropdown
                            [options]="otherSemesters()"
                            [(ngModel)]="selectedSemesterId"
                            optionLabel="name"
                            optionValue="id"
                            placeholder="Select a semester"
                            styleClass="w-full"
                        ></p-dropdown>
                    </div>
                }

                <div class="flex items-center">
                    <p-radioButton
                        name="semesterOption"
                        value="new"
                        [(ngModel)]="selectedOption"
                        inputId="newSemester"
                    ></p-radioButton>
                    <label for="newSemester" class="ml-2 cursor-pointer">
                        New semester
                    </label>
                </div>

                @if (selectedOption === 'new') {
                    <div class="ml-6">
                        <input
                            type="text"
                            pInputText
                            [(ngModel)]="newSemesterName"
                            placeholder="e.g., Spring 2026"
                            class="w-full"
                        />
                    </div>
                }
            </div>

            <div class="flex justify-end gap-2 mt-6">
                <p-button
                    label="Cancel"
                    severity="secondary"
                    (onClick)="cancel()"
                ></p-button>
                <p-button
                    label="Copy Class"
                    [disabled]="!isValid()"
                    (onClick)="confirm()"
                ></p-button>
            </div>
        </div>
    `,
})
export class CopyClassDialogComponent {
    readonly data = inject<CopyClassDialogData>(DIALOG_DATA);
    readonly dialogRef = inject(DialogRef<CopyClassDialogResult | undefined>);

    selectedOption: CopySemesterOption = 'same';
    selectedSemesterId = '';
    newSemesterName = '';

    readonly otherSemesters = computed(() =>
        this.data.semesters.filter((s) => s.id !== this.data.currentSemesterId)
    );

    isValid(): boolean {
        switch (this.selectedOption) {
            case 'same':
                return true;
            case 'different':
                return !!this.selectedSemesterId;
            case 'new':
                return !!this.newSemesterName.trim();
        }
    }

    cancel() {
        this.dialogRef.close(undefined);
    }

    confirm() {
        if (!this.isValid()) return;

        let result: CopyClassDialogResult;

        switch (this.selectedOption) {
            case 'same':
                result = { targetSemesterId: this.data.currentSemesterId };
                break;
            case 'different':
                result = { targetSemesterId: this.selectedSemesterId };
                break;
            case 'new':
                result = {
                    targetSemesterId: 'new',
                    newSemesterName: this.newSemesterName.trim(),
                };
                break;
        }

        this.dialogRef.close(result);
    }
}
