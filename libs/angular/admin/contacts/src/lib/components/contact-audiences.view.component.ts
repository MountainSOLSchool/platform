import {
    ChangeDetectionStrategy,
    Component,
    computed,
    input,
    output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import type { AudienceContact } from '@sol/ts/firebase/api-types';

export type AudienceKind = 'semester' | 'recentYears' | 'class' | 'allTime';

export interface AudienceOption {
    id: string;
    name: string;
}

/**
 * Google Workspace caps a single message at roughly this many external
 * recipients, and every family address is external. Past it, the send has to
 * be split — better to say so here than to let Gmail fail mid-send.
 */
const EXTERNAL_RECIPIENT_LIMIT = 500;

@Component({
    selector: 'sol-contact-audiences-view',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatProgressSpinnerModule,
        MatSelectModule,
        MatSlideToggleModule,
    ],
    styles: [
        `
            .contact-row:nth-child(odd) {
                background: var(--sol-surface-variant, #f5f5f5);
            }
        `,
    ],
    template: `
        <div class="p-4 max-w-4xl mx-auto">
            <h1 class="text-2xl mb-1">Family Contact Lists</h1>
            <p class="mb-6 text-sm opacity-75">
                Pick an audience, then paste it into the
                <strong>Bcc</strong> field of a Gmail message.
            </p>

            <div class="flex flex-wrap gap-4 items-center mb-4">
                <mat-form-field class="min-w-[16rem]">
                    <mat-label>Audience</mat-label>
                    <mat-select
                        [value]="kind()"
                        (valueChange)="kindChange.emit($event)"
                    >
                        <mat-option value="semester">A semester</mat-option>
                        <mat-option value="recentYears">
                            Recently enrolled
                        </mat-option>
                        <mat-option value="class">A single class</mat-option>
                        <mat-option value="allTime">
                            All families of all time
                        </mat-option>
                    </mat-select>
                </mat-form-field>

                @if (kind() === 'semester' || kind() === 'class') {
                    <mat-form-field class="min-w-[14rem]">
                        <mat-label>Semester</mat-label>
                        <mat-select
                            [value]="semesterId()"
                            (valueChange)="semesterIdChange.emit($event)"
                        >
                            @for (semester of semesters(); track semester.id) {
                                <mat-option [value]="semester.id">
                                    {{ semester.name }}
                                </mat-option>
                            }
                        </mat-select>
                    </mat-form-field>
                }

                @if (kind() === 'class') {
                    <mat-form-field class="min-w-[18rem]">
                        <mat-label>Class</mat-label>
                        <mat-select
                            [value]="classId()"
                            (valueChange)="classIdChange.emit($event)"
                        >
                            @for (option of classes(); track option.id) {
                                <mat-option [value]="option.id">
                                    {{ option.name }}
                                </mat-option>
                            }
                        </mat-select>
                    </mat-form-field>
                }

                @if (kind() === 'recentYears') {
                    <mat-form-field class="min-w-[14rem]">
                        <mat-label>Enrolled within</mat-label>
                        <mat-select
                            [value]="years()"
                            (valueChange)="yearsChange.emit($event)"
                        >
                            <mat-option [value]="1">The last year</mat-option>
                            <mat-option [value]="2">
                                The last two years
                            </mat-option>
                            <mat-option [value]="3">
                                The last three years
                            </mat-option>
                        </mat-select>
                    </mat-form-field>
                }
            </div>

            <mat-slide-toggle
                class="mb-6"
                [checked]="includeAllGuardians()"
                (change)="includeAllGuardiansChange.emit($event.checked)"
            >
                Include every guardian's email, not just the primary contact
            </mat-slide-toggle>

            @if (loading()) {
                <div class="flex justify-center p-8">
                    <mat-progress-spinner mode="indeterminate" diameter="36" />
                </div>
            } @else if (contacts(); as list) {
                <div
                    class="flex flex-wrap gap-4 items-center justify-between mb-3"
                >
                    <div>
                        <div class="text-lg">
                            {{ list.length }}
                            {{ list.length === 1 ? 'address' : 'addresses' }}
                        </div>
                        <div class="text-sm opacity-75">{{ summary() }}</div>
                    </div>
                    <button
                        mat-flat-button
                        color="primary"
                        [disabled]="list.length === 0"
                        (click)="copyClick.emit()"
                    >
                        <mat-icon>content_copy</mat-icon>
                        <span>Copy for Bcc</span>
                    </button>
                </div>

                @if (list.length > limit) {
                    <div
                        class="mb-4 p-3 rounded text-sm"
                        style="background: var(--sol-surface-variant, #f5f5f5)"
                    >
                        Gmail will not send to more than about {{ limit }}
                        outside addresses in one message. Split this list across
                        {{ sendsNeeded() }} messages.
                    </div>
                }

                @if (list.length === 0) {
                    <div class="p-6 text-center opacity-75">
                        No addresses in this audience.
                    </div>
                } @else {
                    <div class="max-h-[28rem] overflow-auto rounded border">
                        @for (contact of list; track contact.email) {
                            <div class="contact-row px-3 py-2">
                                <div>
                                    @if (contact.name) {
                                        <span>{{ contact.name }}</span>
                                        <span class="opacity-60">
                                            &lt;{{ contact.email }}&gt;
                                        </span>
                                    } @else {
                                        <span>{{ contact.email }}</span>
                                    }
                                </div>
                                @if (contact.students.length) {
                                    <div class="text-xs opacity-60">
                                        {{ contact.students.join(', ') }}
                                    </div>
                                }
                            </div>
                        }
                    </div>
                }
            } @else {
                <div class="p-6 text-center opacity-75">
                    Could not load this audience.
                </div>
            }
        </div>
    `,
})
export class ContactAudiencesViewComponent {
    readonly kind = input.required<AudienceKind>();
    readonly semesters = input.required<Array<AudienceOption>>();
    readonly semesterId = input.required<string>();
    readonly classes = input.required<Array<AudienceOption>>();
    readonly classId = input.required<string>();
    readonly years = input.required<number>();
    readonly includeAllGuardians = input.required<boolean>();
    readonly contacts = input<Array<AudienceContact> | undefined>(undefined);
    readonly totalBeforeDedupe = input(0);
    readonly studentsWithoutEmail = input(0);
    readonly loading = input(false);

    readonly kindChange = output<AudienceKind>();
    readonly semesterIdChange = output<string>();
    readonly classIdChange = output<string>();
    readonly yearsChange = output<number>();
    readonly includeAllGuardiansChange = output<boolean>();
    readonly copyClick = output<void>();

    readonly limit = EXTERNAL_RECIPIENT_LIMIT;

    readonly sendsNeeded = computed(() =>
        Math.ceil((this.contacts()?.length ?? 0) / EXTERNAL_RECIPIENT_LIMIT)
    );

    readonly summary = computed(() => {
        const deduped =
            this.totalBeforeDedupe() - (this.contacts()?.length ?? 0);
        const withoutEmail = this.studentsWithoutEmail();
        const parts: Array<string> = [];
        if (deduped > 0) {
            parts.push(
                `${deduped} duplicate ${deduped === 1 ? 'address' : 'addresses'} collapsed`
            );
        }
        if (withoutEmail > 0) {
            parts.push(
                `${withoutEmail} ${withoutEmail === 1 ? 'student has' : 'students have'} no email on file`
            );
        }
        return parts.join(' · ');
    });
}
