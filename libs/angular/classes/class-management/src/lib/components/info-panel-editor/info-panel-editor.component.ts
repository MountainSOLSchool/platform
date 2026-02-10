import {
    Component,
    inject,
    signal,
    computed,
    effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { toSignal, rxResource } from '@angular/core/rxjs-interop';
import { map, pipe, tap, switchMap, of, catchError, filter } from 'rxjs';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { ClassesSemesterListService } from '@sol/angular/classes/semester-list';
import { RequestedOperatorsUtility } from '@sol/angular/request';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';

import {
    InfoPanelComponent,
    type PanelConfig,
} from '@sol/classes/enrollment';
import {
    MountainSolApiService,
    type AdditionalInfoPanel,
} from '@sol/angular/firebase/api';

interface HighlightBoxForm {
    id: string;
    text: string;
    type: 'warning' | 'info' | 'success' | 'promotional';
}

interface GridItemForm {
    id: string;
    label: string;
    value: string;
    description: string;
}

interface InfoCardContentForm {
    id: string;
    type: 'text' | 'list' | 'grid';
    text: string;
    items: Array<{ id: string; value: string }>;
    gridItems: GridItemForm[];
}

interface InfoCardForm {
    id: string;
    title: string;
    icon: string;
    content: InfoCardContentForm[];
}

type SaveState =
    | { status: 'idle' }
    | { status: 'saving' }
    | { status: 'success' }
    | { status: 'error'; message: string };

const GRADIENT_PRESETS = [
    {
        name: 'Purple Blue',
        value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    },
    {
        name: 'Orange Red',
        value: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    },
    {
        name: 'Green Teal',
        value: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    },
    {
        name: 'Sunset',
        value: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
    },
    {
        name: 'Sky Blue',
        value: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
    },
    {
        name: 'Forest',
        value: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
    },
];

type CopyState =
    | { status: 'idle' }
    | { status: 'loading' }
    | { status: 'success' }
    | { status: 'error'; message: string };

interface Semester {
    id: string;
    name: string;
}

@Component({
    selector: 'sol-info-panel-editor',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatSelectModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatSlideToggleModule,
        MatDividerModule,
        MatExpansionModule,
        MatButtonToggleModule,
        MatTooltipModule,
        InfoPanelComponent,
    ],
    template: `
        <div class="editor-container">
            <div class="editor-header">
                <button mat-icon-button (click)="navigateBack()">
                    <mat-icon>arrow_back</mat-icon>
                </button>
                <h1>Edit Info Panel</h1>
            </div>

            @if (loading()) {
                <div class="loading-container">
                    <mat-spinner diameter="48"></mat-spinner>
                    <p>Loading info panel configuration...</p>
                </div>
            } @else {
                <div class="editor-layout">
                    <div class="form-column">
                        <!-- Copy From Semester -->
                        <div class="copy-from-row">
                            @if (!showCopyFrom()) {
                                <button
                                    mat-stroked-button
                                    type="button"
                                    (click)="showCopyFrom.set(true)"
                                >
                                    <mat-icon>content_copy</mat-icon>
                                    Copy from another semester
                                </button>
                            } @else {
                                <div class="copy-from-controls">
                                    <mat-form-field appearance="outline" class="copy-semester-select">
                                        <mat-label>Copy from</mat-label>
                                        <mat-select
                                            [(ngModel)]="copyFromSemesterId"
                                            name="copyFromSemesterId"
                                        >
                                            @for (semester of otherSemesters(); track semester.id) {
                                                <mat-option [value]="semester.id">{{ semester.name }}</mat-option>
                                            }
                                        </mat-select>
                                    </mat-form-field>
                                    <button
                                        mat-raised-button
                                        color="primary"
                                        type="button"
                                        [disabled]="!copyFromSemesterId() || copyState().status === 'loading'"
                                        (click)="copyFromSemester()"
                                    >
                                        @if (copyState().status === 'loading') {
                                            <mat-spinner diameter="18"></mat-spinner>
                                        } @else {
                                            Import
                                        }
                                    </button>
                                    <button
                                        mat-button
                                        type="button"
                                        (click)="cancelCopyFrom()"
                                    >
                                        Cancel
                                    </button>
                                </div>
                                @if (copyState().status === 'error') {
                                    <span class="copy-error">{{ copyErrorMessage() }}</span>
                                }
                                @if (copyState().status === 'success') {
                                    <span class="copy-success">Panel imported successfully</span>
                                }
                            }
                        </div>

                        <!-- Header Settings -->
                        <mat-card class="form-section-card">
                            <mat-card-header>
                                <mat-card-title>Header Settings</mat-card-title>
                            </mat-card-header>
                            <mat-card-content>
                                <div class="toggle-row">
                                    <mat-slide-toggle
                                        [(ngModel)]="active"
                                        name="active"
                                    >
                                        Panel active (visible to students)
                                    </mat-slide-toggle>

                                    <mat-slide-toggle
                                        [(ngModel)]="isExpandedByDefault"
                                        name="isExpandedByDefault"
                                    >
                                        Expanded by default
                                    </mat-slide-toggle>
                                </div>

                                <mat-form-field appearance="outline">
                                    <mat-label>Title</mat-label>
                                    <input
                                        matInput
                                        [(ngModel)]="title"
                                        name="title"
                                        placeholder="e.g., Summer 2025 Program Information"
                                    />
                                </mat-form-field>

                                <mat-form-field appearance="outline">
                                    <mat-label>Subtitle</mat-label>
                                    <input
                                        matInput
                                        [(ngModel)]="subtitle"
                                        name="subtitle"
                                        placeholder="e.g., Click to expand for details"
                                    />
                                </mat-form-field>

                                <div class="gradient-section">
                                    <label class="field-label">Gradient</label>
                                    <div class="gradient-presets">
                                        @for (preset of gradientPresets; track preset.name) {
                                            <button
                                                type="button"
                                                class="gradient-swatch"
                                                [class.selected]="gradient() === preset.value"
                                                [style.background]="preset.value"
                                                [matTooltip]="preset.name"
                                                (click)="gradient.set(preset.value)"
                                            ></button>
                                        }
                                    </div>
                                    <mat-form-field appearance="outline" class="gradient-input">
                                        <mat-label>Custom CSS Gradient</mat-label>
                                        <input
                                            matInput
                                            [(ngModel)]="gradient"
                                            name="gradient"
                                            placeholder="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                                        />
                                    </mat-form-field>
                                </div>
                            </mat-card-content>
                        </mat-card>

                        <!-- Highlight Boxes -->
                        <mat-card class="form-section-card">
                            <mat-card-header>
                                <mat-card-title>Highlight Boxes</mat-card-title>
                                <mat-card-subtitle>Colored banners for announcements, warnings, or promotions</mat-card-subtitle>
                            </mat-card-header>
                            <mat-card-content>
                                @for (box of highlightBoxes(); track box.id; let i = $index) {
                                    <div class="highlight-box-row">
                                        <mat-form-field appearance="outline" class="type-select">
                                            <mat-label>Type</mat-label>
                                            <mat-select
                                                [ngModel]="box.type"
                                                (ngModelChange)="updateHighlightBox(i, 'type', $event)"
                                                [name]="'boxType_' + box.id"
                                            >
                                                <mat-option value="info">
                                                    <span class="type-indicator info-indicator"></span>
                                                    Info
                                                </mat-option>
                                                <mat-option value="success">
                                                    <span class="type-indicator success-indicator"></span>
                                                    Success
                                                </mat-option>
                                                <mat-option value="warning">
                                                    <span class="type-indicator warning-indicator"></span>
                                                    Warning
                                                </mat-option>
                                                <mat-option value="promotional">
                                                    <span class="type-indicator promotional-indicator"></span>
                                                    Promotional
                                                </mat-option>
                                            </mat-select>
                                        </mat-form-field>
                                        <mat-form-field appearance="outline" class="box-text">
                                            <mat-label>Text (supports markdown)</mat-label>
                                            <textarea
                                                matInput
                                                [ngModel]="box.text"
                                                (ngModelChange)="updateHighlightBox(i, 'text', $event)"
                                                [name]="'boxText_' + box.id"
                                                rows="2"
                                            ></textarea>
                                        </mat-form-field>
                                        <button
                                            mat-icon-button
                                            color="warn"
                                            type="button"
                                            (click)="removeHighlightBox(i)"
                                            matTooltip="Remove highlight box"
                                        >
                                            <mat-icon>delete</mat-icon>
                                        </button>
                                    </div>
                                }
                                <button
                                    mat-stroked-button
                                    type="button"
                                    (click)="addHighlightBox()"
                                >
                                    <mat-icon>add</mat-icon>
                                    Add Highlight Box
                                </button>
                            </mat-card-content>
                        </mat-card>

                        <!-- Info Cards -->
                        <mat-card class="form-section-card">
                            <mat-card-header>
                                <mat-card-title>Info Cards</mat-card-title>
                                <mat-card-subtitle>Cards with titles, icons, and content sections</mat-card-subtitle>
                            </mat-card-header>
                            <mat-card-content>
                                <mat-accordion multi>
                                    @for (card of infoCards(); track card.id; let cardIdx = $index) {
                                        <mat-expansion-panel>
                                            <mat-expansion-panel-header>
                                                <mat-panel-title>
                                                    @if (card.icon) {
                                                        <span class="card-icon-preview">{{ card.icon }}</span>
                                                    }
                                                    {{ card.title || 'Untitled Card' }}
                                                </mat-panel-title>
                                                <mat-panel-description>
                                                    {{ card.content.length }} content section{{ card.content.length !== 1 ? 's' : '' }}
                                                </mat-panel-description>
                                            </mat-expansion-panel-header>

                                            <div class="card-fields">
                                                <div class="card-header-row">
                                                    <mat-form-field appearance="outline" class="card-title-field">
                                                        <mat-label>Card Title</mat-label>
                                                        <input
                                                            matInput
                                                            [ngModel]="card.title"
                                                            (ngModelChange)="updateInfoCard(cardIdx, 'title', $event)"
                                                            [name]="'cardTitle_' + card.id"
                                                            placeholder="e.g., Schedule & Dates"
                                                        />
                                                    </mat-form-field>
                                                    <mat-form-field appearance="outline" class="card-icon-field">
                                                        <mat-label>Icon (emoji)</mat-label>
                                                        <input
                                                            matInput
                                                            [ngModel]="card.icon"
                                                            (ngModelChange)="updateInfoCard(cardIdx, 'icon', $event)"
                                                            [name]="'cardIcon_' + card.id"
                                                        />
                                                    </mat-form-field>
                                                </div>

                                                @for (section of card.content; track section.id; let sectionIdx = $index) {
                                                    <div class="content-section">
                                                        <div class="content-section-header">
                                                            <mat-button-toggle-group
                                                                [ngModel]="section.type"
                                                                (ngModelChange)="updateContentType(cardIdx, sectionIdx, $event)"
                                                                [name]="'contentType_' + section.id"
                                                            >
                                                                <mat-button-toggle value="text">Text</mat-button-toggle>
                                                                <mat-button-toggle value="list">List</mat-button-toggle>
                                                                <mat-button-toggle value="grid">Grid</mat-button-toggle>
                                                            </mat-button-toggle-group>
                                                            <button
                                                                mat-icon-button
                                                                color="warn"
                                                                type="button"
                                                                (click)="removeContentSection(cardIdx, sectionIdx)"
                                                                matTooltip="Remove content section"
                                                            >
                                                                <mat-icon>delete</mat-icon>
                                                            </button>
                                                        </div>

                                                        @if (section.type === 'text') {
                                                            <mat-form-field appearance="outline">
                                                                <mat-label>Text (supports markdown)</mat-label>
                                                                <textarea
                                                                    matInput
                                                                    [ngModel]="section.text"
                                                                    (ngModelChange)="updateContentText(cardIdx, sectionIdx, $event)"
                                                                    [name]="'contentText_' + section.id"
                                                                    rows="3"
                                                                ></textarea>
                                                            </mat-form-field>
                                                        }

                                                        @if (section.type === 'list') {
                                                            <div class="list-items">
                                                                @for (item of section.items; track item.id; let itemIdx = $index) {
                                                                    <div class="list-item-row">
                                                                        <mat-form-field appearance="outline">
                                                                            <mat-label>Item {{ itemIdx + 1 }}</mat-label>
                                                                            <input
                                                                                matInput
                                                                                [ngModel]="item.value"
                                                                                (ngModelChange)="updateListItem(cardIdx, sectionIdx, itemIdx, $event)"
                                                                                [name]="'listItem_' + item.id"
                                                                            />
                                                                        </mat-form-field>
                                                                        <button
                                                                            mat-icon-button
                                                                            color="warn"
                                                                            type="button"
                                                                            (click)="removeListItem(cardIdx, sectionIdx, itemIdx)"
                                                                        >
                                                                            <mat-icon>close</mat-icon>
                                                                        </button>
                                                                    </div>
                                                                }
                                                                <button
                                                                    mat-stroked-button
                                                                    type="button"
                                                                    (click)="addListItem(cardIdx, sectionIdx)"
                                                                >
                                                                    <mat-icon>add</mat-icon>
                                                                    Add Item
                                                                </button>
                                                            </div>
                                                        }

                                                        @if (section.type === 'grid') {
                                                            <div class="grid-items">
                                                                @for (gridItem of section.gridItems; track gridItem.id; let gridIdx = $index) {
                                                                    <div class="grid-item-row">
                                                                        <mat-form-field appearance="outline" class="grid-label">
                                                                            <mat-label>Label</mat-label>
                                                                            <input
                                                                                matInput
                                                                                [ngModel]="gridItem.label"
                                                                                (ngModelChange)="updateGridItem(cardIdx, sectionIdx, gridIdx, 'label', $event)"
                                                                                [name]="'gridLabel_' + gridItem.id"
                                                                            />
                                                                        </mat-form-field>
                                                                        <mat-form-field appearance="outline" class="grid-value">
                                                                            <mat-label>Value</mat-label>
                                                                            <input
                                                                                matInput
                                                                                [ngModel]="gridItem.value"
                                                                                (ngModelChange)="updateGridItem(cardIdx, sectionIdx, gridIdx, 'value', $event)"
                                                                                [name]="'gridValue_' + gridItem.id"
                                                                            />
                                                                        </mat-form-field>
                                                                        <mat-form-field appearance="outline" class="grid-desc">
                                                                            <mat-label>Description</mat-label>
                                                                            <input
                                                                                matInput
                                                                                [ngModel]="gridItem.description"
                                                                                (ngModelChange)="updateGridItem(cardIdx, sectionIdx, gridIdx, 'description', $event)"
                                                                                [name]="'gridDesc_' + gridItem.id"
                                                                            />
                                                                        </mat-form-field>
                                                                        <button
                                                                            mat-icon-button
                                                                            color="warn"
                                                                            type="button"
                                                                            (click)="removeGridItem(cardIdx, sectionIdx, gridIdx)"
                                                                        >
                                                                            <mat-icon>close</mat-icon>
                                                                        </button>
                                                                    </div>
                                                                }
                                                                <button
                                                                    mat-stroked-button
                                                                    type="button"
                                                                    (click)="addGridItem(cardIdx, sectionIdx)"
                                                                >
                                                                    <mat-icon>add</mat-icon>
                                                                    Add Grid Item
                                                                </button>
                                                            </div>
                                                        }
                                                    </div>
                                                }

                                                <button
                                                    mat-stroked-button
                                                    type="button"
                                                    (click)="addContentSection(cardIdx)"
                                                    class="add-content-btn"
                                                >
                                                    <mat-icon>add</mat-icon>
                                                    Add Content Section
                                                </button>

                                                <mat-divider></mat-divider>

                                                <div class="card-actions">
                                                    <button
                                                        mat-button
                                                        color="warn"
                                                        type="button"
                                                        (click)="removeInfoCard(cardIdx)"
                                                    >
                                                        <mat-icon>delete</mat-icon>
                                                        Remove Card
                                                    </button>
                                                </div>
                                            </div>
                                        </mat-expansion-panel>
                                    }
                                </mat-accordion>

                                <button
                                    mat-stroked-button
                                    type="button"
                                    (click)="addInfoCard()"
                                    class="add-card-btn"
                                >
                                    <mat-icon>add</mat-icon>
                                    Add Info Card
                                </button>
                            </mat-card-content>
                        </mat-card>

                        <!-- Save / Cancel Actions -->
                        <div class="form-actions-bar">
                            <div class="form-actions-status">
                                @if (saveState().status === 'saving') {
                                    <mat-spinner diameter="20"></mat-spinner>
                                    <span>Saving...</span>
                                }
                                @if (saveState().status === 'success') {
                                    <span class="save-success">
                                        <mat-icon>check_circle</mat-icon>
                                        Saved
                                    </span>
                                }
                                @if (saveState().status === 'error') {
                                    <span class="save-error">
                                        <mat-icon>error</mat-icon>
                                        {{ saveErrorMessage() }}
                                    </span>
                                }
                            </div>
                            <button
                                mat-button
                                type="button"
                                (click)="navigateBack()"
                            >
                                Cancel
                            </button>
                            <button
                                mat-raised-button
                                color="primary"
                                (click)="save()"
                                [disabled]="saveState().status === 'saving'"
                            >
                                Save Panel
                            </button>
                        </div>
                    </div>

                    <div class="preview-column">
                        <div class="preview-wrapper">
                            <div class="preview-label">Preview</div>
                            @if (previewConfig(); as config) {
                                <sol-info-panel [config]="config"></sol-info-panel>
                            } @else {
                                <div class="preview-empty">
                                    <mat-icon>visibility_off</mat-icon>
                                    <p>Add a title and content to see a preview</p>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            }
        </div>
    `,
    styles: [
        `
            .editor-container {
                max-width: 1400px;
                margin: 0 auto;
                padding: 1rem;
            }

            .editor-header {
                display: flex;
                align-items: center;
                gap: 1rem;
                margin-bottom: 1.5rem;
                flex-wrap: wrap;
            }

            .editor-header h1 {
                margin: 0;
                flex: 1;
            }

            .save-success, .save-error {
                display: flex;
                align-items: center;
                gap: 4px;
                font-size: 14px;
            }

            .save-success { color: var(--sol-primary); }
            .save-error { color: var(--sol-error); }

            .form-actions-bar {
                position: sticky;
                bottom: 0;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                gap: 0.75rem;
                padding: 1rem 1.5rem;
                background: var(--sol-surface);
                border: 1px solid var(--sol-input-border);
                border-radius: 8px;
                box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.08);
                z-index: 10;
            }

            .form-actions-status {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                margin-right: auto;
                font-size: 14px;
                color: var(--sol-on-surface-variant);
            }

            .loading-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 3rem;
                color: var(--sol-on-surface-variant);
            }

            .editor-layout {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 1.5rem;
                align-items: start;
            }

            .form-column {
                display: flex;
                flex-direction: column;
                gap: 1.5rem;
            }

            .form-section-card {
                padding: 0.5rem;
            }

            .form-section-card mat-card-content {
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
                padding-top: 0.75rem;
            }

            .form-section-card mat-form-field {
                width: 100%;
            }

            .toggle-row {
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
                margin-bottom: 0.5rem;
            }

            .field-label {
                font-size: 14px;
                color: var(--sol-hint-color);
                font-weight: 400;
                margin-bottom: 8px;
            }

            .gradient-presets {
                display: flex;
                gap: 8px;
                flex-wrap: wrap;
                margin-bottom: 12px;
            }

            .gradient-swatch {
                width: 48px;
                height: 32px;
                border-radius: 6px;
                border: 2px solid transparent;
                cursor: pointer;
                box-shadow: 0 1px 3px var(--sol-shadow-sm);
            }

            .gradient-swatch.selected {
                border-color: var(--sol-primary);
                box-shadow: 0 0 0 2px var(--sol-primary);
            }


            .highlight-box-row {
                display: grid;
                grid-template-columns: 140px 1fr auto;
                gap: 0.5rem;
                align-items: start;
            }

            .type-indicator {
                display: inline-block;
                width: 12px;
                height: 12px;
                border-radius: 50%;
                margin-right: 8px;
                vertical-align: middle;
            }

            .info-indicator {
                background: #2196f3;
            }

            .success-indicator {
                background: #4caf50;
            }

            .warning-indicator {
                background: #ff9800;
            }

            .promotional-indicator {
                background: #ff8a80;
            }


            mat-accordion {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }

            .card-icon-preview {
                font-size: 18px;
                margin-right: 8px;
            }

            .card-fields {
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
                padding-top: 0.5rem;
            }

            .card-header-row {
                display: grid;
                grid-template-columns: 1fr 100px;
                gap: 0.5rem;
            }

            .content-section {
                background: var(--sol-surface-variant);
                border-radius: 8px;
                padding: 12px;
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
            }

            .content-section-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
            }

            .list-items,
            .grid-items {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }

            .list-item-row {
                display: grid;
                grid-template-columns: 1fr auto;
                gap: 0.5rem;
                align-items: start;
            }

            .grid-item-row {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr auto;
                gap: 0.5rem;
                align-items: start;
            }

            .card-actions {
                display: flex;
                justify-content: flex-end;
                padding-top: 0.5rem;
            }


            .preview-column {
                position: sticky;
                top: 1rem;
            }

            .preview-wrapper {
                border: 1px solid var(--sol-input-border);
                border-radius: 8px;
                overflow: hidden;
            }

            .preview-label {
                background: var(--sol-surface-variant);
                padding: 8px 16px;
                font-size: 12px;
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                color: var(--sol-on-surface-variant);
                border-bottom: 1px solid var(--sol-input-border);
            }

            .preview-empty {
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 3rem;
                color: var(--sol-disabled-text);
                text-align: center;
            }


            .copy-from-row {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }

            .copy-from-controls {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                flex-wrap: wrap;
            }

            .copy-semester-select {
                width: 260px;
            }

            .copy-error, .copy-success { font-size: 13px; }
            .copy-error { color: var(--sol-error); }
            .copy-success { color: var(--sol-primary); }

            @media (max-width: 1024px) {
                .editor-layout {
                    grid-template-columns: 1fr;
                }

                .preview-column {
                    position: static;
                    order: -1;
                }

                .highlight-box-row {
                    grid-template-columns: 1fr;
                }

                .card-header-row {
                    grid-template-columns: 1fr;
                }

                .grid-item-row {
                    grid-template-columns: 1fr 1fr;
                }
            }
        `,
    ],
})
export class InfoPanelEditorComponent {
    readonly #api = inject(MountainSolApiService);
    readonly #router = inject(Router);
    readonly #route = inject(ActivatedRoute);
    readonly #semesterService = inject(ClassesSemesterListService);

