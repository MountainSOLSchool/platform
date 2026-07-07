export interface RosterStudentContact {
    name: string;
    relationship: string;
    phone: string;
    email: string;
}

export interface RosterStudent {
    id: string;
    firstName: string;
    lastName: string;
    age: number | null;
    guardians: Array<RosterStudentContact>;
    authorizedPickUp: Array<RosterStudentContact>;
    codeWord: string;
    additionalOptions: Array<string>;
    allergies: string;
    hasLifeThreateningAllergies: boolean;
    medications: Array<string>;
}

export interface ClassRosterRequest {
    classId: string;
    semesterId: string;
}

export interface ClassRosterResponse {
    students: Array<RosterStudent>;
}
