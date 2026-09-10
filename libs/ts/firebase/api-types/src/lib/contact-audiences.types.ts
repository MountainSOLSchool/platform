/**
 * A contact audience is a named, computed set of family email addresses.
 * The same selector is resolved for every output (copy, CSV export, group
 * sync) so the outputs can never disagree about who is in an audience.
 */
export type AudienceSelector =
    | { type: 'semester'; semesterId: string }
    | { type: 'recentYears'; years: number }
    | { type: 'class'; classId: string; semesterId: string }
    | { type: 'allTime' };

export interface AudienceContact {
    name: string;
    email: string;
    /** Students this address is attached to, so a surprising entry can be traced. */
    students: Array<string>;
}

export interface ContactAudienceRequest {
    selector: AudienceSelector;
    /** Include every guardian's email, not just the primary contact's. */
    includeAllGuardians: boolean;
}

export interface ContactAudienceResponse {
    contacts: Array<AudienceContact>;
    /** Addresses found before de-duplication, to show how much collapsing happened. */
    totalBeforeDedupe: number;
    /** Students reached by this audience who had no usable email address. */
    studentsWithoutEmail: number;
}
