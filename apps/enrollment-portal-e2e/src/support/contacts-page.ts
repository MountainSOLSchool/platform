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
        await this.page.getByRole('combobox', { name: label }).click();
        await this.page
            .getByRole('option', { name: optionText, exact: true })
            .click();
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
