import { expect, Locator, Page } from '@playwright/test';

/**
 * Page object for the admin Family Contact Lists screen (/admin/contacts).
 *
 * The page renders `sol-contact-audiences-view`: a row of mat-selects (Audience,
 * then a context-dependent second select), a "Include every guardian's email"
 * slide toggle, a count, a scrollable list of `.contact-row` entries, and a
 * "Copy for Bcc" button.
 */
export class ContactsPage {
    constructor(private readonly page: Page) {}

    async goto(): Promise<void> {
        await this.page.goto('/admin/contacts', {
            waitUntil: 'domcontentloaded',
        });
        await expect(
            this.page.getByRole('heading', { name: 'Family Contact Lists' })
        ).toBeVisible();
    }

    /**
     * Pick an option from the mat-select carrying the given mat-label.
     *
     * Selected by accessible name rather than by filtering form fields on text:
     * once "A semester" is chosen, the Audience field itself contains the words
     * "semester" and "class", which makes a text filter ambiguous.
     */
    async select(label: string, optionText: string): Promise<void> {
        const combobox = this.page.getByRole('combobox', { name: label });
        const option = this.page.getByRole('option', {
            name: optionText,
            exact: true,
        });

        // The field only exists once the audience kind that needs it is chosen.
        await expect(combobox).toBeVisible();

        // Two things can leave the panel without the option we want: the click
        // that should open it lands while the previous overlay is still tearing
        // down, or the panel opens before its options have loaded. Both are
        // timing, not failure, so drive the open off aria-expanded and retry
        // rather than waiting out the test timeout on a panel that never opened.
        await expect(async () => {
            if ((await combobox.getAttribute('aria-expanded')) !== 'true') {
                await combobox.click();
            }
            await expect(option).toBeVisible({ timeout: 2_000 });
        }).toPass({ timeout: 30_000 });

        await option.click();
        // The overlay animates out; waiting for it keeps the next click from
        // landing on the backdrop.
        await expect(this.page.locator('.cdk-overlay-backdrop')).toHaveCount(0);
    }

    async setIncludeAllGuardians(on: boolean): Promise<void> {
        const toggle = this.page.locator('mat-slide-toggle');
        const input = toggle.locator('button[role="switch"]');
        const checked = (await input.getAttribute('aria-checked')) === 'true';
        if (checked !== on) {
            await toggle.click();
        }
    }

    /** Rows only settle once the audience request resolves. */
    async waitForResults(): Promise<void> {
        await expect(this.page.locator('mat-progress-spinner')).toHaveCount(0);
    }

    rows(): Locator {
        return this.page.locator('.contact-row');
    }

    /** Rows whose text contains the given address. */
    rowsFor(email: string): Locator {
        return this.rows().filter({ hasText: email });
    }

    async expectAddressListedOnce(email: string): Promise<void> {
        await expect(this.rowsFor(email)).toHaveCount(1);
    }

    async expectAddressAbsent(email: string): Promise<void> {
        await expect(this.rowsFor(email)).toHaveCount(0);
    }

    async copyForBcc(): Promise<string> {
        await this.page.getByRole('button', { name: 'Copy for Bcc' }).click();
        return await this.page.evaluate(() => navigator.clipboard.readText());
    }
}
