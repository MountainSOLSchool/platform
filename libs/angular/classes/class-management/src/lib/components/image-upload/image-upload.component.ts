import {
    Component,
    input,
    output,
    signal,
    model,
    computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

export type ImageUploadState =
    | { status: 'idle' }
    | { status: 'uploading' }
    | { status: 'success' }
    | { status: 'error'; message: string };

@Component({
    selector: 'sol-image-upload',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatProgressSpinnerModule,
    ],
    template: `
        <div class="image-upload-container">
            @if (previewUrl()) {
                <div class="image-preview">
                    <img [src]="previewUrl()" [alt]="alt()" />
                    <button
                        mat-icon-button
                        type="button"
                        class="remove-image-btn"
                        (click)="onRemove()"
                        [disabled]="state().status === 'uploading'"
                    >
                        <mat-icon>close</mat-icon>
                    </button>
                </div>
            } @else {
                <div
                    class="image-dropzone"
                    (click)="fileInput.click()"
                    (dragover)="onDragOver($event)"
                    (dragleave)="onDragLeave($event)"
                    (drop)="onDrop($event)"
                    [class.dragover]="isDragging()"
                >
                    <mat-icon>cloud_upload</mat-icon>
                    <span>{{ dropzoneText() }}</span>
                    <small>{{ supportedFormatsText() }}</small>
                </div>
            }
            <input
                #fileInput
                type="file"
                [accept]="acceptTypes()"
                (change)="onFileSelected($event)"
                hidden
            />

            @if (state().status === 'uploading') {
                <div class="upload-progress">
                    <mat-spinner diameter="20"></mat-spinner>
                    <span>{{ uploadingText() }}</span>
                </div>
            }

            @if (state().status === 'error') {
                <div class="upload-error">
                    <mat-icon>error</mat-icon>
                    <span>{{ errorMessage() }}</span>
                </div>
            }
        </div>
    `,
    styles: [
        `
            .image-upload-container {
                display: flex;
                flex-direction: column;
                gap: 0.5rem;
            }

            .image-dropzone {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
                padding: 2rem;
                border: 2px dashed #ccc;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.2s ease;
                background-color: #fafafa;
            }

            .image-dropzone:hover,
            .image-dropzone.dragover {
                border-color: var(--sol-primary, #006633);
                background-color: #f0f7f4;
            }

            .image-dropzone mat-icon {
                font-size: 48px;
                width: 48px;
                height: 48px;
                color: #999;
            }

            .image-dropzone:hover mat-icon,
            .image-dropzone.dragover mat-icon {
                color: var(--sol-primary, #006633);
            }

            .image-dropzone span {
                color: #666;
                font-size: 0.875rem;
            }

            .image-dropzone small {
                color: #999;
                font-size: 0.75rem;
            }

            .image-preview {
                position: relative;
                display: inline-block;
                max-width: 300px;
            }

            .image-preview img {
                width: 100%;
                height: auto;
                border-radius: 8px;
                box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            }

            .remove-image-btn {
                position: absolute;
                top: 8px;
                right: 8px;
                background-color: rgba(0, 0, 0, 0.6);
                color: white;
            }

            .remove-image-btn:hover {
                background-color: rgba(0, 0, 0, 0.8);
            }

            .upload-progress {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                color: var(--sol-primary, #006633);
                font-size: 0.875rem;
            }

            .upload-error {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                color: #c62828;
                font-size: 0.875rem;
            }

            .upload-error mat-icon {
                font-size: 18px;
                width: 18px;
                height: 18px;
            }
        `,
    ],
})
export class ImageUploadComponent {
    readonly previewUrl = model<string>('');
    readonly state = model<ImageUploadState>({ status: 'idle' });

    readonly alt = input<string>('Image preview');
    readonly dropzoneText = input<string>(
        'Drag & drop an image or click to browse'
    );
    readonly supportedFormatsText = input<string>(
        'Supports JPG, PNG, WebP, GIF'
    );
    readonly uploadingText = input<string>('Uploading image...');
    readonly maxSizeBytes = input<number>(5 * 1024 * 1024); // 5MB default
    readonly allowedTypes = input<string[]>([
        'image/jpeg',
        'image/png',
        'image/webp',
        'image/gif',
    ]);

    readonly fileSelected = output<File>();
    readonly removed = output<void>();

    readonly isDragging = signal(false);

    readonly acceptTypes = computed(() => this.allowedTypes().join(','));

    readonly errorMessage = computed(() => {
        const currentState = this.state();
        return currentState.status === 'error' ? currentState.message : '';
    });

    onFileSelected(event: Event) {
        const input = event.target as HTMLInputElement;
        if (input.files?.length) {
            this.#handleFile(input.files[0]);
        }
        input.value = '';
    }

    onDragOver(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        this.isDragging.set(true);
    }

    onDragLeave(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        this.isDragging.set(false);
    }

    onDrop(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        this.isDragging.set(false);

        const files = event.dataTransfer?.files;
        if (files?.length) {
            this.#handleFile(files[0]);
        }
    }

    onRemove() {
        this.previewUrl.set('');
        this.state.set({ status: 'idle' });
        this.removed.emit();
    }

    #handleFile(file: File) {
        if (!this.allowedTypes().includes(file.type)) {
            this.state.set({
                status: 'error',
                message: 'Please select a valid image file',
            });
            return;
        }

        if (file.size > this.maxSizeBytes()) {
            const maxMB = Math.round(this.maxSizeBytes() / (1024 * 1024));
            this.state.set({
                status: 'error',
                message: `Image must be smaller than ${maxMB}MB`,
            });
            return;
        }

        this.state.set({ status: 'idle' });

        const reader = new FileReader();
        reader.onload = (e) => {
            this.previewUrl.set(e.target?.result as string);
            this.fileSelected.emit(file);
        };
        reader.readAsDataURL(file);
    }
}
