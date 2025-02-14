import { NewStudentDbEntry, StudentDbEntry, StudentForm } from "@sol/student/domain";

export function _mapStudentFormToStudentDbEntry(
    form: StudentForm
): StudentDbEntry | NewStudentDbEntry {
    const entry: StudentDbEntry | NewStudentDbEntry = {
        first_name: form.firstName,
        last_name: form.lastName,
        code_word: form.pickupCodeword,
        primary_email: form.contactEmail,
        primary_first_name: form.contactFirstName,
        primary_last_name: form.contactLastName,
        ok_to_photograph:
            form.photography === 'yes' || form.photography === 'yesNoName',
        ok_use_name_photographs: form.photography === 'yes',
        ok_deet_bugspray: form.deetBugspray,
        ok_sunscreen: form.sunscreen,
        ok_natural_bugspray: form.naturalBugspray,
        birth_date: form.birthdate,
        emergency_contacts: form.emergencyContacts.map((c) => ({
            first_name: c.name,
            last_name: 'string',
            relationship: c.relationship,
            phone: c.phone,
            email: '',
        })),
        authorized_pick_up_contacts:
            form.authorizedForPickup?.map((c) => ({
                first_name: c.name,
                last_name: 'string',
                relationship: c.relationship,
                phone: c.phone,
                email: '',
            })) ?? [],
        tshirt_size: form.tshirtSize,
        pronouns: form.pronouns,
        primary_phone: form.contactPhone,
        student_email: form.studentEmail,
        student_phone: form.studentPhone,
        student_address: form.address,
        student_city: form.city,
        student_state: form.state,
        student_zip: form.zip,
        school: form.school,
        guardians: form.guardians.map((g) => ({
            first_name: g.guardianName,
            last_name: '',
            email: g.guardianEmail,
            phone: g.guardianPhone,
            relationship: g.guardianRelationship,
            resides_with_student: g.guardianResidesWithStudent,
        })),
        allergies: form.allergies ?? '',
        medications: form.medications ?? [],
        weightPounds: form.weightImperial,
        heightFeet: form.heightFeet,
        heightInches: form.heightInches,
        has_life_threatening_allergies: form.hasLifeThreateningAllergies,
        authorized_to_administer_meds: form.authorizedToAdministerMedication,
        medical_notes: form.medicalNotes ?? '',
        insurance_company: form.insuranceCompany,
        insurance_id: form.insuranceId,
        does_not_have_insurance: form.doesNotHaveInsurance,
        doctor: form.doctorName,
        doctor_phone: form.doctorPhone,
        parent_notes: form.notes,
    };
    if (form.id) {
        Object.assign(entry, { id: form.id });
    }
    return entry;
}