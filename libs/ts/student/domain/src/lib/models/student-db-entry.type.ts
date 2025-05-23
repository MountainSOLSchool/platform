import { ContactDbEntry } from './contact-db-entry.type';

export type StudentDbEntry = {
    id: string;
    first_name: string;
    last_name: string;
    pronouns: string;
    code_word: string;
    primary_email: string;
    primary_first_name: string;
    primary_last_name: string;
    primary_phone: string;
    student_email: string;
    student_phone: string;
    student_address: string;
    student_city: string;
    student_state: string;
    student_zip: string;
    school: string;
    ok_to_photograph: boolean;
    ok_use_name_photographs: boolean;
    ok_deet_bugspray: boolean;
    ok_natural_bugspray: boolean;
    ok_sunscreen: boolean;
    birth_date: string;
    authorized_pick_up_contacts: Array<ContactDbEntry>;
    guardians: Array<ContactDbEntry>;
    tshirt_size: string;
    emergency_contacts: Array<ContactDbEntry>;
    has_life_threatening_allergies: boolean;
    allergies: string;
    authorized_to_administer_meds: boolean;
    medications: Array<{
        name: string;
        dosage: string;
        doctor: string;
    }>;
    medical_notes: string;
    insurance_company: string;
    insurance_id: string;
    does_not_have_insurance: boolean;
    doctor: string;
    doctor_phone: string;
    weightPounds: number;
    heightFeet: number;
    heightInches: number;
    parent_notes: string;
    last_reviewed_student_info_timestamp?: string;
    completed_units?: Array<
        | DocumentReference
        | {
              recorded_date: string;
              unit: DocumentReference;
              applied_to_path?: DocumentReference;
          }
    >;
};

type DocumentReference = { id: string };

export type NewStudentDbEntry = Omit<StudentDbEntry, 'id'>;
