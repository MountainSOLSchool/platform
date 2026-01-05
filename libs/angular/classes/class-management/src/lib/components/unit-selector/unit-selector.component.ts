import {
    Component,
    inject,
    signal,
    computed,
    input,
    output,
    effect,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import { RequestedOperatorsUtility } from '@sol/angular/request';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UnitLimitWarningDialogComponent } from './unit-limit-warning-dialog.component';

interface Unit {
    id: string;
    name: string;
    description: string;
    category: string;
    isRepeatable?: boolean;
    prereqUnitIds: string[];
}

interface Path {
    id: string;
    name: string;
    description: string;
    unitIds: string[];
    electives: Array<{
        name: string;
        unitIds: string[];
    }>;
}

interface UnitsAndPathsResponse {
    paths: Path[];
    units: Record<string, Unit>;
}

interface AgeGroupUnitsResponse {
    units: Array<{ id: string; name: string; description: string }>;
}

interface PathUnitItem {
    unitId: string;
    unitName: string;
    unitDescription: string;
}

interface PathUnitGroup {
    groupName: string | null; // null for required units
    isElective: boolean;
    units: PathUnitItem[];
}

@Component({
    selector: 'sol-unit-selector',
    standalone: true,
    imports: [
        CommonModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
    ],
    template: `
        <div class="unit-selector">
            @if (loading()) {
                <div class="loading-container">
                    <mat-spinner diameter="32"></mat-spinner>
                    <span>Loading units...</span>
                </div>
            } @else if (ageGroup()) {
                <!-- Age group (Mallards/Mapaches) simple list view -->
                @if (ageGroupUnits().length === 0) {
                    <div class="empty-state">
                        <mat-icon>school</mat-icon>
                        <p>No units found for {{ ageGroup() }}</p>
                    </div>
                } @else {
                    <div class="selector-header">
                        <span class="selected-count">
                            {{ selectedUnitIds().length }} unit(s) selected
                        </span>
                        @if (selectedUnitIds().length > 0) {
                            <button mat-button (click)="clearAll()">
                                <mat-icon>clear_all</mat-icon>
                                Clear All
                            </button>
                        }
                    </div>
                    <div class="age-group-list">
                        @for (unit of ageGroupUnits(); track unit.id) {
                            <div
                                class="unit-item"
                                [class.selected]="isSelected(unit.id)"
                            >
                                <div class="unit-item-header">
                                    <mat-checkbox
                                        [checked]="isSelected(unit.id)"
                                        (change)="toggleUnit(unit.id)"
                                    >
                                        <span class="unit-name">
                                            {{ unit.name }}
                                        </span>
                                    </mat-checkbox>
                                    @if (unit.description) {
                                        <mat-icon
                                            class="info-icon"
                                            [matTooltip]="unit.description"
                                            matTooltipPosition="above"
                                        >
                                            info_outline
                                        </mat-icon>
                                    }
                                </div>
                            </div>
                        }
                    </div>
                }
            } @else if (paths().length === 0) {
                <div class="empty-state">
                    <mat-icon>school</mat-icon>
                    <p>No paths found</p>
                </div>
            } @else {
                <!-- Standard paths view -->
                <div class="selector-header">
                    <span class="selected-count">
                        {{ selectedUnitIds().length }} unit(s) selected
                    </span>
                    @if (selectedUnitIds().length > 0) {
                        <button mat-button (click)="clearAll()">
                            <mat-icon>clear_all</mat-icon>
                            Clear All
                        </button>
                    }
                </div>

                <div class="columns-container">
                    @for (path of paths(); track path.id) {
                        <div class="path-column">
                            <div
                                class="path-header"
                                [matTooltip]="path.description"
                            >
                                {{ path.name }}
                            </div>
                            <div class="path-units">
                                @for (
                                    group of getPathUnitGroups(path);
                                    track group.groupName ?? 'required'
                                ) {
                                    @if (group.groupName) {
                                        <div class="group-header">
                                            {{ group.groupName }}
                                        </div>
                                    }
                                    @for (
                                        item of group.units;
                                        track item.unitId
                                    ) {
                                        <div
                                            class="unit-item"
                                            [class.selected]="
                                                isSelected(item.unitId)
                                            "
                                            [class.is-elective]="
                                                group.isElective
                                            "
                                        >
                                            <div class="unit-item-header">
                                                <mat-checkbox
                                                    [checked]="
                                                        isSelected(item.unitId)
                                                    "
                                                    (change)="
                                                        toggleUnit(item.unitId)
                                                    "
                                                >
                                                    <span class="unit-name">
                                                        {{ item.unitName }}
                                                    </span>
                                                </mat-checkbox>
                                                @if (item.unitDescription) {
                                                    <mat-icon
                                                        class="info-icon"
                                                        [matTooltip]="
                                                            item.unitDescription
                                                        "
                                                        matTooltipPosition="above"
                                                    >
                                                        info_outline
                                                    </mat-icon>
                                                }
                                            </div>
                                        </div>
                                    }
                                }
                            </div>
                        </div>
                    }

                    @if (otherUnits().length > 0) {
                        <div class="path-column other-column">
                            <div class="path-header">Other</div>
                            <div class="path-units">
                                @for (unit of otherUnits(); track unit.id) {
                                    <div
                                        class="unit-item"
                                        [class.selected]="isSelected(unit.id)"
                                    >
                                        <div class="unit-item-header">
                                            <mat-checkbox
                                                [checked]="isSelected(unit.id)"
                                                (change)="toggleUnit(unit.id)"
                                            >
                                                <span class="unit-name">
                                                    {{ unit.name }}
                                                </span>
                                            </mat-checkbox>
                                            @if (unit.description) {
                                                <mat-icon
                                                    class="info-icon"
                                                    [matTooltip]="
                                                        unit.description
                                                    "
                                                    matTooltipPosition="above"
                                                >
                                                    info_outline
                                                </mat-icon>
                                            }
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                    }
                </div>
            }
        </div>
    `,
    styles: [
        `
            .unit-selector {
                border: 1px solid #e0e0e0;
                border-radius: 8px;
                overflow: hidden;
            }

            .loading-container {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 1rem;
                padding: 2rem;
                color: #666;
            }

            .empty-state {
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 2rem;
                color: #666;
            }

            .empty-state mat-icon {
                font-size: 48px;
                width: 48px;
                height: 48px;
                margin-bottom: 0.5rem;
            }

            .selector-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0.75rem 1rem;
                background: #f5f5f5;
                border-bottom: 1px solid #e0e0e0;
            }

            .selected-count {
                font-weight: 500;
                color: #1976d2;
            }

            .columns-container {
                display: flex;
                overflow-x: auto;
                max-height: 500px;
            }

            .path-column {
                flex: 1;
                min-width: 200px;
                max-width: 300px;
                border-right: 1px solid #e0e0e0;
                display: flex;
                flex-direction: column;
            }

            .path-column:last-child {
                border-right: none;
            }

            .path-column.other-column {
                background: #fafafa;
            }

            .age-group-list {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                gap: 0.5rem;
                padding: 1rem;
                max-height: 500px;
                overflow-y: auto;
            }

            .path-header {
                padding: 0.75rem;
                font-weight: 500;
                text-align: center;
                background: #f5f5f5;
                border-bottom: 1px solid #e0e0e0;
                position: sticky;
                top: 0;
                z-index: 1;
            }

            .path-units {
                flex: 1;
                overflow-y: auto;
                padding: 0.5rem;
            }

            .group-header {
                font-weight: 500;
                font-size: 0.8rem;
                color: #555;
                padding: 0.5rem 0.25rem 0.25rem;
                margin-top: 0.5rem;
                border-bottom: 1px solid #e0e0e0;
            }

            .group-header:first-child {
                margin-top: 0;
            }

            .unit-item {
                display: flex;
                flex-direction: column;
                padding: 0.5rem;
                border-radius: 4px;
                margin-bottom: 0.25rem;
                background: #fff;
                border: 1px solid #e0e0e0;
            }

            .unit-item:hover {
                background: #f5f5f5;
            }

            .unit-item.selected {
                background: #e8f5e9;
                border-color: #4caf50;
            }

            .unit-item.is-elective {
                border-left: 3px solid #ff9800;
            }

            .unit-item.is-elective.selected {
                border-left-color: #ff9800;
            }

            .unit-item-header {
                display: flex;
                align-items: flex-start;
                justify-content: space-between;
                gap: 0.25rem;
            }

            .unit-name {
                font-size: 0.875rem;
            }

            .info-icon {
                font-size: 16px;
                width: 16px;
                height: 16px;
                color: #9e9e9e;
                cursor: help;
                flex-shrink: 0;
            }

            .info-icon:hover {
                color: #1976d2;
            }

            mat-checkbox {
                flex: 1;
                min-width: 0;
            }

            ::ng-deep .unit-item mat-checkbox .mdc-form-field {
                width: 100%;
            }

            ::ng-deep .unit-item mat-checkbox label {
                width: 100%;
            }
        `,
    ],
})
export class UnitSelectorComponent {
    private readonly functions = inject(FirebaseFunctionsService);
    private readonly dialog = inject(MatDialog);

