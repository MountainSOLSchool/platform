import { csvFileName, toGoogleContactsCsv } from './google-contacts-csv';

const contact = (name: string, email: string) => ({
    name,
    email,
    students: [],
});

describe('toGoogleContactsCsv', () => {
    it('emits the header and one labelled row per contact', () => {
        const csv = toGoogleContactsCsv(
            [contact('Robin Redwood', 'robin@test.com')],
            'Fall 2026 Families'
        );

        expect(csv.split('\r\n')).toEqual([
            'First Name,Last Name,Labels,E-mail 1 - Value',
            'Robin,Redwood,* myContacts ::: Fall 2026 Families,robin@test.com',
        ]);
    });

    it('files a multi-word given name under the last token', () => {
        const csv = toGoogleContactsCsv(
            [contact('Maria del Carmen Ruiz', 'maria@test.com')],
            'L'
        );

        expect(csv.split('\r\n')[1]).toBe(
            'Maria del Carmen,Ruiz,* myContacts ::: L,maria@test.com'
        );
    });

    it('handles a single-token name and a contact with no name', () => {
        const csv = toGoogleContactsCsv(
            [contact('Prince', 'p@test.com'), contact('', 'anon@test.com')],
            'L'
        );
        const [, single, nameless] = csv.split('\r\n');

        expect(single).toBe('Prince,,* myContacts ::: L,p@test.com');
        expect(nameless).toBe(',,* myContacts ::: L,anon@test.com');
    });

    it('quotes values containing commas, quotes or newlines', () => {
        const csv = toGoogleContactsCsv(
            [contact('Ruiz, Maria "Mimi"', 'm@test.com')],
            'Autumn, 2026'
        );

        expect(csv.split('\r\n')[1]).toBe(
            '"Ruiz, Maria","""Mimi""","* myContacts ::: Autumn, 2026",m@test.com'
        );
    });

    it('emits just the header for an empty audience', () => {
        expect(toGoogleContactsCsv([], 'L')).toBe(
            'First Name,Last Name,Labels,E-mail 1 - Value'
        );
    });
});

describe('csvFileName', () => {
    it('slugifies the label and stamps the date', () => {
        expect(
            csvFileName('Fall 2026 Families', new Date('2026-09-09T12:00:00Z'))
        ).toBe('fall-2026-families-2026-09-09.csv');
    });

    it('falls back when the label has no usable characters', () => {
        expect(csvFileName('!!!', new Date('2026-09-09T12:00:00Z'))).toBe(
            'contacts-2026-09-09.csv'
        );
    });
});
