import { test, expect } from '@playwright/test';
import {
    EnrollmentPage,
    SAMPLE_STUDENT_INFO,
    SAMPLE_MEDICAL,
} from '../support/enrollment-page';
import { E2E_USERS } from '../support/test-users';
import { SEED, clearEnrollmentDrafts } from '../support/seed';

test.describe('Enrollment flow', () => {
    // A prior flow can leave an autosaved per-user draft that would reload here;
    // clear it so each run starts from a clean enrollment.
    test.beforeEach(async () => {
        await clearEnrollmentDrafts();
    });

    test('lists the seeded free class', async ({ page }) => {
        const flow = new EnrollmentPage(page);
        await flow.goto();
        await expect(
            page.getByText(SEED.freeClassName, { exact: false })
        ).toBeVisible();
    });

    test('enrolls a new student in a free ($0) class', async ({ page }) => {
        const flow = new EnrollmentPage(page);
        await flow.goto();
        await flow.selectClassByName(SEED.freeClassName);
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
        await flow.submit();
        await flow.expectEnrolled();
    });
});
