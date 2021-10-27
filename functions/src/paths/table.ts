import * as pdf from 'html-pdf';
import {
    FlatRecord,
    CellStyleBuilder,
    TableRow,
    TableHeader,
    StudentDbEntry,
    StudentRecord,
    Contact,
} from '../models';

export function transformRecordsIntoTableRows<
    PropertyNames extends string,
    Extras
>(
    records: Array<FlatRecord<PropertyNames, Extras>>,
    styleBuilder: CellStyleBuilder<PropertyNames, Extras>
): Array<TableRow<PropertyNames>> {
    return records.map((record) => ({
        cells: Object.entries(record).map(([key, v]) => {
            const propertyName = key as PropertyNames;
            const theRecord = v as { value: string; extras: Extras };
            const textContent = theRecord.value as string;
            const extras = theRecord.extras;
            return {
                propertyName,
                textContent,
                style: styleBuilder(propertyName, textContent, extras),
            };
        }),
    }));
}

export function createTablePdf<T, PropertyNames extends string, Extras>({
    records,
    headers,
    styleBuilder,
}: {
    records: Array<FlatRecord<PropertyNames, Extras>>;
    headers: readonly TableHeader<PropertyNames>[];
    styleBuilder: CellStyleBuilder<PropertyNames, Extras>;
}) {
    const htmlTable = generateHtmlTableFromRecords({
        records,
        headers,
        styleBuilder,
    });

    return pdf.create(htmlTable, {
        orientation: 'landscape',
    });
}

export function transformStudentEntriesIntoRecords(
    students: Array<StudentDbEntry>
): Array<StudentRecord> {
    return students.map((student) => ({
        lastName: { value: student.last_name },
        firstName: { value: student.first_name },
        age: { value: '9' }, // TODO: calculate from dateBirth
        guardianContacts: {
            value: student.guardians.map(contactToString).join('\n'),
        },
        emergencyContacts: {
            value: student.emergency_contacts.map(contactToString).join('\n'),
        },
        authorizedPickUpContacts: {
            value: student.authorized_pick_up_contacts
                .map(contactToString)
                .join('\n'),
        },
        codeWord: { value: student.code_word },
        okToPhotographAndUseName: {
            value: `${student.ok_to_photograph ? 'Yes' : 'No'}${
                student.ok_to_photograph && !student.ok_use_name_photographs
                    ? ', but no name'
                    : ''
            }`,
        },
        sunscreenBugSpray: {
            value: student.sunscreen_bug_spray ? 'Yes' : 'No',
        },
        allergies: {
            value: student.allergies.map(allergiesToString).join('\n'),
            extras: { isImportant: !!student.allergies.find(allergy => allergy.important) }
        },
        medications: {
            value: student.medications?.map(medicationToString)?.join(', '),
            extras: { isImportant: !!student.medications.find(med => med.important) }
        },
    }));
}

function allergiesToString(allergies: {
    name: string;
    description: string;
    response: string;
}): string {
    return `${allergies.name}, ${allergies.description}, Response to Allergy: ${allergies.response}`;
}

function medicationToString(med: {
    name: string;
    doctor: { name: string; role?: string };
    dosage: string;
}): string {
    return `${med.name} is prescribed by ${med.doctor.name}${
        med.doctor.role ? `: ${med.doctor.role}` : ''
    } and should be taken by "${med.dosage}"`;
}

function contactToString(contact: Contact): string {
    return [
        contact.name,
        contact.relationship,
        contact.phone,
        contact.email,
    ].join(', ');
}

export function createHtmlTable<T extends string>(
    headers: readonly TableHeader<T>[],
    rows: Array<TableRow<T>>
): string {
    const headerTitles = headers.map((h) => h.title);
    return `
    <table>
        <tr>
          ${headers.map((h) => '<th>' + h.title + '</th>').join('')}
        </tr>
        ${rows
            .map(
                (r) =>
                    '<tr>' +
                    [...r.cells]
                        .sort(
                            (a, b) =>
                                headerTitles.indexOf(a.propertyName) -
                                headerTitles.indexOf(b.propertyName)
                        )
                        .map(
                            (c) =>
                                "<td style='background-color:" +
                                (c.style.isHighlighted ? 'yellow' : 'white') +
                                ';font-weight:' +
                                (c.style.isBold ? 'bold' : 'normal') +
                                "'>" +
                                c.textContent +
                                '</td>'
                        )
                        .join('') +
                    '</tr>'
            )
            .join('')}
      </table>
    `;
}

export function generateHtmlTableFromRecords<
    T,
    PropertyNames extends string,
    Extras
>({
    records,
    headers,
    styleBuilder,
}: {
    records: Array<FlatRecord<PropertyNames, Extras>>;
    headers: readonly TableHeader<PropertyNames>[];
    styleBuilder: CellStyleBuilder<PropertyNames, Extras>;
}) {
    const rows = transformRecordsIntoTableRows(records, styleBuilder);

    return createHtmlTable(headers, rows);
}
