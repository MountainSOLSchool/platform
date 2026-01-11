import { Component, input, signal, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    FormsModule,
    NG_VALUE_ACCESSOR,
    ControlValueAccessor,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MarkdownModule } from 'ngx-markdown';

@Component({
    selector: 'sol-markdown-editor',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatTabsModule,
        MatTooltipModule,
        MarkdownModule,
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MarkdownEditorComponent),
            multi: true,
        },
    ],
    template: `
        <div class="markdown-editor">
            <mat-tab-group
                [(selectedIndex)]="selectedTab"
                animationDuration="0ms"
            >
                <mat-tab label="Write">
                    <div class="editor-content">
                        <div class="toolbar">
                            <button
                                type="button"
                                mat-icon-button
                                matTooltip="Bold"
                                (click)="insertFormatting('**', '**')"
                            >
                                <mat-icon>format_bold</mat-icon>
                            </button>
                            <button
                                type="button"
                                mat-icon-button
                                matTooltip="Italic"
                                (click)="insertFormatting('*', '*')"
                            >
                                <mat-icon>format_italic</mat-icon>
                            </button>
                            <button
                                type="button"
                                mat-icon-button
                                matTooltip="Bulleted list"
                                (click)="insertListItem('- ')"
                            >
                                <mat-icon>format_list_bulleted</mat-icon>
                            </button>
                            <button
                                type="button"
                                mat-icon-button
                                matTooltip="Numbered list"
                                (click)="insertListItem('1. ')"
                            >
                                <mat-icon>format_list_numbered</mat-icon>
                            </button>
                            <button
                                type="button"
                                mat-icon-button
                                matTooltip="Link"
                                (click)="insertLink()"
                            >
                                <mat-icon>link</mat-icon>
                            </button>
                        </div>
                        <textarea
                            #textareaRef
                            class="markdown-textarea"
                            [ngModel]="value()"
                            (ngModelChange)="onValueChange($event)"
                            [placeholder]="placeholder()"
                            [rows]="rows()"
                            (blur)="onTouched()"
                        ></textarea>
                    </div>
                </mat-tab>
                <mat-tab label="Preview">
                    <div class="preview-content" [class.empty]="!value()">
                        @if (value()) {
                            <markdown [data]="value()"></markdown>
                        } @else {
                            <p class="preview-placeholder">
                                Nothing to preview yet
                            </p>
                        }
                    </div>
                </mat-tab>
            </mat-tab-group>
            <div class="help-text">
                <mat-icon>info</mat-icon>
                <span
                    >Supports Markdown: **bold**, *italic*, - lists,
                    [links](url)</span
                >
            </div>
        </div>
    `,
    styles: [
        `
            .markdown-editor {
                width: 100%;
            }

            .editor-content {
                display: flex;
                flex-direction: column;
            }

            .toolbar {
                display: flex;
                gap: 0.25rem;
                padding: 0.5rem 0;
                border-bottom: 1px solid #e0e0e0;
                margin-bottom: 0.5rem;
            }

            .toolbar button {
                color: #666;
            }

            .toolbar button:hover {
                color: #333;
            }

            .markdown-textarea {
                width: 100%;
                min-height: 120px;
                padding: 0.75rem;
                border: 1px solid #ccc;
                border-radius: 4px;
                font-family: inherit;
                font-size: 14px;
                line-height: 1.5;
                resize: vertical;
                box-sizing: border-box;
            }

            .markdown-textarea:focus {
                outline: none;
                border-color: var(--sol-primary, #006633);
            }

            .preview-content {
                min-height: 120px;
                padding: 0.75rem;
                border: 1px solid #e0e0e0;
                border-radius: 4px;
                background-color: #fafafa;
            }

            .preview-content.empty {
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .preview-placeholder {
                color: #999;
                font-style: italic;
            }

            .preview-content ::ng-deep {
                p {
                    margin: 0 0 0.5em 0;
                }

                p:last-child {
                    margin-bottom: 0;
                }

                ul,
                ol {
                    margin: 0.5em 0;
                    padding-left: 1.5em;
                }

                a {
                    color: var(--sol-primary, #006633);
                }
            }

            .help-text {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                margin-top: 0.5rem;
                margin-bottom: 0.5rem;
                color: #666;
                font-size: 12px;
            }

            .help-text mat-icon {
                font-size: 16px;
                height: 16px;
                width: 16px;
            }

            ::ng-deep .mat-mdc-tab-body-content {
                padding-top: 0.5rem;
            }
        `,
    ],
})
export class MarkdownEditorComponent implements ControlValueAccessor {
    readonly placeholder = input<string>('');
    readonly rows = input<number>(5);

    readonly value = signal<string>('');
    selectedTab = signal<number>(0);

    private onChange: (value: string) => void = () => {
        // Default no-op, will be replaced by registerOnChange
    };
    onTouched: () => void = () => {
        // Default no-op, will be replaced by registerOnTouched
    };

    writeValue(value: string): void {
        this.value.set(value ?? '');
    }

    registerOnChange(fn: (value: string) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    onValueChange(newValue: string): void {
        this.value.set(newValue);
        this.onChange(newValue);
    }

    insertFormatting(prefix: string, suffix: string): void {
        const textarea = document.querySelector(
            '.markdown-textarea'
        ) as HTMLTextAreaElement;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = this.value();
        const selectedText = text.substring(start, end);

        const newText =
            text.substring(0, start) +
            prefix +
            (selectedText || 'text') +
            suffix +
            text.substring(end);

        this.onValueChange(newText);

        setTimeout(() => {
            textarea.focus();
            if (selectedText) {
                textarea.setSelectionRange(
                    start + prefix.length,
                    end + prefix.length
                );
            } else {
                textarea.setSelectionRange(
                    start + prefix.length,
                    start + prefix.length + 4
                );
            }
        });
    }

    insertListItem(prefix: string): void {
        const textarea = document.querySelector(
            '.markdown-textarea'
        ) as HTMLTextAreaElement;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const text = this.value();

        const lineStart = text.lastIndexOf('\n', start - 1) + 1;
        const needsNewline = lineStart < start && text[start - 1] !== '\n';

        const insertion = (needsNewline ? '\n' : '') + prefix;
        const newText =
            text.substring(0, start) + insertion + text.substring(start);

        this.onValueChange(newText);

        setTimeout(() => {
            textarea.focus();
            const newPosition = start + insertion.length;
            textarea.setSelectionRange(newPosition, newPosition);
        });
    }

    insertLink(): void {
        const textarea = document.querySelector(
            '.markdown-textarea'
        ) as HTMLTextAreaElement;
        if (!textarea) return;

        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = this.value();
        const selectedText = text.substring(start, end);

        const linkText = selectedText || 'link text';
        const linkMarkdown = `[${linkText}](url)`;

        const newText =
            text.substring(0, start) + linkMarkdown + text.substring(end);

        this.onValueChange(newText);

        setTimeout(() => {
            textarea.focus();
            const urlStart = start + linkText.length + 3;
            textarea.setSelectionRange(urlStart, urlStart + 3);
        });
    }
}
