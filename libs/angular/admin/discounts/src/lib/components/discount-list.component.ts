import { Component, inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { Dialog } from '@angular/cdk/dialog';
import { firstValueFrom } from 'rxjs';
import { MountainSolApiService } from '@sol/angular/firebase/api';
import type { DiscountAdmin } from '@sol/ts/firebase/api-types';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';

import {
    ConfirmDeleteDialogComponent,
    ConfirmDeleteDialogData,
} from './confirm-delete-dialog.component';

const DISCOUNT_TYPE_LABELS: Record<string, string> = {
    amount: 'Fixed Amount',
    percent: 'Percentage',
    'amount-before-date': 'Amount (Expires)',
    'classes-percent': 'Classes %',
    'free-classes': 'Free Classes',
    'buy-x-class-type-percent': 'Buy X Get %',
};

@Component({
    selector: 'sol-discount-list',
    standalone: true,
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatTableModule,
        MatProgressSpinnerModule,
        MatChipsModule,
        MatTooltipModule,
    ],
    template: `
        <div class="page-container">
            <div class="page-header">
                <h1>Manage Discounts</h1>
                <button
                    mat-raised-button
                    color="primary"
                    (click)="navigateToCreate()"
                >
                    <mat-icon>add</mat-icon>
                    Create Discount
                </button>
            </div>

            @if (loading()) {
                <div class="loading-container">
                    <mat-spinner diameter="48"></mat-spinner>
                    <p>Loading discounts...</p>
                </div>
            } @else if (discounts().length === 0) {
                <mat-card class="empty-state">
                    <mat-card-content>
                        <mat-icon>local_offer</mat-icon>
                        <h3>No discount codes yet</h3>
                        <p>Create a discount code to get started.</p>
                        <button
                            mat-raised-button
                            color="primary"
                            (click)="navigateToCreate()"
                        >
                            Create First Discount
                        </button>
                    </mat-card-content>
                </mat-card>
            } @else {
                <mat-card class="table-card">
                    <table mat-table [dataSource]="discounts()">
                        <ng-container matColumnDef="status">
                            <th mat-header-cell *matHeaderCellDef>Status</th>
                            <td mat-cell *matCellDef="let d">
                                @if (d.active) {
                                    <span class="chip active">Active</span>
                                } @else {
                                    <span class="chip inactive"
                                        >Inactive</span
                                    >
                                }
                            </td>
                        </ng-container>

                        <ng-container matColumnDef="code">
                            <th mat-header-cell *matHeaderCellDef>Code</th>
                            <td mat-cell *matCellDef="let d">
                                <strong>{{ d.code }}</strong>
                            </td>
                        </ng-container>

                        <ng-container matColumnDef="type">
                            <th mat-header-cell *matHeaderCellDef>Type</th>
                            <td mat-cell *matCellDef="let d">
                                {{ getTypeLabel(d.type) }}
                            </td>
                        </ng-container>

                        <ng-container matColumnDef="details">
                            <th mat-header-cell *matHeaderCellDef>Details</th>
                            <td mat-cell *matCellDef="let d">
                                {{ getDetails(d) }}
                            </td>
                        </ng-container>

                        <ng-container matColumnDef="actions">
                            <th mat-header-cell *matHeaderCellDef>Actions</th>
                            <td mat-cell *matCellDef="let d">
                                <button
                                    mat-icon-button
                                    matTooltip="Edit"
                                    (click)="editDiscount(d)"
                                >
                                    <mat-icon>edit</mat-icon>
                                </button>
                                <button
                                    mat-icon-button
                                    matTooltip="Delete"
                                    (click)="confirmDelete(d)"
                                >
                                    <mat-icon>delete</mat-icon>
                                </button>
                            </td>
                        </ng-container>

                        <tr
                            mat-header-row
                            *matHeaderRowDef="displayedColumns"
                        ></tr>
                        <tr
                            mat-row
                            *matRowDef="let row; columns: displayedColumns"
                        ></tr>
                    </table>
                </mat-card>

                <div class="summary">
                    <p>{{ getSummary() }}</p>
                </div>
            }
        </div>
    `,
    styles: [
        `
            .page-container {
                max-width: 1000px;
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
            .loading-container {
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 3rem;
                color: var(--sol-on-surface-variant, #666);
            }
            .loading-container p {
                margin-top: 1rem;
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
            .table-card {
                overflow: hidden;
            }
            table {
                width: 100%;
            }
            .chip {
                display: inline-block;
                padding: 2px 8px;
                border-radius: 12px;
                font-size: 11px;
                font-weight: 500;
                text-transform: uppercase;
            }
            .chip.active {
                background-color: #e8f5e9;
                color: #2e7d32;
            }
            .chip.inactive {
                background-color: #fff3e0;
                color: #e65100;
            }
            .summary {
                padding: 1rem;
                text-align: center;
                color: var(--sol-on-surface-variant, #666);
            }
            .summary p {
                margin: 0;
            }
        `,
    ],
})
export class DiscountListComponent {
    readonly #api = inject(MountainSolApiService);
    readonly #router = inject(Router);
    readonly #dialog = inject(Dialog);

    readonly #refreshTrigger = signal(0);

    displayedColumns = ['status', 'code', 'type', 'details', 'actions'];

    readonly discountsResource = rxResource({
        params: () => this.#refreshTrigger(),
        stream: () => this.#api.getDiscounts(undefined as never),
    });

    readonly discounts = computed<DiscountAdmin[]>(
        () => this.discountsResource.value()?.discounts ?? []
    );

    readonly loading = computed(
        () => this.discountsResource.status() === 'loading'
    );

    navigateToCreate() {
        this.#router.navigate(['/admin/discounts/create']);
    }

    editDiscount(d: DiscountAdmin) {
        this.#router.navigate(['/admin/discounts/edit', d.id]);
    }

    async confirmDelete(d: DiscountAdmin) {
        const dialogRef = this.#dialog.open<boolean, ConfirmDeleteDialogData>(
            ConfirmDeleteDialogComponent,
            {
                width: '400px',
                data: { code: d.code },
            }
        );

        const result = await firstValueFrom(dialogRef.closed);
        if (result) {
            await firstValueFrom(this.#api.deleteDiscount({ id: d.id }));
            this.#refreshTrigger.update((v) => v + 1);
        }
    }

    getTypeLabel(type: string): string {
        return DISCOUNT_TYPE_LABELS[type] ?? type;
    }

    getDetails(d: DiscountAdmin): string {
        switch (d.type) {
            case 'amount':
                return `$${d.amount} off`;
            case 'percent':
                return `${d.percent}% off`;
            case 'amount-before-date':
                return `$${d.amount} off (expires ${d.date ? new Date(d.date).toLocaleDateString() : 'N/A'})`;
            case 'classes-percent':
                return `${d.percent}% off ${d.classOrGroupIds?.length ?? 0} class(es)`;
            case 'free-classes':
                return `${d.classOrGroupIds?.length ?? 0} free class(es)`;
            case 'buy-x-class-type-percent':
                return `${d.percent}% off when buying ${d.minimum}+ of ${d.classTypes?.length ?? 0} type(s)`;
            default:
                return '';
        }
    }

    getSummary(): string {
        const count = this.discounts().length;
        const activeCount = this.discounts().filter((d) => d.active).length;
        return `${count} discount${count !== 1 ? 's' : ''} • ${activeCount} active`;
    }
}
