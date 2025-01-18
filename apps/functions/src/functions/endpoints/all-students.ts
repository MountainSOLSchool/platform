import { Functions, Role } from '@sol/firebase/functions';
import { StudentDbEntry } from '@sol/student/domain';
import { StudentRepository } from '@sol/student/repository';

export const allStudents = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle<{
        fields: Array<keyof StudentDbEntry>;
    }>(async (request, response) => {
        const students = await StudentRepository.allStudentsOfAllTime();

        const fields = request.body.data.fields;

        response.send({
            students: students.map((student) => ({
                ...fields.reduce(
                    (acc, field) => ({ ...acc, [field]: student[field] }),
                    {} as Partial<StudentDbEntry>
                ),
            })),
        });
    });
