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
import { StudentRepository } from '@sol/student/repository';

export class RosterReportGenerator {
    static async createRosterPdf(className: string) {
        const students = await StudentRepository.fetchStudents(className);

        const studentRecords =
            this.transformStudentEntriesIntoRosterRecords(students);

        return TablePdfUtility.createTablePdf({
            records: studentRecords,
            headers: this.studentRowHeaders,
            title: `Class Roster for ${className}`, //later display name from class
            styleBuilder: this.buildStudentRecordStyle,
        });
    }

    static async createSignInOutPdf(className: string) {
        const students = await StudentRepository.fetchStudents(className);

        const studentSignInSheetRecords =
            this.transformStudentEntriesIntoSignInSheet(students);

        return TablePdfUtility.createTablePdf({
            records: studentSignInSheetRecords,
            headers: this.signInRowHeaders,
            title: `Sign In/Out for ${className}`,
        });
    }

    static buildStudentRecordStyle(
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

    static signInRowHeaders: readonly TableHeader<StudentSignInRecordPropertyNames>[] =
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
                title: 'Sign In Time',
                propertyName: 'signInTime',
            },
            {
                title: 'Signature',
                propertyName: 'signInSignature',
            },
            {
                title: 'Sign Out Time',
                propertyName: 'signOutTime',
            },
            {
                title: 'Signature',
                propertyName: 'signOutSignature',
            },
        ];

    static transformStudentEntriesIntoSignInSheet(
        students: Array<StudentDbEntry>
    ): Array<FlatRecord<StudentSignInRecordPropertyNames>> {
        return students
            .map((student) => ({
                lastName: { value: student.last_name },
                firstName: { value: student.first_name },
                signInTime: { value: '' },
                signInSignature: { value: '' },
                signOutTime: { value: '' },
                signOutSignature: { value: '' },
            }))
            .sort((a, b) => {
                const lastNameDiff = a.lastName.value.localeCompare(
                    b.lastName.value
                );
                return lastNameDiff === 0
                    ? a.firstName.value.localeCompare(b.firstName.value)
                    : lastNameDiff;
            });
    }

    /* Records = Doom Sheet = Roster */

    static studentRowHeaders: readonly TableHeader<StudentRecordPropertyNames>[] =
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

    static transformStudentEntriesIntoRosterRecords(
        students: Array<StudentDbEntry>
    ): Array<StudentRecord> {
        return students
            .map((student) => ({
                lastName: { value: student.last_name },
                firstName: { value: student.first_name },
                age: {
                    value: (() => {
                        const today = new Date();
                        const birthDate = new Date(student.birth_date);
                        let age = today.getFullYear() - birthDate.getFullYear();
                        const monthDiff =
                            today.getMonth() - birthDate.getMonth();
                        if (
                            monthDiff < 0 ||
                            (monthDiff === 0 &&
                                today.getDate() < birthDate.getDate())
                        ) {
                            age--;
                        }
                        return String(age);
                    })(),
                },
                guardianContacts: {
                    value: '',
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
                        student.allergies
                            ?.map(this.allergiesToString)
                            .join('\n') ?? '',
                    metadata: {
                        isImportant: !!student.allergies?.find(
                            (allergy) => allergy.important
                        ),
                    },
                },
                okToPhotographAndUseName: {
                    value: `${student.ok_to_photograph ? 'Yes' : 'No'}${
                        student.ok_to_photograph &&
                        !student.ok_use_name_photographs
                            ? ', but no name'
                            : ''
                    }`,
                },
            }))
            .sort((a, b) => {
                const lastNameDiff = a.lastName.value.localeCompare(
                    b.lastName.value
                );
                return lastNameDiff === 0
                    ? a.firstName.value.localeCompare(b.firstName.value)
                    : lastNameDiff;
            });
    }

    private static allergiesToString({
        name,
        description,
        response,
    }: {
        name: string;
        description: string;
        response: string;
    }): string {
        return [name, description, response]
            .filter((prop) => prop?.length > 0)
            .join(', ');
    }

    private static medicationToString(med: {
        name: string;
        doctor: string;
        dosage: string;
    }): string {
        return `${med.name} is prescribed by ${med.doctor} and should be taken "${med.dosage}"`;
    }

    private static contactToString(contact: ContactDbEntry): string {
        return [
            `${contact.first_name} ${contact.last_name}`,
            contact.relationship,
            contact.phone,
            contact.email,
        ].join(', ');
    }
}