    private static readonly SOFT_UNIT_LIMIT = 3;

    readonly initialSelectedIds = input<string[]>([]);
    readonly ageGroup = input<string>('');
    readonly selectionChange = output<string[]>();

    loading = signal(true);
    paths = signal<Path[]>([]);
    units = signal<Record<string, Unit>>({});
    selectedUnitIds = signal<string[]>([]);
    ageGroupUnits = signal<
        Array<{ id: string; name: string; description: string }>
    >([]);

    private previousAgeGroup: string | null = null;

    otherUnits = computed(() => {
        const unitsMap = this.units();
        const pathsList = this.paths();

        return Object.values(unitsMap)
            .filter((unit) => !this.isUnitInAnyPathCheck(unit.id, pathsList))
            .sort((a, b) => a.name.localeCompare(b.name));
    });

    constructor() {
        effect(() => {
            const currentAgeGroup = this.ageGroup();
            if (this.previousAgeGroup === null) {
                // First load - don't clear selections, just load units
                this.previousAgeGroup = currentAgeGroup;
                this.loadUnits();
            } else if (currentAgeGroup !== this.previousAgeGroup) {
                // User changed age group - clear selections
                this.previousAgeGroup = currentAgeGroup;
                this.selectedUnitIds.set([]);
                this.selectionChange.emit([]);
                this.loadUnits();
            }
        });
    }

