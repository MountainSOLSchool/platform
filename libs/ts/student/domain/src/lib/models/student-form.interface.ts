export interface StudentForm {
    id: string | undefined;
    firstName: string;
    lastName: string;
    birthdate: string;
    pronouns: string;
    school: string;
    tshirtSize: string;
    notes: string;
    contactEmail: string;
    contactFirstName: string;
    contactLastName: string;
    studentEmail: string;
    contactPhone: string;
    studentPhone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    deetBugspray: boolean;
    naturalBugspray: boolean;
    sunscreen: boolean;
    photography: 'yes' | 'no' | 'yesNoName';
    guardians: Array<{
        guardianName: string;
        guardianRelationship: string;
        guardianPhone: string;
        guardianEmail: string;
        guardianResidesWithStudent?: boolean;
    }>;
    pickupCodeword: string;
    authorizedForPickup: Array<{
        name: string;
        relationship: string;
        phone: string;
    }>;
    emergencyContacts: Array<{
        name: string;
        relationship: string;
        phone: string;
    }>;
    weightImperial: number;
    heightFeet: number;
    heightInches: number;
    doctorName: string;
    doctorPhone: string;
    insuranceCompany: string;
    insuranceId: string;
    doesNotHaveInsurance: boolean;
    hasLifeThreateningAllergies: boolean;
    allergies: string | undefined;
    medications: Array<{
        name: string;
        dosage: string;
        doctor: string;
    }>;
    authorizedToAdministerMedication: boolean;
    medicalNotes: string | undefined;
}
