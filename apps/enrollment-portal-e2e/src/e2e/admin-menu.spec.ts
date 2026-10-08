import { expect, test } from '@playwright/test';
import { EnrollmentPage } from '../support/enrollment-page';
import { E2E_USERS } from '../support/test-users';

/**
 * The header's admin menu is driven by the `roles` callable. Signing out must
 * hide it without a reload — the role stream used to drop the signed-out
 * emission and keep the last admin value.
 */
test.describe('Header admin menu', () => {
    test('disappears after sign-out', async ({ page }) => {
        await new EnrollmentPage(page).loginStandalone(
            E2E_USERS.admin.email,
            E2E_USERS.admin.password
        );

        const adminMenu = page.getByRole('button', {
            name: 'Toggle admin menu',
        });
        await expect(adminMenu).toBeVisible();

        await page.getByRole('button', { name: 'User menu' }).click();
        await page.getByRole('menuitem', { name: 'Sign Out' }).click();

        await expect(page).toHaveURL(/\/user\/login$/);
        await expect(adminMenu).toBeHidden();
        await expect(page.getByRole('link', { name: 'Sign In' })).toBeVisible();
    });
});
