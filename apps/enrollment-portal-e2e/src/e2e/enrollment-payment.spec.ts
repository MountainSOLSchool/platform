import { test } from '@playwright/test';
import {
    EnrollmentPage,
    SAMPLE_STUDENT_INFO,
    SAMPLE_MEDICAL,
} from '../support/enrollment-page';
import { E2E_USERS } from '../support/test-users';
import { SEED } from '../support/seed';

/**
 * The paid happy path — runs ONLY against deployed dev (E2E_TARGET=dev).
 *
 * `enroll()` only skips Braintree when the final total is $0, so completing a
 * paid enrollment requires real payment. The emulator suite mocks Braintree at
 * the function level but can't tokenize a card client-side with a mock client
 * token, so it stops before payment (enrollment-variations.spec.ts). Here we
 * drive the Braintree Drop-in with a sandbox card end to end against the
 * deployed dev project, whose functions use Braintree **sandbox** credentials.
 */
const isDev = process.env['E2E_TARGET'] === 'dev';

test.describe('Paid enrollment (Braintree sandbox)', () => {
    test.skip(
        !isDev,
        'Runs only against deployed dev (real Braintree sandbox)'
    );

    test('completes a paid enrollment with a Braintree sandbox card', async ({
        page,
    }) => {
        const flow = new EnrollmentPage(page);
        await flow.goto();

        // Free class + the $25 paid add-on => $25 total => payment required.
        const addOnLabel = `${SEED.paidOptionDescription} ($${SEED.paidOptionCost})`;
        await flow.selectClassByName(SEED.freeClassName, [addOnLabel]);
        await flow.continue();
        await flow.signIn(E2E_USERS.fresh.email, E2E_USERS.fresh.password);
        await flow.continue();
        await flow.chooseNewStudent();
        await flow.continue();
        await flow.fillStudentInfo(SAMPLE_STUDENT_INFO);
        await flow.continue();
        await flow.fillMedical(SAMPLE_MEDICAL);
        await flow.continue();
        await flow.signReleases();
        await flow.continue();

        await flow.expectFinalTotal('$25.00');
        await flow.payWithSandboxCard();
        await flow.submit();
        // Braintree sandbox sale + enroll processing can run long on a cold dev
        // container, so allow more headroom than the $0 path.
        await flow.expectEnrolled(90_000);
    });
});
