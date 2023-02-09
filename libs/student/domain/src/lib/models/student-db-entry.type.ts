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
    ok_to_photograph: boolean;
    ok_use_name_photographs: boolean;
    sunscreen_bug_spray: string;
    birth_date: string;
    emergency_contacts: Array<ContactDbEntry>;
    authorized_pick_up_contacts: Array<ContactDbEntry>;
    allergies: Array<{
        name: string;
        description: string;
        response: string;
        important: boolean;
    }>;
    medications: Array<{
        name: string;
        dosage: string;
        doctor: string;
        important: boolean;
    }>;
    tshirt_size: string;
    weightPounds: number;
    heightFeet: number;
    heightInches: number;
};

export type NewStudentDbEntry = Omit<StudentDbEntry, 'id'>;
