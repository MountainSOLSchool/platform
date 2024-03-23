import { V1Functions, V1Role } from '@sol/firebase/functions';
import { StudentRepository } from '@sol/student/repository';
import { Semester } from '@sol/firebase/classes/semester';
import { SignInTableFactory } from '@sol/student/reports';
import { SpecificSemesterRepository } from '@sol/classes/repository';

async function getClassSignInTable(classId: string, semesterId: string) {
    const students = await StudentRepository.of(
        SpecificSemesterRepository.of(semesterId)
    ).getInClass(classId);

    const className = await Semester.of(semesterId)
        .classes.get(classId)
        .then((c) => c.title);

    return new SignInTableFactory().build(students, [className]);
}

export const signIn = V1Functions.endpoint
    .restrictedToRoles(V1Role.Admin)
    .handle<
        unknown,
        { classId: string; semesterId: string }
    >(async (request, response) => {
        const { classId, semesterId } = request.query;

        const htmlTable = await getClassSignInTable(classId, semesterId);

        response.send({ html: htmlTable });
    });
