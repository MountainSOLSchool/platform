import { ContactDbEntry, StudentDbEntry } from '@sol/student/domain';
import { TableHeader } from '@sol/table/domain';
import { FlatRecord } from '@sol/record/domain';
import { TableHtmlFactory } from '@sol/table/html';

export type StudentRecordPropertyNames =
    | 'lastName'
    | 'firstName'
    | 'age'
    | 'guardianContacts'
    | 'emergencyContacts'
    | 'authorizedPickUpContacts'
    | 'codeWord'
    | 'medications'
    | 'sunscreenBugSpray'
    | 'allergies'
    | 'okToPhotographAndUseName';

type TitleArgs = [className: string];

type Metadata = { isImportant: boolean };

export class RosterTableFactory extends TableHtmlFactory<
    StudentDbEntry,
    StudentRecordPropertyNames,
    TitleArgs,
    Metadata
> {
    protected getTitle(...[className]: TitleArgs): string {
        return `Class Roster for ${className}`;
    }

    protected getHeaders(): Array<TableHeader<StudentRecordPropertyNames>> {
        return [
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
        ];
    }

    protected getRecords(
        students: Array<StudentDbEntry>
    ): Array<FlatRecord<StudentRecordPropertyNames, Metadata>> {
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
                    value:
                        student.guardians
                            ?.map(this.contactToString)
                            .join('\n') ?? '',
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
                        isImportant: false,
                    },
                },
                sunscreenBugSpray: {
                    value:
                        student.ok_natural_bugspray &&
                        student.ok_deet_bugspray &&
                        student.ok_sunscreen
                            ? 'Yes'
                            : 'No',
                },
                allergies: {
                    value: student.allergies ?? '',
                    metadata: {
                        isImportant: student.has_life_threatening_allergies,
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

    private medicationToString(med: {
        name: string;
        doctor: string;
        dosage: string;
    }): string {
        return `${med.name} is prescribed by ${med.doctor} and should be taken "${med.dosage}"`;
    }

    private contactToString(contact: ContactDbEntry): string {
        return [
            `${contact.first_name}`, // currently only one name is collected
            contact.relationship,
            contact.phone,
            contact.email,
        ].join(', ');
    }
}
