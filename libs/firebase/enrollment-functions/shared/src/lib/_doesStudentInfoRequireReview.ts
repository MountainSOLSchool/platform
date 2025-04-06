import { StudentDbEntry } from "@sol/student/domain";
import { StudentRepository } from "@sol/student/repository";
import { isEqual } from "lodash";

export async function _doesStudentInfoRequireReview(studentDbEntry: StudentDbEntry): Promise<boolean> {
    const medicalInfoFields: Array<keyof StudentDbEntry> = [
        'emergency_contacts',
        'has_life_threatening_allergies',
        'allergies',
        'authorized_to_administer_meds',
        'medications',
        'medical_notes',
        'insurance_company',
        'insurance_id',
        'doctor',
        'doctor_phone',
        'weightPounds',
        'heightFeet',
        'heightInches',
        'parent_notes'
    ];

    const getMedicalInfo = (entry: StudentDbEntry) =>
        Object.fromEntries(
            medicalInfoFields.map((field) => [field, entry[field]])
        );

    const currentStudentDbEntry = await StudentRepository.get(studentDbEntry.id);

    if (!currentStudentDbEntry) {
        return false;
    }

    const currentMedicalInfo = getMedicalInfo(currentStudentDbEntry);
    const updatedMedicalInfo = getMedicalInfo(studentDbEntry);

    const hasMedicalInfoChanged = !isEqual(
        currentMedicalInfo,
        updatedMedicalInfo
    );

    if (hasMedicalInfoChanged) {
        return false;
    }

    const twoYearsAgo = new Date();
    twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);

    return !currentStudentDbEntry.last_updated_medical_info_timestamp ||
        new Date(currentStudentDbEntry.last_updated_medical_info_timestamp) > twoYearsAgo;
}