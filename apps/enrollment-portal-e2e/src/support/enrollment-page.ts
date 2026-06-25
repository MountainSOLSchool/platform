import { Page, expect } from '@playwright/test';

/**
 * Page object for the Mountain SOL class enrollment flow at /classes/enrollment.
 *
 * Selectors are derived from the *migrated Angular Material* templates (no p-*
 * PrimeNG selectors). Each method cites the template + line range it was read
 * from so they can be re-verified against the source.
 *
 * Stepper steps (in order) — enrollment-workflow.component.html:60-285:
 *   1. Class Selection   (sol-class-picker)
 *   2. Events            (sol-event-selection)        — only when remote-config
 *                         show_events_step is true; usually hidden
 *   3. Account           (sol-class-account -> sol-login)
 *   4. Student Selection (sol-student-selection)
 *   5. Student Info      (sol-student-info)           — starts `disabled`, only
 *                         reachable via Next once prior steps complete
 *   6. Medical Info      (sol-medical)
 *   7. Releases          (sol-releases)
 *   8. Confirm Enrollment(sol-class-confirmation -> sol-checkout)
 *
 * Advancing the stepper: the in-step `#navigation` template renders a
 * `matStepperNext` button labelled "Next" on every non-last step, and a
 * "Submit" button (click handler `complete()`) on the last step. Steps are NOT
 * clickable headers in this flow — you must use the Next/Previous buttons.
 * (enrollment-workflow.component.html:298-337)
 */

export interface StudentInfoData {
    /** MM/DD/YYYY — bound to the Birth Date mat-datepicker input #birthdate. */
    birthdate: string;
    firstName: string;
    lastName: string;
    pronouns: string;
    school: string;
    /** mat-select value; sample 'AS'/'AM' etc. See info.component.html:217. */
    tshirtSize: string;
    contactFirstName: string;
    contactLastName: string;
    contactEmail: string;
    contactPhone: string;
    /** Address block — all required by the contact validation group. */
    address: string;
    city: string;
    state: string;
    zip: string;
    guardianName: string;
    guardianRelationship: string;
    guardianPhone: string;
    guardianEmail: string;
    /** Pickup code word — info.component.html:825. */
    codeWord: string;
}

export interface MedicalData {
    /** Two emergency contacts are pre-rendered; fill index 0 + 1. */
    emergencyContacts: Array<{
        name: string;
        relationship: string;
        phone: string;
    }>;
    weight: string;
    heightFeet: string;
    heightInches: string;
    doctorName: string;
    doctorPhone: string;
    insuranceCompany: string;
    insuranceId: string;
}

export const SAMPLE_STUDENT_INFO: StudentInfoData = {
    birthdate: '06/15/2015',
    firstName: 'Testy',
    lastName: 'McTestface',
    pronouns: 'they/them',
    school: 'E2E Elementary',
    tshirtSize: 'AS',
    contactFirstName: 'Parent',
    contactLastName: 'McTestface',
    contactEmail: 'parent@e2e.test',
    contactPhone: '555-555-5555',
    address: '123 Mountain Rd',
    city: 'Boulder',
    state: 'CO',
    zip: '80301',
    guardianName: 'Parent McTestface',
    guardianRelationship: 'Parent',
    guardianPhone: '555-555-5555',
    guardianEmail: 'parent@e2e.test',
    codeWord: 'mountain',
};

export const SAMPLE_MEDICAL: MedicalData = {
    emergencyContacts: [
        { name: 'Aunt May', relationship: 'Aunt', phone: '555-111-2222' },
        { name: 'Uncle Ben', relationship: 'Uncle', phone: '555-333-4444' },
    ],
    weight: '80',
    heightFeet: '4',
    heightInches: '6',
    doctorName: 'Dr. Test',
    doctorPhone: '555-555-1234',
    insuranceCompany: 'E2E Health',
    insuranceId: 'INS-12345',
};

export class EnrollmentPage {
    constructor(private readonly page: Page) {}

