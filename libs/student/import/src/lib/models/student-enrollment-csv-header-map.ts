import { StudentEnrollmentEntry } from './student-enrollment-entry.interface';

export const StudentEnrollmentCsvHeaderMap: Record<
    string,
    keyof StudentEnrollmentEntry | Array<keyof StudentEnrollmentEntry>
> = {
    'Submission Date': 'submissionDate',
    'First Name': new Array<keyof StudentEnrollmentEntry>(
        'firstName',
        'emergencyContactOneFirstName',
        'emergencyContactTwoFirstName',
        'emergencyContactThreeFirstName',
        'emergencyContactFourFirstName'
    ),
    'Last Name': new Array<keyof StudentEnrollmentEntry>(
        'lastName',
        'emergencyContactOneLastName',
        'emergencyContactTwoLastName',
        'emergencyContactThreeLastName',
        'emergencyContactFourLastName'
    ),
    'Date of birth': 'dateOfBirth',
    'School (or n/a for adults)': 'school',
    'Street Address': 'streetAddressLineOne',
    'Street Address Line 2': 'streetAddressLineTwo',
    City: 'city',
    State: 'state',
    'Zip Code': 'zipCode',
    'Phone Number': new Array<keyof StudentEnrollmentEntry>(
        'phoneNumber',
        'emergencyContactOnePhoneNumber',
        'emergencyContactTwoPhoneNumber',
        'emergencyContactThreePhoneNumber',
        'emergencyContactFourPhoneNumber'
    ),
    'Primary email contact': 'primaryEmailContact',
    'Have you previously signed up for Fall/Winter 2022 classes with us?':
        'didSignUpForWinterClasses',
    'May we take photographs and/or video of your student to use for Mountain SOL advertising purposes?':
        'canPhotograph',
    Relationship: new Array<keyof StudentEnrollmentEntry>(
        'emergencyContactOneRelationship',
        'emergencyContactTwoRelationship',
        'emergencyContactThreeRelationship',
        'emergencyContactFourRelationship'
    ),
    Email: new Array<keyof StudentEnrollmentEntry>(
        'emergencyContactOneEmail',
        'emergencyContactTwoEmail',
        'emergencyContactThreeEmail',
        'emergencyContactFourEmail'
    ),
    'Add another parent/guardian/emergency contact?': new Array<
        keyof StudentEnrollmentEntry
    >(
        'addEmergencyContactTwo',
        'addEmergencyContactThree',
        'addEmergencyContactFour'
    ),
    'Emergency contacts -- child lives with': 'emergencyContactHousingType',
    'Which parent?': 'emergencyContactHousingName',
    'Other:': 'emergencyContactHousingOther',
    'Please add full name, relationship and phone. Save after each person.':
        'authorizedPickupEntries',
    'Code word': 'codeWord',
    Gender: 'gender',
    "Doctor's Name": 'doctorName',
    "Doctor's phone": 'doctorPhone',
    Weight: 'weight',
    Height: 'height',
    'Medical Insurance Company': 'medicalInsuranceCompany',
    'Medical ID Number': 'medicalIdNumber',
    "Primary Insured Individual's name": 'primaryInsuredIndividualName',
    'No Label': 'medicationDosageFrequencyEntries',
    'Medical Authorization': 'medicalAuthorization',
    'Sunscreen and Insect Repellent': 'canUseSunscreenAndInsectRepellant',
    'Special health considerations:': 'specialHealthConsiderations',
    'Child information (optional):': 'childInformationNote',
    'By checking the box below, I hereby certify that the above information is correct':
        'isSignedForCorrectness',
    Signature: new Array<keyof StudentEnrollmentEntry>(
        'correctnessSignatureUrl',
        'liabilitySignatureUrl'
    ),
    'Release of liability and hold harmless': 'isReleasedOfLiability',
    'My Products': 'classes',
};
