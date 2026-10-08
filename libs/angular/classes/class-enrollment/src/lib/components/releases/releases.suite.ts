import { create, enforce, group, test } from 'vest';

export const createReleasesSuite = () =>
    create(
        (enrollment: {
            releaseSignatures: Array<{ name: string; signature: string }>;
        }) => {
            group('healthRelease', () => {
                test('medicalReleaseSignature', 'Must sign to continue', () => {
                    enforce(
                        enrollment.releaseSignatures.find(
                            ({ name }) => name === 'MEDICAL_RELEASE_FALL_2023'
                        )?.signature
                    ).isNotBlank();
                });
            });

            group('liabilityRelease', () => {
                test(
                    'releaseOfLiabilitySignature',
                    'Must sign to continue',
                    () => {
                        enforce(
                            enrollment.releaseSignatures.find(
                                ({ name }) =>
                                    name === 'LIABILITY_RELEASE_FALL_2023'
                            )?.signature
                        ).isNotBlank();
                    }
                );
            });
        }
    );
