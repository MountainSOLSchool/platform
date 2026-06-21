import { test, expect } from '@playwright/test';
import {
    EnrollmentPage,
    SAMPLE_STUDENT_INFO,
    SAMPLE_MEDICAL,
} from '../support/enrollment-page';
import { E2E_USERS } from '../support/test-users';
import {
    SEED,
    clearEnrollmentDrafts,
    readAddendumEnrollmentId,
} from '../support/seed';

/**
 * Variation coverage on top of the basic $0 happy path (enrollment.spec.ts):
 *   1. Additional (paid) option   -> confirmation cost reflects the add-on
 *   2. Discount code              -> confirmation total drops by 10%
 *   3. Stale student review       -> out-of-date acknowledge + confirm-accuracy
 *   4. Addendum                   -> existing class is locked / can't be removed
 *
 * Tests 1 & 2 deliberately stop at the Confirm Enrollment step WITHOUT
 * submitting: enroll() only skips Braintree when finalTotal === 0, so a paid
 * add-on or a discount on a paid class cannot complete hermetically. We assert
 * the displayed cost / discount behaviour instead.
 */

/** Walk a fresh new-student enrollment up to (not through) the Confirm step. */
async function fillNewStudentThroughReleases(
    flow: EnrollmentPage
): Promise<void> {
    await flow.continue(); // Class Selection -> Account
    await flow.signIn(E2E_USERS.fresh.email, E2E_USERS.fresh.password);
    await flow.continue(); // Account -> Student Selection
    await flow.chooseNewStudent();
    await flow.continue(); // Student Selection -> Student Info
    await flow.fillStudentInfo(SAMPLE_STUDENT_INFO);
    await flow.continue(); // Student Info -> Medical
    await flow.fillMedical(SAMPLE_MEDICAL);
    await flow.continue(); // Medical -> Releases
    await flow.signReleases();
    await flow.continue(); // Releases -> Confirm Enrollment
}

test.describe('Enrollment variations', () => {
    // Each fixed-user flow can leave an autosaved draft; clear before each test.
    test.beforeEach(async () => {
        await clearEnrollmentDrafts();
    });

    test('reflects a paid additional option in the confirmation cost', async ({
        page,
    }) => {
        const flow = new EnrollmentPage(page);
        await flow.goto();

        // The add-on checkbox label is "{description} (${cost})"
        // (additional-options-form.component.ts:32). For the seeded option that
        // is "E2E Before Care 8am-9am ($25)".
        const addOnLabel = `${SEED.paidOptionDescription} ($${SEED.paidOptionCost})`;
        await flow.selectClassByName(SEED.freeClassName, [addOnLabel]);

        await fillNewStudentThroughReleases(flow);

        // The $25 add-on is the only cost, so the confirmation Final Total is
        // $25.00 and a payment method is now required.
        await flow.expectFinalTotal('$25.00');
        await expect(
            page.getByText('No payment method is required at this time.')
        ).toHaveCount(0);

        // Do NOT submit — payment is required for a non-zero total.
    });

    test('applies a percentage discount code to a paid class total', async ({
        page,
    }) => {
        const flow = new EnrollmentPage(page);
        await flow.goto();

        // $100 paid class -> 10% code (E2ESAVE10) nets a meaningful $90 total.
        await flow.selectClassByName(SEED.paidClassName);
        await fillNewStudentThroughReleases(flow);

        // Baseline total before any discount.
        await flow.expectFinalTotal('$100.00');

        await flow.applyDiscountCode(SEED.discountCode);
        await flow.expectDiscountApplied(SEED.discountCode);

        // 10% off $100 -> $90.00.
        await flow.expectFinalTotal('$90.00');

        // Do NOT submit — non-zero total requires Braintree.
    });

    test('prompts to review a stale student before enrolling', async ({
        page,
    }) => {
        const flow = new EnrollmentPage(page);
        await flow.goto();

        await flow.selectClassByName(SEED.freeClassName);
        await flow.continue(); // Class Selection -> Account
        await flow.signIn(E2E_USERS.stale.email, E2E_USERS.stale.password);
        await flow.continue(); // Account -> Student Selection

        // The pre-seeded stale student is selectable by name.
        await flow.chooseExistingStudent(SEED.existingStudentName);
        await flow.continue(); // Student Selection -> Student Info

        // Because the student's info is >2yr stale, the Student Info step shows
        // the out-of-date acknowledgement prompt and, once acknowledged, the
        // per-section "confirm accuracy" checkboxes.
        await flow.expectOutOfDateReview();
        await flow.startReviewingAndExpectConfirmAccuracy();
    });

    test('locks the existing class in addendum mode', async ({ page }) => {
        const flow = new EnrollmentPage(page);

        // Addendum requires an authenticated owner; the addendum route
        // auto-completes the Account step, so sign in via the standalone page
        // first (same browser context -> Firebase Auth persists).
        await flow.loginStandalone(
            E2E_USERS.addendum.email,
            E2E_USERS.addendum.password
        );

        const enrollmentId = readAddendumEnrollmentId();
        await flow.gotoAddendum(enrollmentId);

        await flow.expectAddendumLocked(SEED.freeClassName);
    });
});
