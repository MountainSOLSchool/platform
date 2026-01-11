import { Injectable, inject } from '@angular/core';
import { declareFunction } from '@sol/angular/request';
import { FirebaseFunctionsService } from '@sol/firebase/functions-api';
import type {
    CreateClassRequest,
    CreateClassResponse,
    UpdateClassRequest,
    UpdateClassResponse,
    UploadClassImageRequest,
    UploadClassImageResponse,
} from '@sol/ts/firebase/api-types';

// Re-export types for consumers
export type {
    CreateClassRequest,
    CreateClassResponse,
    UpdateClassRequest,
    UpdateClassResponse,
    UploadClassImageRequest,
    UploadClassImageResponse,
};

/**
 * Central API service for all Mountain SOL Firebase Cloud Functions.
 *
 * This service provides typed, callable methods for all Firebase functions
 * used throughout the application. All function calls are strongly typed
 * with their request and response interfaces.
 *
 * @example
 * ```typescript
 * // Inject the service
 * readonly #api = inject(MountainSolApiService);
 *
 * // Call a function
 * this.#api.createClass({
 *     semesterId: '...',
 *     name: 'Math 101',
 *     // ...
 * }).subscribe(response => {
 *     console.log('Created class:', response.classId);
 * });
 * ```
 */
@Injectable({ providedIn: 'root' })
export class MountainSolApiService {
    readonly #functions = inject(FirebaseFunctionsService);

    // =========================================================================
    // Class Management
    // =========================================================================

    /**
     * Creates a new class in the specified semester.
     * Requires Admin role.
     */
    readonly createClass = declareFunction<
        CreateClassRequest,
        CreateClassResponse
    >(this.#functions, 'createClass');

    /**
     * Updates an existing class.
     * Requires Admin role.
     */
    readonly updateClass = declareFunction<
        UpdateClassRequest,
        UpdateClassResponse
    >(this.#functions, 'updateClass');

    /**
     * Uploads a class thumbnail image to Firebase Storage.
     * Returns the public URL of the uploaded image.
     * Requires Admin role.
     */
    readonly uploadClassImage = declareFunction<
        UploadClassImageRequest,
        UploadClassImageResponse
    >(this.#functions, 'uploadClassImage');
}
