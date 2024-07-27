import { ContactDbEntry, StudentDbEntry } from '@sol/student/domain';
import { TableHeader } from '@sol/table/domain';
import { FlatRecord } from '@sol/record/domain';
import { TableHtmlFactory } from '@sol/table/html';

type StudentHealthPropertyNames =
    | 'lastName'
    | 'firstName'
    | 'allergies'
    | 'medications'
    | 'weight'
    | 'height'
    | 'hasLifeThreateningAllergies'
    | 'authorizedToAdministerMedication'
    | 'medicalNotes'
    | 'insurance'
    | 'doctor'
    | 'emergencyContacts';

type TitleArgs = [className: string];

export class StudentHealthTableFactory extends TableHtmlFactory<
    StudentDbEntry,
    StudentHealthPropertyNames,
    TitleArgs
> {
    protected getTitle(...[className]: TitleArgs): string {
        return `Health Info for ${className}`;
    }

    protected getHeaders(): Array<TableHeader<StudentHealthPropertyNames>> {
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
                title: 'Allergies',
                propertyName: 'allergies',
            },
            {
                title: 'Medications',
                propertyName: 'medications',
            },
            {
                title: 'Weight',
                propertyName: 'weight',
            },
            {
                title: 'Height',
                propertyName: 'height',
            },
            {
                title: 'Life Threatening Allergies',
                propertyName: 'hasLifeThreateningAllergies',
            },
            {
                title: 'Authorized to Administer Medication',
                propertyName: 'authorizedToAdministerMedication',
            },
            {
                title: 'Medical Notes',
                propertyName: 'medicalNotes',
            },
            {
                title: 'Insurance',
                propertyName: 'insurance',
            },
            {
                title: 'Doctor',
                propertyName: 'doctor',
            },
            {
                title: 'Emergency Contacts',
                propertyName: 'emergencyContacts',
            },
        ];
    }

    protected getRecords(
        students: Array<StudentDbEntry>
    ): Array<FlatRecord<StudentHealthPropertyNames>> {
        return students
            .map((student) => ({
                lastName: { value: student.last_name },
                firstName: { value: student.first_name },
                allergies: { value: student.allergies },
                medications: {
                    value: student.medications
                        .map(this.medicationToString)
                        .join('\n'),
                },
                weight: {
                    value: `${student.weightPounds} lbs`,
                },
                height: {
                    value: `${student.heightFeet}' ${student.heightInches}"`,
                },
                hasLifeThreateningAllergies: {
                    value: student.has_life_threatening_allergies
                        ? 'Yes'
                        : 'No',
                },
                authorizedToAdministerMedication: {
                    value: student.authorized_to_administer_meds ? 'Yes' : 'No',
                },
                medicalNotes: { value: student.medical_notes },
                insurance: {
                    value: `${student.insurance_company} [${student.insurance_id}]`,
                },
                doctor: {
                    value: `${student.doctor}, #${student.doctor_phone}`,
                },
                emergencyContacts: {
                    value: student.emergency_contacts
                        .map(this.contactToString)
                        .join('\n'),
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
