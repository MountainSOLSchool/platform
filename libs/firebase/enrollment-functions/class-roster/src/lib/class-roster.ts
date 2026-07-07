import { StudentRepository } from '@sol/student/repository';
import { Functions, Role } from '@sol/firebase/functions';
import { Semester } from '@sol/firebase/classes/semester';
import { SpecificSemesterRepository } from '@sol/classes/repository';
import { ContactDbEntry } from '@sol/student/domain';
import type {
    RosterStudent,
    RosterStudentContact,
} from '@sol/ts/firebase/api-types';

function contactToDto(contact: ContactDbEntry): RosterStudentContact {
    return {
        name: [contact.first_name, contact.last_name].filter(Boolean).join(' '),
        relationship: contact.relationship ?? '',
        phone: contact.phone ?? '',
        email: contact.email ?? '',
    };
}

function ageFromBirthDate(birthDate: string): number | null {
    if (!birthDate) return null;
    const today = new Date();
    const birth = new Date(birthDate);
    if (Number.isNaN(birth.getTime())) return null;
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
        age--;
    }
    return age;
}

async function getClassRosterStudents(
    classId: string,
    semesterId: string
): Promise<Array<RosterStudent>> {
    const students = await StudentRepository.of(
        SpecificSemesterRepository.of(semesterId)
    ).getInClass(classId);

    const theClass = await Semester.of(semesterId).classes.get(classId);

    return students
        .map((student): RosterStudent => {
            const additionalOptions =
                theClass.additionalOptions
                    ?.filter((option) =>
                        option.studentsIds?.includes(student.id)
                    )
                    .map((option) => option.description) ?? [];

            return {
                id: student.id,
                firstName: student.first_name,
                lastName: student.last_name,
                age: ageFromBirthDate(student.birth_date),
                guardians: (student.guardians ?? []).map(contactToDto),
                authorizedPickUp: (
                    student.authorized_pick_up_contacts ?? []
                ).map(contactToDto),
                codeWord: student.code_word ?? '',
                additionalOptions,
                allergies: student.allergies ?? '',
                hasLifeThreateningAllergies:
                    student.has_life_threatening_allergies ?? false,
                medications: (student.medications ?? []).map((med) =>
                    med.dosage ? `${med.name} (${med.dosage})` : med.name
                ),
            };
        })
        .sort(
            (a, b) =>
                a.lastName.localeCompare(b.lastName) ||
                a.firstName.localeCompare(b.firstName)
        );
}

export const classRoster = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle<
        unknown,
        { classId: string; semesterId: string }
    >(async (request, response) => {
        const { classId, semesterId } = request.query;
        const students = await getClassRosterStudents(classId, semesterId);
        response.send({ students });
    });
