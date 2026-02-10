import {
    ChangeDetectionStrategy,
    Component,
    computed,
    inject,
    signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
    ReactiveFormsModule,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MountainSolApiService } from '@sol/angular/firebase/api';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import { RequestedOperatorsUtility } from '@sol/angular/request';

type FormState =
    | { status: 'loading' }
    | { status: 'ready' }
    | { status: 'saving' }
    | { status: 'saved'; classId: string }
    | { status: 'error'; message: string };

@Component({
    selector: 'sol-medic-admin-class-form',
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatProgressSpinnerModule,
    ],
    styles: [`
        :host { display: block; max-width: 600px; }
        .form-fields { display: flex; flex-direction: column; gap: 1rem; }
        .form-fields mat-form-field { width: 100%; }
        .row { display: flex; gap: 1rem; }
        .row mat-form-field { flex: 1; }
        .actions { display: flex; gap: 1rem; margin-top: 1.5rem; }
        .spinner-container { display: flex; justify-content: center; padding: 3rem; }
    `],
    template: `
        <h2>{{ isEditing() ? 'Edit' : 'Create' }} Medic Class</h2>

        @if (state().status === 'loading') {
            <div class="spinner-container">
                <mat-spinner diameter="48"></mat-spinner>
            </div>
        } @else if (state().status === 'saved') {
            <mat-card appearance="outlined">
                <mat-card-content>
                    <p>Class {{ isEditing() ? 'updated' : 'created' }} successfully!</p>
                    <button mat-flat-button color="primary" (click)="goBack()">Back to Classes</button>
                </mat-card-content>
            </mat-card>
        } @else {
            <div class="form-fields">
                <mat-form-field>
                    <mat-label>Class Name</mat-label>
                    <input matInput [formControl]="form.controls.name" />
                    @if (form.controls.name.hasError('required')) {
                        <mat-error>Name is required</mat-error>
                    }
                </mat-form-field>

                <mat-form-field>
                    <mat-label>Description</mat-label>
                    <textarea matInput [formControl]="form.controls.description" rows="4"></textarea>
                </mat-form-field>

                <div class="row">
                    <mat-form-field>
                        <mat-label>Cost ($)</mat-label>
                        <input matInput type="number" [formControl]="form.controls.cost" />
                        @if (form.controls.cost.hasError('required')) {
                            <mat-error>Cost is required</mat-error>
                        }
                        @if (form.controls.cost.hasError('min')) {
                            <mat-error>Cost must be greater than 0</mat-error>
                        }
                    </mat-form-field>

                    <mat-form-field>
                        <mat-label>Status</mat-label>
                        <mat-select [formControl]="form.controls.status">
                            <mat-option value="draft">Draft</mat-option>
                            <mat-option value="published">Published</mat-option>
                            @if (isEditing()) {
                                <mat-option value="archived">Archived</mat-option>
                            }
                        </mat-select>
                    </mat-form-field>
                </div>

                <div class="row">
                    <mat-form-field>
                        <mat-label>Min Students</mat-label>
                        <input matInput type="number" [formControl]="form.controls.minStudents" />
                    </mat-form-field>

                    <mat-form-field>
                        <mat-label>Max Students</mat-label>
                        <input matInput type="number" [formControl]="form.controls.maxStudents" />
                    </mat-form-field>
                </div>
            </div>

            @if (saveError()) {
                <p style="color: var(--sol-error, red);">{{ saveError() }}</p>
            }

            <div class="actions">
                <button mat-stroked-button (click)="goBack()">Cancel</button>
                <button
                    mat-flat-button
                    color="primary"
                    [disabled]="form.invalid || state().status === 'saving'"
                    (click)="save()"
                >
                    @if (state().status === 'saving') {
                        <mat-spinner diameter="20"></mat-spinner>
                    } @else {
                        {{ isEditing() ? 'Update' : 'Create' }} Class
                    }
                </button>
            </div>
        }
    `,
})
export class MedicAdminClassFormComponent {
    readonly #api = inject(MountainSolApiService);
    readonly #route = inject(ActivatedRoute);
    readonly #router = inject(Router);
    readonly #functions = inject(FirebaseFunctionsService);

    readonly state = signal<FormState>({ status: 'ready' });
    readonly classId = signal<string | null>(null);
    readonly isEditing = computed(() => this.classId() !== null);

    readonly saveError = computed(() => {
        const s = this.state();
        return s.status === 'error' ? s.message : '';
    });

    readonly form = new FormGroup({
        name: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
        description: new FormControl('', { nonNullable: true }),
        cost: new FormControl(0, { nonNullable: true, validators: [Validators.required, Validators.min(0.01)] }),
        minStudents: new FormControl(1, { nonNullable: true, validators: [Validators.min(1)] }),
        maxStudents: new FormControl(20, { nonNullable: true, validators: [Validators.min(1)] }),
        status: new FormControl<'draft' | 'published' | 'archived'>('draft', { nonNullable: true }),
    });

    constructor() {
        const id = this.#route.snapshot.paramMap.get('id');
        if (id) {
            this.classId.set(id);
            this.loadClass(id);
        }
    }

    loadClass(id: string): void {
        this.state.set({ status: 'loading' });
        this.#api.getMedicClassesAdmin(undefined as never).subscribe({
            next: (res) => {
                const cls = res.classes.find((c) => c.id === id);
                if (cls) {
                    this.form.patchValue({
                        name: cls.name,
                        description: cls.description,
                        cost: cls.cost,
                        minStudents: cls.minStudents,
                        maxStudents: cls.maxStudents,
                        status: cls.status as 'draft' | 'published' | 'archived',
                    });
                    this.state.set({ status: 'ready' });
                } else {
                    this.state.set({ status: 'error', message: 'Class not found' });
                }
            },
            error: () => this.state.set({ status: 'error', message: 'Failed to load class' }),
        });
    }

    save(): void {
        if (this.form.invalid) return;
        this.state.set({ status: 'saving' });

        const values = this.form.getRawValue();

        if (this.isEditing()) {
            this.#api.updateMedicClass({
                classId: this.classId()!,
                ...values,
            }).subscribe({
                next: () => this.state.set({ status: 'saved', classId: this.classId()! }),
                error: () => this.state.set({ status: 'error', message: 'Failed to update class' }),
            });
        } else {
            this.#api.createMedicClass({
                ...values,
                status: values.status as 'draft' | 'published',
            }).subscribe({
                next: (res) => this.state.set({ status: 'saved', classId: res.classId }),
                error: () => this.state.set({ status: 'error', message: 'Failed to create class' }),
            });
        }
    }

    goBack(): void {
        this.#router.navigate(['/medic/admin/classes']);
    }
}
