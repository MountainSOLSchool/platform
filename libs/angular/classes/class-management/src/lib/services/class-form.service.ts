import { Injectable, inject } from '@angular/core';
import { Observable, of, switchMap, map, catchError } from 'rxjs';
import {
    MountainSolApiService,
    CreateClassRequest,
    UpdateClassRequest,
    UploadClassImageRequest,
} from '@sol/angular/firebase/api';

export type ClassFormData = Omit<CreateClassRequest, 'minStudentSize' | 'maxStudentSize'> & {
    minStudentSize: number;
    maxStudentSize: number;
    pausedForEnrollment: boolean;
};

export interface ImageUploadData {
    file: File;
    semesterId: string;
    classId?: string;
}

export type SubmitResult =
    | { success: true; classId: string }
    | { success: false; error: string };

export type ImageUploadResult =
    | { success: true; url: string }
    | { success: false; error: string };

@Injectable({ providedIn: 'root' })
export class ClassFormService {
    readonly #api = inject(MountainSolApiService);

    uploadImage(data: ImageUploadData): Observable<ImageUploadResult> {
        const request: Omit<UploadClassImageRequest, 'imageBase64'> & { imageBase64?: string } = {
            semesterId: data.semesterId,
            classId: data.classId,
            contentType: data.file.type,
        };

        return this.#readFileAsBase64(data.file).pipe(
            switchMap((base64) =>
                this.#api.uploadClassImage({
                    ...request,
                    imageBase64: base64,
                } satisfies UploadClassImageRequest)
            ),
            map((result) =>
                result.success
                    ? { success: true as const, url: result.url }
                    : { success: false as const, error: 'Upload failed' }
            ),
            catchError((err) =>
                of({
                    success: false as const,
                    error: err?.message ?? 'Failed to upload image',
                })
            )
        );
    }

    createClass(data: ClassFormData): Observable<SubmitResult> {
        const request: CreateClassRequest = {
            semesterId: data.semesterId,
            name: data.name,
            description: data.description,
            classType: data.classType,
            gradeRangeStart: data.gradeRangeStart,
            gradeRangeEnd: data.gradeRangeEnd,
            cost: data.cost,
            paymentRangeLowest: data.paymentRangeLowest,
            paymentRangeHighest: data.paymentRangeHighest,
            location: data.location,
            instructorIds: data.instructorIds,
            weekday: data.weekday,
            dailyTimes: data.dailyTimes,
            startDate: data.startDate,
            endDate: data.endDate,
            registrationEndDate: data.registrationEndDate,
            minStudentSize: data.minStudentSize,
            maxStudentSize: data.maxStudentSize,
            thumbnailUrl: data.thumbnailUrl,
            live: data.live,
            forInformationOnly: data.forInformationOnly,
            unitIds: data.unitIds,
            ageGroup: data.ageGroup,
        };

        return this.#api.createClass(request).pipe(
            map((result) =>
                result.success
                    ? { success: true as const, classId: result.classId }
                    : { success: false as const, error: 'Failed to create class' }
            ),
            catchError((err) =>
                of({
                    success: false as const,
                    error: err?.message ?? 'An unexpected error occurred',
                })
            )
        );
    }

    updateClass(classId: string, data: ClassFormData): Observable<SubmitResult> {
        const request: UpdateClassRequest = {
            classId,
            semesterId: data.semesterId,
            name: data.name,
            description: data.description,
            classType: data.classType,
            gradeRangeStart: data.gradeRangeStart,
            gradeRangeEnd: data.gradeRangeEnd,
            cost: data.cost,
            paymentRangeLowest: data.paymentRangeLowest,
            paymentRangeHighest: data.paymentRangeHighest,
            location: data.location,
            instructorIds: data.instructorIds,
            weekday: data.weekday,
            dailyTimes: data.dailyTimes,
            startDate: data.startDate,
            endDate: data.endDate,
            registrationEndDate: data.registrationEndDate,
            minStudentSize: data.minStudentSize,
            maxStudentSize: data.maxStudentSize,
            thumbnailUrl: data.thumbnailUrl,
            live: data.live,
            pausedForEnrollment: data.pausedForEnrollment,
            forInformationOnly: data.forInformationOnly,
            unitIds: data.unitIds,
            ageGroup: data.ageGroup,
        };

        return this.#api.updateClass(request).pipe(
            map((result) =>
                result.success
                    ? { success: true as const, classId }
                    : { success: false as const, error: 'Failed to update class' }
            ),
            catchError((err) =>
                of({
                    success: false as const,
                    error: err?.message ?? 'An unexpected error occurred',
                })
            )
        );
    }

    submitWithImage(params: {
        formData: ClassFormData;
        pendingImageFile?: File;
        existingClassId?: string;
    }): Observable<SubmitResult> {
        const { formData, pendingImageFile, existingClassId } = params;

        if (pendingImageFile) {
            return this.uploadImage({
                file: pendingImageFile,
                semesterId: formData.semesterId,
                classId: existingClassId,
            }).pipe(
                switchMap((uploadResult) => {
                    if (!uploadResult.success) {
                        return of(uploadResult);
                    }
                    const dataWithImage = {
                        ...formData,
                        thumbnailUrl: uploadResult.url,
                    };
                    return existingClassId
                        ? this.updateClass(existingClassId, dataWithImage)
                        : this.createClass(dataWithImage);
                })
            );
        }

        return existingClassId
            ? this.updateClass(existingClassId, formData)
            : this.createClass(formData);
    }

    #readFileAsBase64(file: File): Observable<string> {
        return new Observable<string>((subscriber) => {
            const reader = new FileReader();
            reader.onload = () => {
                const result = reader.result as string;
                const base64 = result.split(',')[1];
                subscriber.next(base64);
                subscriber.complete();
            };
            reader.onerror = () => {
                subscriber.error(new Error('Failed to read file'));
            };
            reader.readAsDataURL(file);
        });
    }
}