    /** Navigate to the enrollment flow. Route: app-routes.ts:118-131. */
    async goto(): Promise<void> {
        // waitUntil 'domcontentloaded' (not the default 'load'): the Angular
        // dev-server's live-reload connection can keep the page's load event
        // pending on slower CI runners, hanging goto until the test times out.
        await this.page.goto('/classes/enrollment', {
            waitUntil: 'domcontentloaded',
        });
    }

    /**
     * Select a class by its displayed title.
     *
     * Each class renders a `sol-class-card` -> mat-card with an `<h2 class="card-title">`
     * containing the title (class-card.component.html:13). The select action is a
     * button with class `.select-button` labelled "Select Class" for an
     * unselected, standard (non-prompt) class (class-card.component.html:228-241).
     * After clicking it flips to "Selected" (.selected-state).
     *
     * Note: classes are rendered inside lazy mat-tabs / @defer blocks
     * (class-list.component.html:161-221), so the card may take a moment to
     * appear — `getByRole` auto-waits.
     */
    async selectClassByName(
        name: string,
        additionalOptionLabels: Array<string> = []
    ): Promise<void> {
        const card = this.page
            .locator('sol-class-card')
            .filter({ has: this.page.getByRole('heading', { name }) });
        await expect(card).toBeVisible();

        // .select-button shows "Select Class" when not yet selected.
        // class-card.component.html:199 (prompt variant) & :236 (standard).
        const selectButton = card.getByRole('button', {
            name: /select class/i,
        });
        await selectButton.click();

        // Classes with a sliding scale or additional options open a mat-menu
        // (before-select-options form) with a "Confirm" button rather than
        // selecting immediately (class-card.component.html:142-151,
        // before-select-options.component.html). Plain classes select directly.
        const confirm = this.page.getByRole('button', { name: /^confirm$/i });
        try {
            await confirm.waitFor({ state: 'visible', timeout: 3000 });
            for (const label of additionalOptionLabels) {
                await this.page.getByRole('checkbox', { name: label }).check();
            }
            await confirm.click();
        } catch {
            // No prompt menu — the class selected directly.
        }

        // Confirm it toggled to the selected state.
        // class-card.component.html:214/250 — button text becomes "Selected".
        await expect(
            card.getByRole('button', { name: /^selected/i })
        ).toBeVisible();
    }

    /**
     * Advance the stepper one step via the in-step "Next" button.
     * enrollment-workflow.component.html:305-313 (matStepperNext, label "Next").
     * The button is scoped to the currently active step's content.
     */
    async continue(): Promise<void> {
        await this.page.getByRole('button', { name: 'Next' }).click();
    }

    /**
     * Sign in on the Account step.
     *
     * Account step renders `sol-class-account` which, when logged out, embeds
     * `sol-login` with [isCreatingNewAccount]="false" (account.component.html:35-38),
     * so the sign-in form is shown by default.
     *
     * Form fields (login.component.html:63-110):
     *   - Email:    input#email  (mat-label "Email")
     *   - Password: input[name="password"][type="password"] (mat-label "Password")
     * Submit button text is "Sign In" when not creating an account
     * (login.component.html:113-133). The button is NOT disabled by default
     * (only disabled while isLoggingIn$ is true).
     *
     * After a successful sign-in, account.component.html:1-25 swaps to a
     * "Thank you for signing in with the account <email>" confirmation card.
     */
    async signIn(email: string, password: string): Promise<void> {
        // id="email" is unique within the login form (login.component.html:70).
        await this.page.locator('sol-login input#email').fill(email);
        // No stable id on password; key off name within sol-login.
        await this.page
            .locator('sol-login input[name="password"]')
            .fill(password);

        await this.page.getByRole('button', { name: 'Sign In' }).click();

        // Wait for the signed-in confirmation (account.component.html:20-22).
        await expect(
            this.page.getByText('Thank you for signing in with the account')
        ).toBeVisible();
    }