    private loadUnits() {
        const ageGroup = this.ageGroup();
        if (ageGroup) {
            this.loadAgeGroupUnits(ageGroup);
        } else {
            this.loadUnitsAndPaths();
        }
    }

    private loadUnitsAndPaths() {
        this.loading.set(true);
        this.functions
            .call<UnitsAndPathsResponse>('fullUnitsAndPaths')
            .pipe(RequestedOperatorsUtility.ignoreAllStatesButLoaded())
            .subscribe({
                next: (result) => {
                    const sortedPaths = [...result.paths].sort((a, b) => {
                        if (a.name === 'Ranger') return -1;
                        if (b.name === 'Ranger') return 1;
                        return a.name.localeCompare(b.name);
                    });
                    this.paths.set(sortedPaths);
                    this.units.set(result.units);
                    this.selectedUnitIds.set([...this.initialSelectedIds()]);
                    this.loading.set(false);
                },
                error: () => {
                    this.loading.set(false);
                },
            });
    }

    private loadAgeGroupUnits(ageGroup: string) {
        this.loading.set(true);
        this.functions
            .call<AgeGroupUnitsResponse>('getAgeGroupUnits', { ageGroup })
            .pipe(RequestedOperatorsUtility.ignoreAllStatesButLoaded())
            .subscribe({
                next: (result) => {
                    const sortedUnits = [...result.units].sort((a, b) =>
                        a.name.localeCompare(b.name)
                    );
                    this.ageGroupUnits.set(sortedUnits);
                    this.selectedUnitIds.set([...this.initialSelectedIds()]);
                    this.loading.set(false);
                },
                error: () => {
                    this.ageGroupUnits.set([]);
                    this.loading.set(false);
                },
            });
    }

