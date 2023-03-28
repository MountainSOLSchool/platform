import { AuthUtility, Functions } from '@sol/firebase/functions';
import { Braintree } from '@sol/payments/braintree';
import { NewStudentDbEntry, StudentForm } from '@sol/student/domain';
import {
    DiscountRepository,
    SemesterRepository,
    SUMMER_2023_SEMESTER,
} from '@sol/classes/repository';
import { Discount, EnrollmentUtility } from '@sol/classes/domain';
import { ClassEnrollmentRepository } from '@sol/classes/enrollment/repository';
import { Transaction, ValidationErrorsCollection } from 'braintree';
import { StudentRepository } from '@sol/student/repository';

function _mapStudentFormToStudentDbEntry(form: StudentForm): NewStudentDbEntry {
    const entry: NewStudentDbEntry = {
        first_name: form.firstName,
        last_name: form.lastName,
        code_word: form.pickupCodeword,
        primary_email: form.contactEmail,
        primary_first_name: form.contactFirstName,
        primary_last_name: form.contactLastName,
        ok_to_photograph:
            form.photography === 'yes' || form.photography === 'yesNoName',
        ok_use_name_photographs: form.photography === 'yes',
        ok_deet_bugspray: form.deetBugspray,
        ok_sunscreen: form.sunscreen,
        ok_natural_bugspray: form.naturalBugspray,
        birth_date: form.birthdate,
        emergency_contacts: form.emergencyContacts.map((c) => ({
            first_name: c.name,
            last_name: 'string',
            relationship: c.relationship,
            phone: c.phone,
            email: '',
        })),
        authorized_pick_up_contacts:
            form.authorizedForPickup?.map((c) => ({
                first_name: c.name,
                last_name: 'string',
                relationship: c.relationship,
                phone: c.phone,
                email: '',
            })) ?? [],
        allergies: form.allergies ?? '',
        medications: form.medications ?? [],
        tshirt_size: form.tshirtSize,
        pronouns: form.pronouns,
        weightPounds: form.weightImperial,
        heightFeet: form.heightFeet,
        heightInches: form.heightInches,
        primary_phone: form.contactPhone,
        student_email: form.studentEmail,
        student_phone: form.studentPhone,
        student_address: form.address,
        student_city: form.city,
        student_state: form.state,
        student_zip: form.zip,
        school: form.school,
        guardians: form.guardians.map((g) => ({
            first_name: g.guardianName,
            last_name: '',
            email: g.guardianEmail,
            phone: g.guardianPhone,
            relationship: g.guardianRelationship,
            resides_with_student: g.guardianResidesWithStudent,
        })),
        has_life_threatening_allergies: form.hasLifeThreateningAllergies,
        authorized_to_administer_meds: form.authorizedToAdministerMedication,
        medical_notes: form.medicalNotes ?? '',
        insurance_company: form.insuranceCompany,
        insurance_id: form.insuranceId,
        does_not_have_insurance: form.doesNotHaveInsurance,
        doctor: form.doctorName,
        doctor_phone: form.doctorPhone,
        parent_notes: form.notes,
        medical_release_signature: form.medicalReleaseSignature,
        medical_release_signature_date: new Date().getUTCDate().toString(),
        release_of_liability_signature: form.releaseOfLiabilitySignature,
        release_of_liability_signature_date: new Date().getUTCDate().toString(),
    };
    return entry;
}

export const enroll = Functions.endpoint
    .usingSecrets(...Braintree.SECRET_NAMES)
    .usingStrings(...Braintree.STRING_NAMES)
    .handle<{
        selectedClasses: Array<string>;
        selectedClassGroups: Array<string>;
        student: StudentForm;
        discountCodes: Array<string>;
        paymentMethod: { nonce: string; deviceData: string };
        isSignedUpForSolsticeEmails: boolean;
    }>(async (request, response, secrets, strings) => {
        const user = await AuthUtility.getUserFromRequest(request, response);

        if (!user) {
            response.status(401).send({ error: 'User not found' });
            return;
        }

        const {
            selectedClasses,
            student,
            discountCodes,
            paymentMethod: { nonce, deviceData },
            isSignedUpForSolsticeEmails,
        } = request.body.data;

        const semester = SemesterRepository.of(SUMMER_2023_SEMESTER);

        const classesRepository = semester.classes;

        const classes = await classesRepository.getMany(selectedClasses);

        const classGroups = await SemesterRepository.of(
            SUMMER_2023_SEMESTER
        ).groups.getByClassIds(selectedClasses);

        const discounts = (
            await Promise.all(
                discountCodes.map(
                    async (code) => await DiscountRepository.get(code)
                )
            )
        ).filter((d): d is Discount<unknown> => !!d);

        const { finalTotal, discountAmounts } =
            EnrollmentUtility.getEnrollmentCost(
                discounts,
                classes,
                classGroups
            );

        const enrollmentRecord = {
            userId: user.uid,
            studentName: `${student.firstName} ${student.lastName}`,
            contactEmail: student.contactEmail,
            finalCost: finalTotal,
            discountIds: discounts
                .map((d) => d.id)
                .filter((d): d is string => !!d),
            discounts: discountAmounts.map((da) => ({
                description: da.code,
                amount: da.amount,
            })),
            classIds: classes.map((c) => c.id),
            isSignedUpForSolsticeEmails,
        };

        const studentEnrollmentId = await ClassEnrollmentRepository.create({
            ...enrollmentRecord,
            status: 'pending',
        });

        const braintree = new Braintree(secrets, strings);

        let success: boolean;
        let transaction: Transaction | undefined;
        let errors: ValidationErrorsCollection | undefined;
        if (finalTotal > 0) {
            const {
                success: transactionSuccess,
                transaction: theTransaction,
                errors: transactionErrors,
            } = await braintree.transact({
                amount: finalTotal,
                nonce,
                customer: { email: enrollmentRecord.contactEmail },
                deviceData,
            });
            success = transactionSuccess;
            transaction = theTransaction;
            errors = transactionErrors;
        } else {
            success = true;
        }

        if (success) {
            const studentRef = await StudentRepository.create(
                _mapStudentFormToStudentDbEntry(student)
            );

            await ClassEnrollmentRepository.create({
                ...enrollmentRecord,
                relatedId: studentEnrollmentId,
                studentId: studentRef.id,
                transactionId: transaction?.id ?? '',
                status: 'enrolled',
                medicalReleaseSignature: student.medicalReleaseSignature,
                releaseOfLiabilitySignature:
                    student.releaseOfLiabilitySignature,
            });

            await Promise.all(
                classes.map(async (c) => {
                    await classesRepository.addStudentToClass(
                        studentRef.id,
                        c.id
                    );
                })
            );

            response.send({
                success,
                email: student.contactEmail,
            });
        } else {
            await ClassEnrollmentRepository.create({
                ...enrollmentRecord,
                relatedId: studentEnrollmentId,
                status: 'failed',
                failures: errors?.deepErrors().map((e) => e.message) ?? [],
                releaseOfLiabilitySignature:
                    student.releaseOfLiabilitySignature,
                medicalReleaseSignature: student.medicalReleaseSignature,
            });
            response.send({ success, errors: errors?.deepErrors() ?? [] });
        }
    });