    /**
     * Choose "New Student" on the Student Selection step.
     *
     * select-student.component.html:36-41 renders a `sol-student-selection-card`
     * with icon="pi-user-plus" (mapped to mat-icon "person_add", and a title of
     * "New Student" when no `student` input — select-student-card.component.html:21-23).
     * The card's action button is labelled "Select" when unselected / "Selected"
     * when selected (select-student-card.component.html:54-71).
     *
     * The new-student card is the LAST sol-student-selection-card in the list
     * (after any existing-student cards). We target it by the "New Student" title.
     */
    async chooseNewStudent(): Promise<void> {
        const newStudentCard = this.page
            .locator('sol-student-selection-card')
            .filter({ hasText: 'New Student' });
        await expect(newStudentCard).toBeVisible();

        await newStudentCard.getByRole('button', { name: /^select$/i }).click();

        await expect(
            newStudentCard.getByRole('button', { name: /^selected$/i })
        ).toBeVisible();
    }

    /**
     * Fill the required Student Info fields for a NEW student.
     *
     * info.component.html — the fields marked `required` (with ⚠️ section
     * validation) are: firstName(:91), lastName(:113), pronouns(:177),
     * school(:199), tshirtSize(:217 mat-select), contactFirstName(:299),
     * contactLastName(:321), contactEmail (id="email" within the Contact
     * section, :343), plus Birth Date (#birthdate datepicker input, :46) and the
     * pickup Code Word (#codeWord, :825). Guardian #0 name/relationship/phone/email
     * are also validated (:636-722). Contact phone/address are validated by the
     * model but we fill phone to be safe.
     *
     * NOTE: There are TWO inputs with id="email" on this step — the student
     * email (Optional, info.component.html:132 — type="email") and the contact
     * primary email (info.component.html:343). We scope each by its enclosing
     * mat-form-field label to disambiguate.
     *
     * For a brand-new (fresh) student the sol-confirm-accuracy checkboxes do NOT
     * render (confirm-accuracy.component.ts:10 — only when isOutOfDate()), so no
     * "I have reviewed this section" checkbox needs ticking here.
     *
     * The expansion panels: "Student" is expanded by default (:24); the
     * "Primary Contact", "Parents and Guardians", and "Pickup" panels start
     * collapsed and must be opened before their inputs are interactable.
     */
    async fillStudentInfo(data: StudentInfoData): Promise<void> {
        // ── Student panel (expanded by default) ──
        // Birth Date datepicker input (info.component.html:46-57).
        await this.page.locator('input#birthdate').fill(data.birthdate);
        await this.fillByLabel('First Name', data.firstName, 0);
        await this.fillByLabel('Last Name', data.lastName, 0);
        await this.fillByLabel('Pronouns', data.pronouns);
        await this.fillByLabel('School', data.school);

        // T-Shirt Size mat-select (info.component.html:217-235).
        await this.page.getByLabel('T-Shirt Size').click();
        await this.page.getByRole('option').first().click();

        // ── Primary Contact panel ──
        // Address/city/state/zip are required by the 'contact' validation group
        // (info.component.ts:129-143) — fill via stable ids inside the panel.
        await this.openPanel('Primary Contact for Student Registration');
        await this.page
            .locator('input#contactFirstName')
            .fill(data.contactFirstName);
        await this.page
            .locator('input#contactLastName')
            .fill(data.contactLastName);
        // Contact "Primary Email" is the input#email inside this panel
        // (info.component.html:343).
        await this.page.locator('input#email').fill(data.contactEmail);
        await this.page.locator('input#phone').fill(data.contactPhone);
        await this.page.locator('input#address').fill(data.address);
        await this.page.locator('input#city').fill(data.city);
        await this.page.locator('input#state').fill(data.state);
        await this.page.locator('input#zip').fill(data.zip);

        // ── Privacy and Protectants panel ──
        // deetBugspray / naturalBugspray / sunscreen / photography are required
        // by the 'privacy' validation group (info.component.ts:159-174). Each is
        // a mat-button-toggle-group; pick the first option to give it a value.
        await this.openPanel('Privacy and Protectants');
        await this.pickFirstToggle('deetBugspray');
        await this.pickFirstToggle('naturalBugspray');
        await this.pickFirstToggle('sunscreen');
        await this.pickFirstToggle('photography');

        // ── Parents and Guardians panel (first guardian is required) ──
        await this.openPanel('Parents and Guardians');
        // Guardian #0 ids: guardian_0_name / _relationship / _phone / _email /
        // _residence (info.component.html:636-761). Residence is a button toggle.
        await this.page
            .locator('input#guardian_0_name')
            .fill(data.guardianName);
        await this.page
            .locator('input#guardian_0_relationship')
            .fill(data.guardianRelationship);
        await this.page
            .locator('input#guardian_0_phone')
            .fill(data.guardianPhone);
        await this.page
            .locator('input#guardian_0_email')
            .fill(data.guardianEmail);
        // Residence toggle group binds [id] (not a static name) — target by id.
        await this.page
            .locator('mat-button-toggle-group#guardian_0_residence button')
            .first()
            .click();

        // ── Pickup panel (code word) ──
        await this.openPanel('Pickup');
        await this.page.locator('input#codeWord').fill(data.codeWord);
    }

