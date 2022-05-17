import * as admin from 'firebase-admin';
import {
    ContactDbEntry,
    StudentDbEntry,
    StudentRecord,
    StudentRecordPropertyNames,
} from '@sol/student/domain';
import { CellStyle, TableHeader } from '@sol/table/domain';
import { TablePdfUtility } from '@sol/table/pdf';
import { StudentUtility } from './student.utility';

export class RosterReportGenerator {
    private studentUtility: StudentUtility;

    constructor(private readonly database: admin.firestore.Firestore) {
        this.studentUtility = new StudentUtility(database);
    }

    public async createRosterPdf(className: string) {
        const students = await this.studentUtility.fetchStudents(className);

        const studentRecords =
            this.transformStudentEntriesIntoRecords(students);

        console.log(studentRecords);

        return TablePdfUtility.createTablePdf({
            records: studentRecords,
            headers: this.studentRowHeaders,
            styleBuilder: this.buildStudentRecordStyle,
        });
    }

    private buildStudentRecordStyle(
        propertyName: StudentRecordPropertyNames,
        value: string,
        metadata: { isImportant: boolean } | undefined
    ): CellStyle {
        return {
            isHighlighted: !!metadata?.isImportant,
            isBold: !!metadata?.isImportant,
        };
    }

    private studentRowHeaders: readonly TableHeader<StudentRecordPropertyNames>[] =
        [
            {
                title: 'Last Name',
                propertyName: 'lastName',
            },
            {
                title: 'First Name',
                propertyName: 'firstName',
            },
            {
                title: 'Age',
                propertyName: 'age',
            },
            {
                title: 'Parent/Guardian Names/s and #/s',
                propertyName: 'guardianContacts',
            },
            {
                title: 'Emergency Contact Info',
                propertyName: 'emergencyContacts',
            },
            {
                title: 'Authorized to Pick Up',
                propertyName: 'authorizedPickUpContacts',
            },
            {
                title: 'Code Word',
                propertyName: 'codeWord',
            },
            {
                title: 'Medications',
                propertyName: 'medications',
            },
            {
                title: 'Sunscreen/Bugspray',
                propertyName: 'sunscreenBugSpray',
            },
            {
                title: 'Allergies',
                propertyName: 'allergies',
            },
            {
                title: 'OK to Photograph?',
                propertyName: 'okToPhotographAndUseName',
            },
        ] as const;

    private transformStudentEntriesIntoRecords(
        students: Array<StudentDbEntry>
    ): Array<StudentRecord> {
        return students.map((student) => ({
            lastName: { value: student.last_name },
            firstName: { value: student.first_name },
            age: { value: '9' }, // TODO: calculate from dateBirth
            guardianContacts: {
                value:
                    student.guardians?.map(this.contactToString).join('\n') ??
                    '',
            },
            emergencyContacts: {
                value:
                    student.emergency_contacts
                        ?.map(this.contactToString)
                        .join('\n') ?? '',
            },
            authorizedPickUpContacts: {
                value:
                    student.authorized_pick_up_contacts
                        ?.map(this.contactToString)
                        .join('\n') ?? '',
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
                value:
                    student.allergies?.map(this.allergiesToString).join('\n') ??
                    '',
                metadata: {
                    isImportant: !!student.allergies?.find(
                        (allergy) => allergy.important
                    ),
                },
            },
            medications: {
                value: student.medications
                    ?.map(this.medicationToString)
                    ?.join(', '),
                metadata: {
                    isImportant: !!student.medications?.find(
                        (med) => med.important
                    ),
                },
            },
        }));
    }

    private allergiesToString(allergies: {
        name: string;
        description: string;
        response: string;
    }): string {
        return `${allergies.name}, ${allergies.description}, Response to Allergy: ${allergies.response}`;
    }

    private medicationToString(med: {
        name: string;
        doctor: { name: string; role?: string };
        dosage: string;
    }): string {
        return `${med.name} is prescribed by ${med.doctor.name}${
            med.doctor.role ? `: ${med.doctor.role}` : ''
        } and should be taken by "${med.dosage}"`;
    }

    private contactToString(contact: ContactDbEntry): string {
        return [
            `${contact.first_name} ${contact.last_name}`,
            contact.relationship,
            contact.phone,
            contact.email,
        ].join(', ');
    }
}