    getPathUnitGroups(path: Path): PathUnitGroup[] {
        const unitsMap = this.units();
        const groups: PathUnitGroup[] = [];

        // Collect required units (no header)
        const requiredUnits: PathUnitItem[] = [];
        for (const rawUnitId of path.unitIds ?? []) {
            const unitId = rawUnitId?.trim();
            if (!unitId) continue;
            const unit = unitsMap[unitId];
            if (unit) {
                requiredUnits.push({
                    unitId: unit.id,
                    unitName: unit.name,
                    unitDescription: unit.description,
                });
            }
        }

        if (requiredUnits.length > 0) {
            // Sort required units alphabetically
            requiredUnits.sort((a, b) => a.unitName.localeCompare(b.unitName));
            groups.push({
                groupName: null,
                isElective: false,
                units: requiredUnits,
            });
        }

        // Collect elective groups
        for (const elective of path.electives ?? []) {
            const electiveUnits: PathUnitItem[] = [];
            for (const rawUnitId of elective.unitIds ?? []) {
                const unitId = rawUnitId?.trim();
                if (!unitId) continue;
                const unit = unitsMap[unitId];
                if (unit) {
                    electiveUnits.push({
                        unitId: unit.id,
                        unitName: unit.name,
                        unitDescription: unit.description,
                    });
                }
            }

            if (electiveUnits.length > 0) {
                // Sort elective units alphabetically
                electiveUnits.sort((a, b) =>
                    a.unitName.localeCompare(b.unitName)
                );
                groups.push({
                    groupName: elective.name,
                    isElective: true,
                    units: electiveUnits,
                });
            }
        }

        return groups;
    }

    private isUnitInAnyPathCheck(unitId: string, pathsList: Path[]): boolean {
        return pathsList.some((path) => {
            const inRequired = (path.unitIds ?? []).some(
                (id) => id?.trim() === unitId
            );
            if (inRequired) return true;
            return (path.electives ?? []).some((e) =>
                (e.unitIds ?? []).some((id) => id?.trim() === unitId)
            );
        });
    }

    isSelected(unitId: string): boolean {
        return this.selectedUnitIds().includes(unitId);
    }

    toggleUnit(unitId: string) {
        const current = this.selectedUnitIds();

        if (current.includes(unitId)) {
            const updated = current.filter((id) => id !== unitId);
            this.selectedUnitIds.set(updated);
            this.selectionChange.emit(updated);
            return;
        }

        if (current.length >= UnitSelectorComponent.SOFT_UNIT_LIMIT) {
            this.dialog
                .open(UnitLimitWarningDialogComponent)
                .afterClosed()
                .subscribe((confirmed) => {
                    if (confirmed) {
                        const updated = [...current, unitId];
                        this.selectedUnitIds.set(updated);
                        this.selectionChange.emit(updated);
                    }
                });
        } else {
            const updated = [...current, unitId];
            this.selectedUnitIds.set(updated);
            this.selectionChange.emit(updated);
        }
    }

    clearAll() {
        this.selectedUnitIds.set([]);
        this.selectionChange.emit([]);
    }
}
