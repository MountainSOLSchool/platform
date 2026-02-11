import { Functions } from '@sol/firebase/functions';
import { Braintree } from '@sol/payments/braintree';
import { DatabaseUtility } from '@sol/firebase/database';
import admin from 'firebase-admin';
import type { MedicEnrollRequest, MedicEnrollResponse } from '@sol/ts/firebase/api-types';
import { MedicPaymentHandler } from '@sol/firebase/payments';

export const enrollMedic = Functions.endpoint
    .usingSecrets(...Braintree.SECRET_NAMES)
    .usingStrings(...Braintree.STRING_NAMES)
    .handle<MedicEnrollRequest>(async (request, response, secrets, strings) => {
        const data = request.body.data;
        const db = DatabaseUtility.getDatabase();

        const classRef = db.collection('medic_classes').doc(data.classId);
        const classDoc = await classRef.get();

        if (!classDoc.exists) {
            response.status(404).send({ success: false, error: 'Class not found' });
            return;
        }

        const classData = classDoc.data()!;

        if (classData.status !== 'published') {
            response.status(400).send({ success: false, error: 'Class is not available for enrollment' });
            return;
        }

        if (classData.enrolledCount >= classData.maxStudents) {
            response.status(400).send({ success: false, error: 'Class is full' });
            return;
        }

        try {
            const braintree = new Braintree(secrets, strings);
            const handler = new MedicPaymentHandler(braintree, {
                className: classData.name,
                location: classData.location || '',
                date: classData.date || '',
                time: classData.time || '',
            });

            const paymentResult = await handler.handle({
                amount: classData.cost,
                paymentMethodNonce: data.paymentMethodNonce,
                deviceData: data.deviceData,
                paymentMethodType: data.paymentMethodType,
                payerName: data.studentName,
                payerEmail: data.studentEmail,
            });

            if (!paymentResult.success) {
                response.status(400).send({
                    success: false,
                    error: paymentResult.message,
                });
                return;
            }

            const enrollmentDoc = {
                classId: data.classId,
                className: classData.name,
                studentName: data.studentName,
                studentEmail: data.studentEmail,
                transactionId: paymentResult.transactionId,
                amount: classData.cost,
                status: 'enrolled',
                timestamp: admin.firestore.FieldValue.serverTimestamp(),
            };

            const enrollmentRef = await db.collection('medic_enrollments').add(enrollmentDoc);

            await classRef.update({
                enrolledCount: admin.firestore.FieldValue.increment(1),
            });

            const result: MedicEnrollResponse = {
                success: true,
                enrollmentId: enrollmentRef.id,
                transactionId: paymentResult.transactionId,
            };

            response.send(result);
        } catch (error) {
            console.error('Error processing medic enrollment:', error);

            if (error instanceof Error && error.message.includes('token_issuance')) {
                response.status(503).send({
                    success: false,
                    error: 'Temporary payment processing issue. Please try again.',
                });
            } else {
                response.status(500).send({
                    success: false,
                    error: 'An unexpected error occurred while processing your enrollment.',
                });
            }
        }
    });
