import { Contact } from './contact.type';

export type StudentDbEntry = {
    first_name: string;
    last_name: string;
    code_word: string;
    ok_to_photograph: boolean;
    ok_use_name_photographs: boolean;
    sunscreen_bug_spray: string;
    birth_date: string;
    guardians: Array<Contact>;
    emergency_contacts: Array<Contact>;
    authorized_pick_up_contacts: Array<Contact>;
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
