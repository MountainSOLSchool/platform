import { create, test, enforce, group } from 'vest';
import { StudentForm } from '@sol/student/domain';

export const createInfoSuite = () =>
    create(
        (
            student: Partial<StudentForm>,
            accuracyCheck: {
                isOutOfDate: boolean;
                accuracyConfirmations: Record<string, boolean>;
            }
        ) => {
            group('student', () => {
                test(
                    'confirmedAccuracyStudent',
                    'Please confirm this section is up-to-date or make necessary changes',
                    () => {
                        if (accuracyCheck.isOutOfDate) {
                            enforce(
                                accuracyCheck.accuracyConfirmations['student']
                            ).isTruthy();
                        }
                    }
                );

                test('firstName', 'First name is required', () => {
                    enforce(student.firstName).isNotEmpty();
                });

                test('lastName', 'Last name is required', () => {
                    enforce(student.lastName).isNotEmpty();
                });

                test('birthdate', 'Birthdate is required', () => {
                    enforce(student.birthdate).isNotBlank();
                });

                test('pronouns', 'Pronouns are required', () => {
                    enforce(student.pronouns).isNotEmpty();
                });

                test('school', 'School is required', () => {
                    enforce(student.school).isNotEmpty();
                });

                test('tshirtSize', 'T-shirt size is required', () => {
                    enforce(student.tshirtSize).isNotEmpty();
                });
            });

            group('contact', () => {
                test(
                    'confirmedAccuracyContact',
                    'Please confirm this section is up-to-date or make necessary changes',
                    () => {
                        if (accuracyCheck.isOutOfDate) {
                            enforce(
                                accuracyCheck.accuracyConfirmations['contact']
                            ).isTruthy();
                        }
                    }
                );

                test('contactFirstName', 'First name is required', () => {
                    enforce(student.contactFirstName).isNotEmpty();
                });

                test('contactLastName', 'Last name is required', () => {
                    enforce(student.contactLastName).isNotEmpty();
                });

                test('contactEmail', 'Email is required', () => {
                    enforce(student.contactEmail).isNotEmpty();
                });

                test('contactPhone', 'Phone is required', () => {
                    enforce(student.contactPhone).isNotEmpty();
                });

                test('address', 'Address is required', () => {
                    enforce(student.address).isNotEmpty();
                });

                test('city', 'City is required', () => {
                    enforce(student.city).isNotEmpty();
                });

                test('state', 'State is required', () => {
                    enforce(student.state).isNotEmpty();
                });

                test('zip', 'Zip is required', () => {
                    enforce(student.zip).isNotEmpty();
                });
            });

            group('privacy', () => {
                test(
                    'confirmedAccuracyPrivacy',
                    'Please confirm this section is up-to-date or make necessary changes',
                    () => {
                        if (accuracyCheck.isOutOfDate) {
                            enforce(
                                accuracyCheck.accuracyConfirmations['privacy']
                            ).isTruthy();
                        }
                    }
                );

                test('photography', 'Photography privacy is required', () => {
                    enforce(student.photography).isNotUndefined();
                });
                test('deetspray', 'DEET bug spray choice is required', () => {
                    enforce(student.deetBugspray).isNotUndefined();
                });
                test(
                    'naturalspray',
                    'Natural bug spray choice is required',
                    () => {
                        enforce(student.naturalBugspray).isNotUndefined();
                    }
                );
                test('sunscreen', 'Sunscreen choice is required', () => {
                    enforce(student.sunscreen).isNotUndefined();
                });
            });

            group('guardians', () => {
                test(
                    'confirmedAccuracyGuardians',
                    'Please confirm this section is up-to-date or make necessary changes',
                    () => {
                        if (accuracyCheck.isOutOfDate) {
                            enforce(
                                accuracyCheck.accuracyConfirmations['guardians']
                            ).isTruthy();
                        }
                    }
                );

                student.guardians?.forEach((guardian, i) => {
                    test(`guardian_${i}_name`, 'Name is required', () => {
                        enforce(guardian.guardianName).isNotEmpty();
                    });

                    test(`guardian_${i}_email`, 'Email is required', () => {
                        enforce(guardian.guardianEmail).isNotEmpty();
                    });

                    test(`guardian_${i}_phone`, 'Phone is required', () => {
                        enforce(guardian.guardianPhone).isNotEmpty();
                    });

                    test(
                        `guardian_${i}_relationship`,
                        'Relationship is required',
                        () => {
                            enforce(guardian.guardianRelationship).isNotEmpty();
                        }
                    );

                    test(
                        `guardian_${i}_residence`,
                        'Residence is required',
                        () => {
                            enforce(
                                guardian.guardianResidesWithStudent
                            ).isNotUndefined();
                        }
                    );
                });
            });

            group('pickup', () => {
                test(
                    'confirmedAccuracyPickup',
                    'Please confirm this section is up-to-date or make necessary changes',
                    () => {
                        if (accuracyCheck.isOutOfDate) {
                            enforce(
                                accuracyCheck.accuracyConfirmations['pickup']
                            ).isTruthy();
                        }
                    }
                );

                test('codeword', 'Codeword is required', () => {
                    enforce(student.pickupCodeword).isNotEmpty();
                });

                student.authorizedForPickup?.forEach((pickup, i) => {
                    test(`pickup_${i}_name`, 'Name is required', () => {
                        enforce(pickup.name).isNotEmpty();
                    });

                    test(
                        `pickup_${i}_relationship`,
                        'Relationship is required',
                        () => {
                            enforce(pickup.relationship).isNotEmpty();
                        }
                    );
                    test(`pickup_${i}_phone`, 'Phone is required', () => {
                        enforce(pickup.phone).isNotEmpty();
                    });
                });
            });
        }
    );