    /**
     * Fill the required Medical Info fields for a NEW student.
     *
     * medical.component.html — Emergency Contacts (panel expanded by default,
     * :24) renders ids contact_<i>_name/_relationship/_phone (:65-124); at least
     * two are validated (the Remove button only shows for index > 1, :142).
     * Student Health (collapsed) has required Doctor's Name (#docName, :263),
     * Insurance Company (#insuranceCo, :310). Weight (#weight, :195) and Height
     * (#heightFeet :217 / #heightInches :237) and Doctor's Phone (#docPhone,
     * :283) / Insurance ID (#insuranceNo, :333) are also validated.
     *
     * Allergies "hasLifeThreateningAllergies" (mat-button-toggle, :351) and
     * "authorizedToAdministerMedication" (:535) are validated; pick the first
     * (typically "No"/"Yes") option to satisfy them.
     */
    async fillMedical(data: MedicalData): Promise<void> {
        // ── Emergency Contacts (expanded by default) ──
        for (let i = 0; i < data.emergencyContacts.length; i++) {
            const c = data.emergencyContacts[i];
            await this.page.locator(`input#contact_${i}_name`).fill(c.name);
            await this.page
                .locator(`input#contact_${i}_relationship`)
                .fill(c.relationship);
            await this.page.locator(`input#contact_${i}_phone`).fill(c.phone);
        }

        // ── Student Health Information panel ──
        await this.openPanel('Student Health Information');
        await this.page.locator('input#weight').fill(data.weight);
        await this.page.locator('input#heightFeet').fill(data.heightFeet);
        await this.page.locator('input#heightInches').fill(data.heightInches);
        await this.page.locator('input#docName').fill(data.doctorName);
        await this.page.locator('input#docPhone').fill(data.doctorPhone);
        await this.page
            .locator('input#insuranceCo')
            .fill(data.insuranceCompany);
        await this.page.locator('input#insuranceNo').fill(data.insuranceId);

        // Life-threatening allergies toggle (medical.component.html:351-367,
        // name="hasAllergies"). Pick the first option to satisfy the required
        // hasLifeThreateningAllergies validation (medical.component.ts:140-148).
        await this.pickFirstToggle('hasAllergies');

        // Medical authorization toggle (medical.component.html:535-557,
        // name="authorizedToAdministerMedication") — required
        // (medical.component.ts:176-184).
        await this.pickFirstToggle('authorizedToAdministerMedication');
    }

    /**
     * Sign both releases on the Releases step.
     *
     * releases.component.html renders two signature text inputs:
     *   - #medicalReleaseSignature      (:43, "Signature (type full name)")
     *   - #releaseOfLiabilitySignature  (:156)
     * The second panel ("Release of Liability...") starts collapsed (:61), so
     * open it before filling its signature. Both are validated to require a value.
     */
    async signReleases(fullName = 'Parent McTestface'): Promise<void> {
        // Medical Release panel is expanded by default (:4).
        await this.page.locator('input#medicalReleaseSignature').fill(fullName);

        await this.openPanel('Release of Liability and Hold Harmless');
        await this.page
            .locator('input#releaseOfLiabilitySignature')
            .fill(fullName);
    }

