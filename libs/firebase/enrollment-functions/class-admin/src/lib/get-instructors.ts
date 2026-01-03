import { Functions, Role } from '@sol/firebase/functions';
import { DatabaseUtility } from '@sol/firebase/database';

export interface Instructor {
    id: string;
    firstName: string;
    lastName: string;
    archived?: boolean;
}

export const getInstructors = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle(async (request, response) => {
        const db = DatabaseUtility.getDatabase();
        const instructorsSnapshot = await db.collection('teachers').get();

        const instructors: Instructor[] = instructorsSnapshot.docs
            .map((doc) => {
                const data = doc.data();
                return {
                    id: doc.id,
                    firstName: data.first_name || '',
                    lastName: data.last_name || '',
                    archived: data.archived ?? false,
                };
            })
            .filter((instructor) => !instructor.archived)
            .sort((a, b) =>
                `${a.lastName} ${a.firstName}`.localeCompare(
                    `${b.lastName} ${b.firstName}`
                )
            );

        response.send(instructors);
    });
