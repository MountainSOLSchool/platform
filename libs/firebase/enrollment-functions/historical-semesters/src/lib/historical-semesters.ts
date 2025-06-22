import { Functions } from '@sol/firebase/functions';
import { DatabaseUtility } from '@sol/firebase/database';

export const historicalSemesters = Functions.endpoint.handle<
    | {
        ids: Array<string>;
    }
    | undefined
>(async (_, response) => {
    const semestersCollection =
        await DatabaseUtility.getCollectionRef('semesters');
    const semesters = await semestersCollection.get().then((snapshot) =>
        snapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().displayName,
        }))
    );

    const currentSemester = await DatabaseUtility.getDocumentRef(
        `config/activeSemester`
    );
    const activeSemesterId = await currentSemester
        .get()
        .then((doc) => doc.data()?.id);

    response.send({
        semesters,
        activeSemesterId,
    });
});
