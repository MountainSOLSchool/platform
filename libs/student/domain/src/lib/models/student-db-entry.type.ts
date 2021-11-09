import { ContactDbEntry } from './contact-db-entry.type';

export type StudentDbEntry = {
    first_name: string;
    last_name: string;
    code_word: string;
    ok_to_photograph: boolean;
    ok_use_name_photographs: boolean;
    sunscreen_bug_spray: string;
    birth_date: string;
    guardians: Array<ContactDbEntry>;
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
        doctor: { name: string; role?: string };
        important: boolean;
    }>;
};
