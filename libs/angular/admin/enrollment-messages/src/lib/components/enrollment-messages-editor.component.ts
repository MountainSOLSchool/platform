import { Component, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { rxResource } from '@angular/core/rxjs-interop';
import { pipe, tap, switchMap, catchError, of, map, filter } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { MountainSolApiService } from '@sol/angular/firebase/api';
import { MarkdownEditorComponent } from '@sol/classes/class-management';
import type {
    EnrollmentMessage,
    EnrollmentMessageSeverity,
} from '@sol/ts/firebase/api-types';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

type SaveState =
    | { status: 'idle' }
    | { status: 'saving' }
    | { status: 'success' }
    | { status: 'error'; message: string };

interface MessageForm {
    id: string;
    text: string;
    severity: EnrollmentMessageSeverity;
    active: boolean;
    startDate: Date | null;
    endDate: Date | null;
}

const SEVERITY_OPTIONS: { value: EnrollmentMessageSeverity; label: string }[] =
    [
        { value: 'info', label: 'Info (blue)' },
        { value: 'warning', label: 'Warning (amber)' },
        { value: 'success', label: 'Success (green)' },
        { value: 'promotional', label: 'Promotional (yellow)' },
    ];

let nextId = 0;

@Component({
    selector: 'sol-enrollment-messages-editor',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatDividerModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MarkdownEditorComponent,
    ],
    template: `
        <div class="page-container">
            <div class="page-header">
                <h1>Enrollment Messages</h1>
                <div class="header-actions">
                    <button mat-stroked-button (click)="addMessage()">
                        <mat-icon>add</mat-icon>
                        Add Message
                    </button>
                    <button
                        mat-raised-button
                        color="primary"
                        (click)="save()"
                        [disabled]="saveState().status === 'saving'"
                    >
                        @if (saveState().status === 'saving') {
                            <mat-spinner diameter="20"></mat-spinner>
                        } @else {
                            Save All
                        }
                    </button>
                </div>
            </div>

            @if (saveState().status === 'success') {
                <p class="success-text">Messages saved successfully!</p>
            }
            @if (saveState().status === 'error') {
                <p class="error-text">{{ saveErrorMessage() }}</p>
            }

            @if (loading()) {
                <div class="loading-container">
                    <mat-spinner diameter="48"></mat-spinner>
                    <p>Loading messages...</p>
                </div>
            } @else if (messages().length === 0) {
                <mat-card class="empty-state">
                    <mat-card-content>
                        <mat-icon>campaign</mat-icon>
                        <h3>No enrollment messages</h3>
                        <p>
                            Add messages that will appear at the top of the
                            enrollment workflow.
                        </p>
                        <button
                            mat-raised-button
                            color="primary"
                            (click)="addMessage()"
                        >
                            Add First Message
                        </button>
                    </mat-card-content>
                </mat-card>
            } @else {
                @for (msg of messages(); track msg.id; let i = $index) {
                    <mat-card class="message-card">
                        <mat-card-content>
                            <div class="message-header">
                                <span class="message-number"
                                    >#{{ i + 1 }}</span
                                >
                                <mat-slide-toggle
                                    [ngModel]="msg.active"
                                    (ngModelChange)="
                                        updateField(i, 'active', $event)
                                    "
                                >
                                    Active
                                </mat-slide-toggle>
                                <button
                                    mat-icon-button
                                    color="warn"
                                    (click)="removeMessage(i)"
                                >
                                    <mat-icon>delete</mat-icon>
                                </button>
                            </div>

                            <sol-markdown-editor
                                [ngModel]="msg.text"
                                (ngModelChange)="
                                    updateField(i, 'text', $event)
                                "
                                placeholder="Use **bold** for emphasis, [link](url) for links"
                                [rows]="3"
                            ></sol-markdown-editor>

                            <div class="row">
                                <mat-form-field appearance="outline">
                                    <mat-label>Severity</mat-label>
                                    <mat-select
                                        [ngModel]="msg.severity"
                                        (ngModelChange)="
                                            updateField(
                                                i,
                                                'severity',
                                                $event
                                            )
                                        "
                                    >
                                        @for (
                                            opt of severityOptions;
                                            track opt.value
                                        ) {
                                            <mat-option [value]="opt.value">{{
                                                opt.label
                                            }}</mat-option>
                                        }
                                    </mat-select>
                                </mat-form-field>

                                <mat-form-field appearance="outline">
                                    <mat-label>Start Date (optional)</mat-label>
                                    <input
                                        matInput
                                        [matDatepicker]="startPicker"
                                        [ngModel]="msg.startDate"
                                        (ngModelChange)="
                                            updateField(
                                                i,
                                                'startDate',
                                                $event
                                            )
                                        "
                                    />
                                    <mat-datepicker-toggle
                                        matIconSuffix
                                        [for]="startPicker"
                                    ></mat-datepicker-toggle>
                                    <mat-datepicker
                                        #startPicker
                                    ></mat-datepicker>
                                </mat-form-field>

                                <mat-form-field appearance="outline">
                                    <mat-label>End Date (optional)</mat-label>
                                    <input
                                        matInput
                                        [matDatepicker]="endPicker"
                                        [ngModel]="msg.endDate"
                                        (ngModelChange)="
                                            updateField(
                                                i,
                                                'endDate',
                                                $event
                                            )
                                        "
                                    />
                                    <mat-datepicker-toggle
                                        matIconSuffix
                                        [for]="endPicker"
                                    ></mat-datepicker-toggle>
                                    <mat-datepicker
                                        #endPicker
                                    ></mat-datepicker>
                                </mat-form-field>
                            </div>
                        </mat-card-content>
                    </mat-card>
                }
            }
        </div>
    `,
    styles: [
        `
            .page-container {
                max-width: 800px;
                margin: 2rem auto;
                padding: 0 1rem;
            }
            .page-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 1.5rem;
            }
            .page-header h1 {
                margin: 0;
            }
            .header-actions {
                display: flex;
                gap: 0.5rem;
            }
            .loading-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 3rem;
                color: var(--sol-on-surface-variant, #666);
            }
            .empty-state {
                text-align: center;
                padding: 3rem;
            }
            .empty-state mat-icon {
                font-size: 64px;
                width: 64px;
                height: 64px;
                color: #ccc;
            }
            .empty-state h3 {
                margin: 1rem 0 0.5rem;
            }
            .empty-state p {
                color: var(--sol-on-surface-variant, #666);
                margin-bottom: 1.5rem;
            }
            .message-card {
                margin-bottom: 1rem;
            }
            .message-header {
                display: flex;
                align-items: center;
                gap: 1rem;
                margin-bottom: 0.5rem;
            }
            .message-number {
                font-weight: 500;
                color: var(--sol-on-surface-variant, #666);
            }
            .message-header button {
                margin-left: auto;
            }
            .row {
                display: flex;
                gap: 1rem;
                flex-wrap: wrap;
            }
            .row mat-form-field {
                flex: 1;
                min-width: 180px;
            }
            .success-text {
                color: #2e7d32;
                margin-bottom: 1rem;
            }
            .error-text {
                color: var(--sol-error, #b00020);
                margin-bottom: 1rem;
            }
        `,
    ],
})
export class EnrollmentMessagesEditorComponent {
    readonly #api = inject(MountainSolApiService);
    readonly severityOptions = SEVERITY_OPTIONS;

