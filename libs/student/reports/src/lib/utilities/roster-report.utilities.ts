import * as admin from 'firebase-admin';
import {
    ContactDbEntry,
    StudentDbEntry,
    StudentRecord,
    StudentRecordPropertyNames,
    StudentSignInRecordPropertyNames,
} from '@sol/student/domain';
import { CellStyle, TableHeader } from '@sol/table/domain';
import { TablePdfUtility } from '@sol/table/pdf';
import { FlatRecord } from '@sol/record/domain';
import { StudentRepositoryUtility } from '@sol/student/persistence';

export class RosterReportGenerator {
    private studentRepositoryUtility: StudentRepositoryUtility;

    constructor(private readonly database: admin.firestore.Firestore) {
        this.studentRepositoryUtility = new StudentRepositoryUtility(database);
    }

    public async createRosterPdf(className: string) {
        const students = await this.studentRepositoryUtility.fetchStudents(
            className
        );

        const studentRecords =
            this.transformStudentEntriesIntoRosterRecords(students);

        console.log(studentRecords);

        return TablePdfUtility.createTablePdf({
            records: studentRecords,
            headers: this.studentRowHeaders,
            title: `Class Roster for ${className}`, //later display name from class
            styleBuilder: this.buildStudentRecordStyle,
        });
    }

    public async createSignInOutPdf(className: string) {
        const students = await this.studentRepositoryUtility.fetchStudents(
            className
        );

        const studentSignInSheetRecords =
            this.transformStudentEntriesIntoSignInSheet(students);

        return TablePdfUtility.createTablePdf({
            records: studentSignInSheetRecords,
            headers: this.signInRowHeaders,
            title: `Sign In/Out for ${className}`,
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

    /* Sign In/Out Sheet */

    private signInRowHeaders: readonly TableHeader<StudentSignInRecordPropertyNames>[] =
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
                title: 'Sign In',
                propertyName: 'signIn',
            },
            {
                title: 'Sign Out',
                propertyName: 'signOut',
            },
        ];

    private transformStudentEntriesIntoSignInSheet(
        students: Array<StudentDbEntry>
    ): Array<FlatRecord<StudentSignInRecordPropertyNames>> {
        return students.map((student) => ({
            lastName: { value: student.last_name },
            firstName: { value: student.first_name },
            signIn: { value: '' },
            signOut: { value: '' },
        }));
    }

    /* Records = Doom Sheet = Roster */

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

    private transformStudentEntriesIntoRosterRecords(
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
            okToPhotographAndUseName: {
                value: `${student.ok_to_photograph ? 'Yes' : 'No'}${
                    student.ok_to_photograph && !student.ok_use_name_photographs
                        ? ', but no name'
                        : ''
                }`,
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
