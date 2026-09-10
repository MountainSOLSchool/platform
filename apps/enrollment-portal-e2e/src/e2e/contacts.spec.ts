import { expect, test } from '@playwright/test';
import { ContactsPage } from '../support/contacts-page';
import { EnrollmentPage } from '../support/enrollment-page';
import { SEED } from '../support/seed';
import { E2E_USERS } from '../support/test-users';

/**
 * Admin Family Contact Lists (/admin/contacts), end to end: browser → callable
 * → Firestore.
 *
 * Assertions key off specific seeded addresses rather than total counts, so a
 * previous spec's enrollment adding a student to the semester can't shift them.
 */
test.describe('Admin family contact lists', () => {
    test.beforeEach(async ({ page, context }) => {
        // Copy for Bcc reads the real clipboard.
        await context.grantPermissions(['clipboard-read', 'clipboard-write']);

        await new EnrollmentPage(page).loginStandalone(
            E2E_USERS.admin.email,
            E2E_USERS.admin.password
        );
    });

    test('semester audience dedupes siblings and reaches unlisted classes', async ({
        page,
    }) => {
        const contacts = new ContactsPage(page);
        await contacts.goto();
        await contacts.select('Audience', 'A semester');
        await contacts.select('Semester', SEED.semesterDisplayName);
        await contacts.waitForResults();

        // Two siblings, one primary contact — one row, not two.
        await contacts.expectAddressListedOnce(SEED.siblingPrimaryEmail);

        // That family's only class is live: false. They still need emailing.
        await contacts.expectAddressListedOnce(SEED.unlistedPrimaryEmail);

        // Primary contacts only by default.
        await contacts.expectAddressAbsent(SEED.siblingSecondGuardianEmail);
    });

    test('guardian toggle adds second parents', async ({ page }) => {
        const contacts = new ContactsPage(page);
        await contacts.goto();
        await contacts.select('Audience', 'A semester');
        await contacts.select('Semester', SEED.semesterDisplayName);
        await contacts.waitForResults();
        await contacts.expectAddressAbsent(SEED.siblingSecondGuardianEmail);

        await contacts.setIncludeAllGuardians(true);
        await contacts.waitForResults();

        await contacts.expectAddressListedOnce(SEED.siblingSecondGuardianEmail);
        // The primary must not double up now that guardians[] also carries it.
        await contacts.expectAddressListedOnce(SEED.siblingPrimaryEmail);
    });

    test('class audience is scoped to the chosen class', async ({ page }) => {
        const contacts = new ContactsPage(page);
        await contacts.goto();
        await contacts.select('Audience', 'A single class');
        await contacts.select('Semester', SEED.semesterDisplayName);
        await contacts.select('Class', SEED.contactsClassName);
        await contacts.waitForResults();

        await expect(contacts.rows()).toHaveCount(1);
        await contacts.expectAddressListedOnce(SEED.siblingPrimaryEmail);
        await contacts.expectAddressAbsent(SEED.unlistedPrimaryEmail);
    });

    test('copies a Bcc-ready list to the clipboard', async ({ page }) => {
        const contacts = new ContactsPage(page);
        await contacts.goto();
        await contacts.select('Audience', 'A single class');
        await contacts.select('Semester', SEED.semesterDisplayName);
        await contacts.select('Class', SEED.contactsClassName);
        await contacts.waitForResults();

        const clipboard = await contacts.copyForBcc();

        // Gmail chips `Name <address>` on paste, so the name has to survive.
        expect(clipboard).toBe(
            `${SEED.siblingPrimaryName} <${SEED.siblingPrimaryEmail}>`
        );
    });

    test('recently-enrolled audience finds the seeded enrollment', async ({
        page,
    }) => {
        const contacts = new ContactsPage(page);
        await contacts.goto();
        await contacts.select('Audience', 'Recently enrolled');
        await contacts.select('Enrolled within', 'The last two years');
        await contacts.waitForResults();

        // seedExistingEnrollment back-dates its timestamp three years, so the
        // window must exclude it — proving the cutoff is applied at all.
        await contacts.expectAddressAbsent('parent@e2e.test');
    });
});