    readonly messages = signal<MessageForm[]>([]);
    readonly saveState = signal<SaveState>({ status: 'idle' });

    readonly saveErrorMessage = computed(() => {
        const state = this.saveState();
        return state.status === 'error' ? state.message : '';
    });

    readonly messagesResource = rxResource({
        stream: () =>
            this.#api.getEnrollmentMessagesAdmin(undefined as never),
    });

    readonly loading = computed(
        () => this.messagesResource.status() === 'loading'
    );

    constructor() {
        effect(() => {
            const result = this.messagesResource.value();
            if (result?.messages) {
                this.messages.set(
                    result.messages.map((m) => ({
                        id: m.id,
                        text: m.text,
                        severity: m.severity,
                        active: m.active,
                        startDate: m.startDate ? new Date(m.startDate) : null,
                        endDate: m.endDate ? new Date(m.endDate) : null,
                    }))
                );
            }
        });
    }

    addMessage() {
        this.messages.update((msgs) => [
            ...msgs,
            {
                id: `new-${nextId++}`,
                text: '',
                severity: 'info' as EnrollmentMessageSeverity,
                active: true,
                startDate: null,
                endDate: null,
            },
        ]);
    }

    removeMessage(index: number) {
        this.messages.update((msgs) => msgs.filter((_, i) => i !== index));
    }

    updateField(
        index: number,
        field: keyof MessageForm,
        value: unknown
    ) {
        this.messages.update((msgs) =>
            msgs.map((m, i) =>
                i === index ? { ...m, [field]: value } : m
            )
        );
    }

    readonly #saveMessages = rxMethod<void>(
        pipe(
            filter(() => this.saveState().status !== 'saving'),
            tap(() => this.saveState.set({ status: 'saving' })),
            switchMap(() => {
                const msgs: EnrollmentMessage[] = this.messages().map(
                    (m, index) => ({
                        id: m.id.startsWith('new-') ? '' : m.id,
                        text: m.text,
                        severity: m.severity,
                        active: m.active,
                        startDate: m.startDate
                            ? m.startDate.toISOString()
                            : undefined,
                        endDate: m.endDate
                            ? m.endDate.toISOString()
                            : undefined,
                        sortOrder: index,
                    })
                );
                return this.#api
                    .updateEnrollmentMessages({ messages: msgs })
                    .pipe(
                        map(() => ({ success: true as const })),
                        catchError((err) =>
                            of({
                                success: false as const,
                                error:
                                    err?.message ?? 'Failed to save messages',
                            })
                        )
                    );
            }),
            tap((result) => {
                if (result.success) {
                    this.saveState.set({ status: 'success' });
                } else {
                    this.saveState.set({
                        status: 'error',
                        message:
                            (result as { error: string }).error ??
                            'An error occurred',
                    });
                }
            })
        )
    );

    save() {
        this.#saveMessages(undefined as never);
    }
}