    readonly #semesterIdFromRoute = toSignal(
        this.#route.paramMap.pipe(
            map((params) => params.get('semesterId') ?? '')
        )
    );

    readonly gradientPresets = GRADIENT_PRESETS;

    // Form signals
    title = signal('');
    subtitle = signal('');
    gradient = signal(GRADIENT_PRESETS[0].value);
    active = signal(true);
    isExpandedByDefault = signal(false);
    highlightBoxes = signal<HighlightBoxForm[]>([]);
    infoCards = signal<InfoCardForm[]>([]);
    saveState = signal<SaveState>({ status: 'idle' });

    readonly saveErrorMessage = computed(() => {
        const state = this.saveState();
        return state.status === 'error' ? state.message : '';
    });

    // Copy from semester
    showCopyFrom = signal(false);
    copyFromSemesterId = signal('');
    copyState = signal<CopyState>({ status: 'idle' });

    readonly copyErrorMessage = computed(() => {
        const state = this.copyState();
        return state.status === 'error' ? state.message : '';
    });

    readonly #semestersResource = rxResource({
        stream: () =>
            this.#semesterService
                .getAllSemestersWithCurrentFirst()
                .pipe(RequestedOperatorsUtility.ignoreAllStatesButLoaded()),
    });

    readonly otherSemesters = computed<Semester[]>(() => {
        const all = this.#semestersResource.value() ?? [];
        const currentId = this.#semesterIdFromRoute();
        return all.filter((s) => s.id !== currentId);
    });

    readonly #performCopy = rxMethod<string>(
        pipe(
            filter((semesterId) => !!semesterId),
            tap(() => this.copyState.set({ status: 'loading' })),
            switchMap((semesterId) =>
                this.#api.getSemesterInfoPanel({ semesterId }).pipe(
                    tap((result) => {
                        if (result.panel) {
                            this.#populateFromPanel(result.panel);
                            this.copyState.set({ status: 'success' });
                            this.showCopyFrom.set(false);
                            this.copyFromSemesterId.set('');
                            setTimeout(
                                () => this.copyState.set({ status: 'idle' }),
                                3000
                            );
                        } else {
                            this.copyState.set({
                                status: 'error',
                                message:
                                    'That semester has no info panel configured',
                            });
                        }
                    }),
                    catchError((err) => {
                        this.copyState.set({
                            status: 'error',
                            message:
                                err?.message ??
                                'Failed to load panel from semester',
                        });
                        return of(null);
                    })
                )
            )
        )
    );

    // Load existing panel config
    readonly #panelResource = rxResource({
        params: () => this.#semesterIdFromRoute() ?? '',
        stream: ({ params: semesterId }) => {
            if (!semesterId) return of(null);
            return this.#api.getSemesterInfoPanel({ semesterId }).pipe(
                catchError(() => of({ panel: null }))
            );
        },
    });

    readonly loading = computed(
        () => this.#panelResource.status() === 'loading'
    );

    // Populate form when data loads
    constructor() {
        effect(() => {
            const result = this.#panelResource.value();
            if (result?.panel) {
                this.#populateFromPanel(result.panel);
            }
        });
    }

    // Computed preview config
    readonly previewConfig = computed<PanelConfig | null>(() => {
        const t = this.title();
        if (!t) return null;

        return {
            title: t,
            subtitle: this.subtitle(),
            gradient: this.gradient(),
            isExpandedByDefault: this.isExpandedByDefault(),
            highlightBoxes: this.highlightBoxes().map((box) => ({
                text: box.text,
                type: box.type,
            })),
            infoCards: this.infoCards().map((card) => ({
                title: card.title,
                icon: card.icon,
                content: card.content.map((section) => {
                    if (section.type === 'text') {
                        return { type: 'text' as const, text: section.text };
                    }
                    if (section.type === 'list') {
                        return {
                            type: 'list' as const,
                            items: section.items.map((i) => i.value),
                        };
                    }
                    return {
                        type: 'grid' as const,
                        gridItems: section.gridItems.map((gi) => ({
                            label: gi.label,
                            value: gi.value,
                            description: gi.description || undefined,
                        })),
                    };
                }),
            })),
        };
    });

    // Save method
    readonly #performSave = rxMethod<AdditionalInfoPanel>(
        pipe(
            tap(() => this.saveState.set({ status: 'saving' })),
            switchMap((panel) => {
                const semesterId = this.#semesterIdFromRoute() ?? '';
                return this.#api
                    .updateSemesterInfoPanel({ semesterId, panel })
                    .pipe(
                        tap((result) => {
                            if (result.success) {
                                this.saveState.set({ status: 'success' });
                                setTimeout(
                                    () => this.saveState.set({ status: 'idle' }),
                                    3000
                                );
                            } else {
                                this.saveState.set({
                                    status: 'error',
                                    message: 'Failed to save',
                                });
                            }
                        }),
                        catchError((err) => {
                            this.saveState.set({
                                status: 'error',
                                message:
                                    err?.message ?? 'An unexpected error occurred',
                            });
                            return of(null);
                        })
                    );
            })
        )
    );

    #populateFromPanel(panel: AdditionalInfoPanel) {
        this.title.set(panel.title);
        this.subtitle.set(panel.subtitle);
        this.gradient.set(panel.gradient);
        this.active.set(panel.active);
        this.isExpandedByDefault.set(panel.isExpandedByDefault);

        this.highlightBoxes.set(
            (panel.highlightBoxes ?? []).map((box) => ({
                id: crypto.randomUUID(),
                text: box.text,
                type: box.type,
            }))
        );

        this.infoCards.set(
            (panel.infoCards ?? []).map((card) => ({
                id: crypto.randomUUID(),
                title: card.title,
                icon: card.icon,
                content: (card.content ?? []).map((section) => ({
                    id: crypto.randomUUID(),
                    type: section.type,
                    text: section.text ?? '',
                    items: (section.items ?? []).map((item) => ({
                        id: crypto.randomUUID(),
                        value: item,
                    })),
                    gridItems: (section.gridItems ?? []).map((gi) => ({
                        id: crypto.randomUUID(),
                        label: gi.label,
                        value: gi.value,
                        description: gi.description ?? '',
                    })),
                })),
            }))
        );
    }

    #buildPanelFromForm(): AdditionalInfoPanel {
        return {
            title: this.title(),
            subtitle: this.subtitle(),
            gradient: this.gradient(),
            active: this.active(),
            isExpandedByDefault: this.isExpandedByDefault(),
            highlightBoxes: this.highlightBoxes().map((box) => ({
                text: box.text,
                type: box.type,
            })),
            infoCards: this.infoCards().map((card) => ({
                title: card.title,
                icon: card.icon,
                content: card.content.map((section) => {
                    if (section.type === 'text') {
                        return { type: 'text' as const, text: section.text };
                    }
                    if (section.type === 'list') {
                        return {
                            type: 'list' as const,
                            items: section.items.map((i) => i.value),
                        };
                    }
                    return {
                        type: 'grid' as const,
                        gridItems: section.gridItems.map((gi) => ({
                            label: gi.label,
                            value: gi.value,
                            description: gi.description || undefined,
                        })),
                    };
                }),
            })),
        };
    }

    save() {
        this.#performSave(this.#buildPanelFromForm());
    }

    copyFromSemester() {
        const semesterId = this.copyFromSemesterId();
        if (semesterId) {
            this.#performCopy(semesterId);
        }
    }

    cancelCopyFrom() {
        this.showCopyFrom.set(false);
        this.copyFromSemesterId.set('');
        this.copyState.set({ status: 'idle' });
    }

    navigateBack() {
        const semesterId = this.#semesterIdFromRoute();
        this.#router.navigate(['/admin/classes/management'], {
            queryParams: semesterId ? { semesterId } : {},
        });
    }

    // Highlight Box Methods
    addHighlightBox() {
        const boxes = this.highlightBoxes();
        this.highlightBoxes.set([
            ...boxes,
            { id: crypto.randomUUID(), text: '', type: 'info' },
        ]);
    }

    removeHighlightBox(index: number) {
        const boxes = [...this.highlightBoxes()];
        boxes.splice(index, 1);
        this.highlightBoxes.set(boxes);
    }

    updateHighlightBox(
        index: number,
        field: keyof HighlightBoxForm,
        value: string
    ) {
        const boxes = [...this.highlightBoxes()];
        boxes[index] = { ...boxes[index], [field]: value };
        this.highlightBoxes.set(boxes);
    }

    // Info Card Methods
    addInfoCard() {
        const cards = this.infoCards();
        this.infoCards.set([
            ...cards,
            {
                id: crypto.randomUUID(),
                title: '',
                icon: '',
                content: [],
            },
        ]);
    }

    removeInfoCard(index: number) {
        const cards = [...this.infoCards()];
        cards.splice(index, 1);
        this.infoCards.set(cards);
    }

    updateInfoCard(index: number, field: 'title' | 'icon', value: string) {
        const cards = [...this.infoCards()];
        cards[index] = { ...cards[index], [field]: value };
        this.infoCards.set(cards);
    }

    // Content Section Methods
    addContentSection(cardIndex: number) {
        const cards = [...this.infoCards()];
        const card = { ...cards[cardIndex] };
        card.content = [
            ...card.content,
            {
                id: crypto.randomUUID(),
                type: 'text',
                text: '',
                items: [],
                gridItems: [],
            },
        ];
        cards[cardIndex] = card;
        this.infoCards.set(cards);
    }

    removeContentSection(cardIndex: number, sectionIndex: number) {
        const cards = [...this.infoCards()];
        const card = { ...cards[cardIndex] };
        const content = [...card.content];
        content.splice(sectionIndex, 1);
        card.content = content;
        cards[cardIndex] = card;
        this.infoCards.set(cards);
    }

    updateContentType(
        cardIndex: number,
        sectionIndex: number,
        type: 'text' | 'list' | 'grid'
    ) {
        const cards = [...this.infoCards()];
        const card = { ...cards[cardIndex] };
        const content = [...card.content];
        content[sectionIndex] = { ...content[sectionIndex], type };
        card.content = content;
        cards[cardIndex] = card;
        this.infoCards.set(cards);
    }

    updateContentText(
        cardIndex: number,
        sectionIndex: number,
        text: string
    ) {
        const cards = [...this.infoCards()];
        const card = { ...cards[cardIndex] };
        const content = [...card.content];
        content[sectionIndex] = { ...content[sectionIndex], text };
        card.content = content;
        cards[cardIndex] = card;
        this.infoCards.set(cards);
    }

    // List Item Methods
    addListItem(cardIndex: number, sectionIndex: number) {
        const cards = [...this.infoCards()];
        const card = { ...cards[cardIndex] };
        const content = [...card.content];
        const section = { ...content[sectionIndex] };
        section.items = [
            ...section.items,
            { id: crypto.randomUUID(), value: '' },
        ];
        content[sectionIndex] = section;
        card.content = content;
        cards[cardIndex] = card;
        this.infoCards.set(cards);
    }

    removeListItem(
        cardIndex: number,
        sectionIndex: number,
        itemIndex: number
    ) {
        const cards = [...this.infoCards()];
        const card = { ...cards[cardIndex] };
        const content = [...card.content];
        const section = { ...content[sectionIndex] };
        const items = [...section.items];
        items.splice(itemIndex, 1);
        section.items = items;
        content[sectionIndex] = section;
        card.content = content;
        cards[cardIndex] = card;
        this.infoCards.set(cards);
    }

    updateListItem(
        cardIndex: number,
        sectionIndex: number,
        itemIndex: number,
        value: string
    ) {
        const cards = [...this.infoCards()];
        const card = { ...cards[cardIndex] };
        const content = [...card.content];
        const section = { ...content[sectionIndex] };
        const items = [...section.items];
        items[itemIndex] = { ...items[itemIndex], value };
        section.items = items;
        content[sectionIndex] = section;
        card.content = content;
        cards[cardIndex] = card;
        this.infoCards.set(cards);
    }

    // Grid Item Methods
    addGridItem(cardIndex: number, sectionIndex: number) {
        const cards = [...this.infoCards()];
        const card = { ...cards[cardIndex] };
        const content = [...card.content];
        const section = { ...content[sectionIndex] };
        section.gridItems = [
            ...section.gridItems,
            {
                id: crypto.randomUUID(),
                label: '',
                value: '',
                description: '',
            },
        ];
        content[sectionIndex] = section;
        card.content = content;
        cards[cardIndex] = card;
        this.infoCards.set(cards);
    }

    removeGridItem(
        cardIndex: number,
        sectionIndex: number,
        gridIndex: number
    ) {
        const cards = [...this.infoCards()];
        const card = { ...cards[cardIndex] };
        const content = [...card.content];
        const section = { ...content[sectionIndex] };
        const gridItems = [...section.gridItems];
        gridItems.splice(gridIndex, 1);
        section.gridItems = gridItems;
        content[sectionIndex] = section;
        card.content = content;
        cards[cardIndex] = card;
        this.infoCards.set(cards);
    }

    updateGridItem(
        cardIndex: number,
        sectionIndex: number,
        gridIndex: number,
        field: keyof GridItemForm,
        value: string
    ) {
        const cards = [...this.infoCards()];
        const card = { ...cards[cardIndex] };
        const content = [...card.content];
        const section = { ...content[sectionIndex] };
        const gridItems = [...section.gridItems];
        gridItems[gridIndex] = { ...gridItems[gridIndex], [field]: value };
        section.gridItems = gridItems;
        content[sectionIndex] = section;
        card.content = content;
        cards[cardIndex] = card;
        this.infoCards.set(cards);
    }
}
