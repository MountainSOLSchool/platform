import { V1Functions } from '@sol/firebase/functions';
import { V1DatabaseUtility } from '@sol/firebase/database';

export const historicalSemesters = V1Functions.endpoint.handle<
    | {
          ids: Array<string>;
      }
    | undefined
>(async (request, response) => {
    const semestersCollection =
        await V1DatabaseUtility.getCollectionRef('semesters');
    const semesters = await semestersCollection.get().then((snapshot) =>
        snapshot.docs.map((doc) => ({
            id: doc.id,
            name: doc.data().displayName,
        }))
    );

    const currentSemester = await V1DatabaseUtility.getDocumentRef(
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
