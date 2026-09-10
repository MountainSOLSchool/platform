import type { AudienceContact } from '@sol/ts/firebase/api-types';

/**
 * Google Contacts CSV.
 *
 * Kept to the four columns Google needs to create a labelled contact, because
 * every extra column is another chance to guess a header wrong — an unrecognised
 * header is imported as a junk custom field rather than ignored.
 *
 * `Labels` is what makes this worth doing: it lands the import in a named label
 * ("Fall 2026 Families") that Gmail expands in Bcc, instead of the "Imported on
 * <date>" label Google invents and the admin then has to rename. The
 * `* myContacts ::: ` prefix is Google's own encoding for "in My Contacts, under
 * this label".
 *
 * If a future Google Contacts release renames the column, this constant is the
 * only thing that needs changing — the import still works without it, it just
 * falls back to the "Imported on <date>" label.
 */
const HEADER = ['First Name', 'Last Name', 'Labels', 'E-mail 1 - Value'];
const LABEL_PREFIX = '* myContacts ::: ';

export function toGoogleContactsCsv(
    contacts: Array<AudienceContact>,
    labelName: string
): string {
    const rows = contacts.map((contact) => {
        const { first, last } = splitName(contact.name);
        return [first, last, LABEL_PREFIX + labelName, contact.email];
    });

    // CRLF: Excel and Google Sheets both want it, and Google Contacts accepts it.
    return [HEADER, ...rows]
        .map((row) => row.map(escape).join(','))
        .join('\r\n');
}

/**
 * Last whitespace-separated token is the family name, everything before it the
 * given name — wrong for some names, but it only affects how the contact is
 * filed, and leaving both blank (which the alternative, not splitting, would
 * mean) is worse. A contact with no name at all is filed under its address.
 */
function splitName(name: string): { first: string; last: string } {
    const parts = name.trim().split(/\s+/).filter(Boolean);
    if (parts.length === 0) return { first: '', last: '' };
    if (parts.length === 1) return { first: parts[0], last: '' };
    return {
        first: parts.slice(0, -1).join(' '),
        last: parts[parts.length - 1],
    };
}

function escape(value: string): string {
    return /[",\r\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
}

/** e.g. "Fall 2026 Families" -> "fall-2026-families-2026-09-09.csv" */
export function csvFileName(labelName: string, today = new Date()): string {
    const slug =
        labelName
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '') || 'contacts';
    return `${slug}-${today.toISOString().slice(0, 10)}.csv`;
}
