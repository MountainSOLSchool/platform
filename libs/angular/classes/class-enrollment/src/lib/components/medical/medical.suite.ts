import { create, enforce, group, test } from 'vest';
import { StudentForm } from '@sol/student/domain';

export const createMedicalSuite = () =>
    create(
        (
            student: Partial<StudentForm>,
            accuracyCheck: {
                isOutOfDate: boolean;
                accuracyConfirmations: Record<string, boolean>;
            }
        ) => {
            group('contacts', () => {
                test(
                    'confirmedAccuracyContacts',
                    'Please confirm this section is up-to-date or make necessary changes',
                    () => {
                        if (accuracyCheck.isOutOfDate) {
                            enforce(
                                accuracyCheck.accuracyConfirmations['contacts']
                            ).isTruthy();
                        }
                    }
                );

                student.emergencyContacts?.forEach((contact, i) => {
                    test(`contact_${i}_name`, 'Name is required', () => {
                        enforce(contact.name).isNotEmpty();
                    });

                    test(`contact_${i}_phone`, 'Phone is required', () => {
                        enforce(contact.phone).isNotEmpty();
                    });

                    test(
                        `contact_${i}_relationship`,
                        'Relationship is required',
                        () => {
                            enforce(contact.relationship).isNotEmpty();
                        }
                    );
                });
            });
            group('health', () => {
                test(
                    'confirmedAccuracyHealth',
                    'Please confirm this section is up-to-date or make necessary changes',
                    () => {
                        if (accuracyCheck.isOutOfDate) {
                            enforce(
                                accuracyCheck.accuracyConfirmations['health']
                            ).isTruthy();
                        }
                    }
                );

                test('weight', 'Weight is required', () => {
                    enforce(student.weightImperial).isNotEmpty();
                });

                test('heightFeet', 'Height (ft) is required', () => {
                    enforce(student.heightFeet).isNotEmpty();
                });

                test('heightInches', 'Height (in) is required', () => {
                    enforce(student.heightInches).isNotEmpty();
                });

                test('doctorName', "Doctor's name is required", () => {
                    enforce(student.doctorName).isNotBlank();
                });

                test('doctorPhone', "Doctor's phone is required", () => {
                    enforce(student.doctorPhone).isNotEmpty();
                });

                test('insuranceCompany', 'Insurance name is required', () => {
                    enforce(student.insuranceCompany).isNotEmpty();
                });

                test('insuranceId', 'Insurance ID is required', () => {
                    enforce(student.insuranceId).isNotEmpty();
                });

                test(
                    'hasLifeThreateningAllergies',
                    'Must select an option',
                    () => {
                        enforce(
                            student.hasLifeThreateningAllergies
                        ).isNotUndefined();
                    }
                );

                group('medications', () => {
                    student.medications?.forEach((medication, i) => {
                        test(
                            `medication_${i}_name`,
                            'Medication name is required',
                            () => {
                                enforce(medication.name).isNotEmpty();
                            }
                        );
                        test(
                            `medication_${i}_dosage`,
                            'Medication dosage is required',
                            () => {
                                enforce(medication.dosage).isNotEmpty();
                            }
                        );
                        test(
                            `medication_${i}_doctor`,
                            'Prescribing doctor is required',
                            () => {
                                enforce(medication.doctor).isNotEmpty();
                            }
                        );
                    });
                });

                test(
                    'authorizedToAdministerMedication',
                    'Medication authorization selection is required',
                    () => {
                        enforce(
                            student.authorizedToAdministerMedication
                        ).isNotEmpty();
                    }
                );
            });
        }
    );