    /**
     * Submit the enrollment from the final Confirm Enrollment step.
     *
     * The last step's navigation renders a "Submit" button (click -> complete())
     * ONLY once allStepsComplete is true (enrollment-workflow.component.html:315-334).
     * For a $0 enrollment the confirmation step shows
     * "No payment method is required at this time." (confirmation.component.html:188)
     * so no payment collector input is needed.
     */
    async submit(): Promise<void> {
        const submitButton = this.page.getByRole('button', { name: 'Submit' });
        await expect(submitButton).toBeVisible();
        await submitButton.click();
    }

    /**
     * Assert a successful enrollment.
     *
     * On success the workflow shows a modal card titled "Successfully enrolled!"
     * with a green check_circle icon and an "Enroll Another Student" action
     * (enrollment-workflow.component.html:379-431). The title is the stable,
     * assertable success indicator.
     */
    async expectEnrolled(): Promise<void> {
        await expect(this.page.getByText('Successfully enrolled!')).toBeVisible(
            { timeout: 30_000 }
        );
    }

    /**
     * Sign in via the standalone /user/login page (not the in-flow Account
     * step). Used by the addendum flow, where the addendum route auto-completes
     * the Account step and so never shows a login form, yet the
     * getEnrollmentForAddendum function requires an authenticated owner.
     *
     * The login form is the same `sol-login` component used in-flow
     * (login.component.html:63-110): input#email, input[name="password"], and a
     * "Sign In" button. After a successful sign-in the form's "Sign In" submit
     * button is removed, so we assert it disappears as the success signal.
     */
    async loginStandalone(email: string, password: string): Promise<void> {
        await this.page.goto('/user/login', { waitUntil: 'domcontentloaded' });
        await this.page.locator('sol-login input#email').fill(email);
        await this.page
            .locator('sol-login input[name="password"]')
            .fill(password);
        const signIn = this.page.getByRole('button', { name: 'Sign In' });
        await signIn.click();
        await expect(signIn).toBeHidden();
    }

    /**
     * Apply a discount code on the Confirm Enrollment step.
     *
     * confirmation.component.html:58-85 renders a "Code" mat-form-field
     * (input#discountCode) plus an "Apply" button. We type the code and click
     * Apply.
     */
    async applyDiscountCode(code: string): Promise<void> {
        await this.page.locator('input#discountCode').fill(code);
        await this.page.getByRole('button', { name: /^apply$/i }).click();
    }

    /**
     * Assert a discount code was accepted: confirmation.component.html:97-111
     * renders a `.valid-chip` mat-chip showing "{CODE} (-{amount})". We assert
     * the chip with the code text is visible.
     */
    async expectDiscountApplied(code: string): Promise<void> {
        await expect(
            this.page.locator('.valid-chip').filter({ hasText: code })
        ).toBeVisible();
    }

    /**
     * Assert the confirmation Total card shows the given final-total currency
     * string. confirmation.component.html:224-233 renders
     * "Final Total: {finalTotal | currency}" inside a <b>. We match the text on
     * the page (currency pipe -> e.g. "$90.00").
     */
    async expectFinalTotal(currencyText: string): Promise<void> {
        await expect(
            this.page.getByText(`Final Total: ${currencyText}`)
        ).toBeVisible();
    }

    /**
     * Choose the single pre-seeded existing student on the Student Selection
     * step (select-student.component.html). Existing students render a
     * `sol-student-selection-card` titled with the student's name; its action
     * button is "Select" / "Selected" (select-student-card.component.html:54-71).
     */
    async chooseExistingStudent(name: string): Promise<void> {
        const card = this.page
            .locator('sol-student-selection-card')
            .filter({ hasText: name });
        await expect(card).toBeVisible();
        await card.getByRole('button', { name: /^select$/i }).click();
        await expect(
            card.getByRole('button', { name: /^selected$/i })
        ).toBeVisible();
    }

