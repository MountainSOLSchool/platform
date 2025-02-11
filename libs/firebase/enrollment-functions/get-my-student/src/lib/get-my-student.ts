import { _assertUserCanManageStudent } from '@sol/firebase/enrollment-functions/shared';
import { AuthUtility, Functions } from '@sol/firebase/functions';
import { StudentDbEntry, StudentForm } from '@sol/student/domain';
import { StudentRepository } from '@sol/student/repository';

function _mapStudentDbEntryToStudentForm(dbEntry: StudentDbEntry): StudentForm {
    const form: StudentForm = {
        id: dbEntry.id,
        firstName: dbEntry.first_name,
        lastName: dbEntry.last_name,
        pickupCodeword: dbEntry.code_word,
        contactEmail: dbEntry.primary_email,
        contactFirstName: dbEntry.primary_first_name,
        contactLastName: dbEntry.primary_last_name,
        photography: dbEntry.ok_to_photograph
            ? dbEntry.ok_use_name_photographs
                ? 'yes'
                : 'yesNoName'
            : 'no',
        deetBugspray: dbEntry.ok_deet_bugspray,
        sunscreen: dbEntry.ok_sunscreen,
        naturalBugspray: dbEntry.ok_natural_bugspray,
        birthdate: dbEntry.birth_date,
        emergencyContacts: dbEntry.emergency_contacts.map((c) => ({
            name: c.first_name,
            relationship: c.relationship,
            phone: c.phone,
            email: '',
        })),
        authorizedForPickup:
            dbEntry.authorized_pick_up_contacts?.map((c) => ({
                name: c.first_name,
                relationship: c.relationship,
                phone: c.phone,
                email: '',
            })) ?? [],
        allergies: dbEntry.allergies,
        medications: dbEntry.medications,
        tshirtSize: dbEntry.tshirt_size,
        pronouns: dbEntry.pronouns,
        weightImperial: dbEntry.weightPounds,
        heightFeet: dbEntry.heightFeet,
        heightInches: dbEntry.heightInches,
        contactPhone: dbEntry.primary_phone,
        studentEmail: dbEntry.student_email,
        studentPhone: dbEntry.student_phone,
        address: dbEntry.student_address,
        city: dbEntry.student_city,
        state: dbEntry.student_state,
        zip: dbEntry.student_zip,
        school: dbEntry.school,
        guardians: dbEntry.guardians.map((g) => ({
            guardianName: g.first_name,
            guardianEmail: g.email,
            guardianPhone: g.phone,
            guardianRelationship: g.relationship,
            guardianResidesWithStudent: g.resides_with_student,
        })),
        hasLifeThreateningAllergies: dbEntry.has_life_threatening_allergies,
        authorizedToAdministerMedication: dbEntry.authorized_to_administer_meds,
        medicalNotes: dbEntry.medical_notes,
        insuranceCompany: dbEntry.insurance_company,
        insuranceId: dbEntry.insurance_id,
        doesNotHaveInsurance: dbEntry.does_not_have_insurance,
        doctorName: dbEntry.doctor,
        doctorPhone: dbEntry.doctor_phone,
        notes: dbEntry.parent_notes,
    };
    return form;
}

export const getMyStudent = Functions.endpoint.handle<{ studentId: string }>(
    async (request, response) => {
        const user = await AuthUtility.getUserFromRequest(request, response);
        if (!user) {
            response.send({ studentIds: [] });
            return;
        }
        const { studentId } = request.body.data;

        await _assertUserCanManageStudent(user, studentId, response);

        const student = await StudentRepository.get(studentId);

        if (!student) {
            response.status(404).send();
            return;
        }
        const form = _mapStudentDbEntryToStudentForm(student);
        response.send({ student: form });
    }
);
