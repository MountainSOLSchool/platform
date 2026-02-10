import { Functions, Role } from '@sol/firebase/functions';
import { DatabaseUtility } from '@sol/firebase/database';
import { validateClassForPublish } from '@sol/classes/domain';
import type {
    UpdateClassRequest,
    UpdateClassResponse,
} from '@sol/ts/firebase/api-types';
import admin from 'firebase-admin';

export type { UpdateClassRequest, UpdateClassResponse };

export const updateClass = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle<UpdateClassRequest>(async (request, response) => {
        const data = request.body.data;

        if (!data.semesterId) {
            response.status(400).send({ error: 'semesterId is required' });
            return;
        }

        if (!data.classId) {
            response.status(400).send({ error: 'classId is required' });
            return;
        }

        // Full validation only required when publishing (live = true)
        if (data.live) {
            const validation = validateClassForPublish({
                semesterId: data.semesterId,
                name: data.name,
                classType: data.classType,
                startDate: data.startDate,
                endDate: data.endDate,
                registrationEndDate: data.registrationEndDate,
                weekday: data.weekday,
                dailyTimes: data.dailyTimes,
                location: data.location,
                instructorIds: data.instructorIds,
            });

            if (!validation.valid) {
                response.status(400).send({
                    error: 'Validation failed',
                    errors: validation.errors,
                });
                return;
            }
        }

        const db = DatabaseUtility.getDatabase();
        const classRef = db.doc(
            `semesters/${data.semesterId}/classes/${data.classId}`
        );

        const existingDoc = await classRef.get();
        if (!existingDoc.exists) {
            response.status(404).send({ error: 'Class not found' });
            return;
        }

        const instructorRefs = (data.instructorIds ?? []).map((id) =>
            db.doc(`teachers/${id}`)
        );

        const updateData: Record<string, unknown> = {
            name: data.name || '',
            description: data.description || '',
            class_type: data.classType || '',
            grade_range_start: data.gradeRangeStart ?? 0,
            grade_range_end: data.gradeRangeEnd ?? 12,
            cost: data.cost ?? 0,
            location: data.location || '',
            instructors: instructorRefs,
            weekday: data.weekday || '',
            daily_times: data.dailyTimes || '',
            live: data.live ?? false,
            paused_for_enrollment: data.pausedForEnrollment ?? false,
            for_information_only: data.forInformationOnly ?? false,
            min_student_size: data.minStudentSize ?? 5,
            max_student_size: data.maxStudentSize ?? 12,
            thumbnailUrl: data.thumbnailUrl || '',
        };

        // Only set date fields if they have values, otherwise delete them
        if (data.startDate) {
            updateData['start'] = admin.firestore.Timestamp.fromDate(
                new Date(data.startDate)
            );
        } else {
            updateData['start'] = admin.firestore.FieldValue.delete();
        }
        if (data.endDate) {
            updateData['end'] = admin.firestore.Timestamp.fromDate(
                new Date(data.endDate)
            );
        } else {
            updateData['end'] = admin.firestore.FieldValue.delete();
        }
        if (data.registrationEndDate) {
            updateData['registration_end_date'] =
                admin.firestore.Timestamp.fromDate(
                    new Date(data.registrationEndDate)
                );
        } else {
            updateData['registration_end_date'] =
                admin.firestore.FieldValue.delete();
        }

        if (
            data.paymentRangeLowest !== undefined &&
            data.paymentRangeHighest !== undefined
        ) {
            updateData['payment_range_lowest'] = data.paymentRangeLowest;
            updateData['payment_range_highest'] = data.paymentRangeHighest;
        } else {
            updateData['payment_range_lowest'] =
                admin.firestore.FieldValue.delete();
            updateData['payment_range_highest'] =
                admin.firestore.FieldValue.delete();
        }

        if (data.unitIds && data.unitIds.length > 0) {
            const unitCollection = data.ageGroup
                ? `${data.ageGroup}_units`
                : 'units';
            updateData['units'] = data.unitIds.map((id) =>
                db.doc(`${unitCollection}/${id}`)
            );
        } else {
            updateData['units'] = admin.firestore.FieldValue.delete();
        }

        if (data.ageGroup) {
            updateData['age_group'] = data.ageGroup;
        } else {
            updateData['age_group'] = admin.firestore.FieldValue.delete();
        }

        if (data.additionalOptions && data.additionalOptions.length > 0) {
            updateData['additional_options'] = data.additionalOptions.map(
                (opt) => ({
                    id: opt.id,
                    description: opt.description,
                    cost: opt.cost,
                })
            );
        } else {
            updateData['additional_options'] =
                admin.firestore.FieldValue.delete();
        }

        await classRef.update(updateData);

        const result: UpdateClassResponse = {
            success: true,
        };

        response.send(result);
    });