    /**
     * Assert the "information is out of date" review prompt is shown.
     *
     * When a student's info is >2yr stale, the Student Info step wraps its
     * content in sol-acknowledge-out-of-date, which renders a "Review your
     * student's information" card with a "Start reviewing" button
     * (acknowledge-out-of-date.component.ts:19,33) until acknowledged.
     */
    async expectOutOfDateReview(): Promise<void> {
        await expect(
            this.page.getByRole('heading', {
                name: "Review your student's information",
            })
        ).toBeVisible();
        await expect(
            this.page.getByRole('button', { name: 'Start reviewing' })
        ).toBeVisible();
    }

    /**
     * Acknowledge the out-of-date prompt and assert the per-section
     * confirm-accuracy checkboxes appear. After clicking "Start reviewing" the
     * sol-confirm-accuracy blocks render checkboxes labelled "I have reviewed
     * this section and confirm it is up-to-date" (confirm-accuracy.component.ts:20).
     */
    async startReviewingAndExpectConfirmAccuracy(): Promise<void> {
        await this.page
            .getByRole('button', { name: 'Start reviewing' })
            .click();
        await expect(
            this.page
                .getByRole('checkbox', {
                    name: 'I have reviewed this section and confirm it is up-to-date',
                })
                .first()
        ).toBeVisible();
    }

    /**
     * Navigate directly to the addendum route for an existing enrollment.
     * Route: class-enrollment.ts:7 ('addendum/:enrollmentId').
     */
    async gotoAddendum(enrollmentId: string): Promise<void> {
        await this.page.goto(`/classes/enrollment/addendum/${enrollmentId}`, {
            waitUntil: 'domcontentloaded',
        });
    }

    /**
     * Assert the addendum mode loaded: the info banner explaining locked
     * already-enrolled classes is shown (enrollment-workflow.component.html:16-23),
     * and the seeded class is shown as selected on the Class Selection step.
     */
    async expectAddendumLocked(className: string): Promise<void> {
        await expect(
            this.page.getByText(
                'You are adding to an existing enrollment. Already-enrolled classes are shown as selected and cannot be removed.'
            )
        ).toBeVisible();

        // A locked (already-enrolled) class renders an "Enrolled…" button and
        // exposes no remove/deselect control. If the class has add-ons that are
        // NOT part of the original enrollment the button reads "Enrolled — Add
        // Options" and stays enabled (to add options); with no unlocked options
        // it reads "Enrolled" and is disabled
        // (class-card.component.html:165-191). Either way it is NOT a
        // "Select Class" / removable "Selected" control, which is the lock
        // guarantee we assert.
        const card = this.page.locator('sol-class-card').filter({
            has: this.page.getByRole('heading', { name: className }),
        });
        await expect(card).toBeVisible();
        await expect(
            card.getByRole('button', { name: /^enrolled/i })
        ).toBeVisible();
        // The removable "Select Class" affordance must be absent for a locked class.
        await expect(
            card.getByRole('button', { name: /select class/i })
        ).toHaveCount(0);
    }

    // ─── helpers ──────────────────────────────────────────────────────────────

    /** Open a collapsed mat-expansion-panel by its header title text. */
    private async openPanel(titleText: string): Promise<void> {
        const header = this.page
            .locator('mat-expansion-panel-header')
            .filter({ hasText: titleText });
        // Only click if collapsed (aria-expanded="false").
        const expanded = await header.getAttribute('aria-expanded');
        if (expanded !== 'true') {
            await header.click();
        }
    }

    /**
     * Select the first option of a mat-button-toggle-group by its `name`.
     * Each option renders a `<button>` inside a `<mat-button-toggle>`; clicking
     * the first button gives the underlying ngModel a defined value, satisfying
     * the `isNotUndefined()` validators on the privacy / allergy / medication
     * toggles.
     */
    private async pickFirstToggle(name: string): Promise<void> {
        await this.page
            .locator(`mat-button-toggle-group[name="${name}"] button`)
            .first()
            .click();
    }

    /**
     * Fill a Material field by its mat-label. `nth` disambiguates when a label
     * (e.g. "First Name") appears more than once on the page.
     */
    private async fillByLabel(
        label: string,
        value: string,
        nth?: number
    ): Promise<void> {
        const field = this.page.getByLabel(label);
        await (nth === undefined ? field : field.nth(nth)).fill(value);
    }
}
