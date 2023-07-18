import { DatabaseUtility } from '@sol/firebase/database';
import { SemesterClassGroup } from '@sol/classes/domain';
import { ClassRepository } from './class.repository';
import { SemesterRepository } from './semester.repository';

export class ClassGroupRepository {
    protected constructor(private readonly semester: SemesterRepository) {}
    static of(semester: SemesterRepository): ClassGroupRepository {
        return new ClassGroupRepository(semester);
    }
    private async getGroupsPath(): Promise<string> {
        return `${await this.semester.getPath()}/groups`;
    }

    async get(id: string): Promise<SemesterClassGroup> {
        const document = await DatabaseUtility.getDocumentRef(
            `${await this.getGroupsPath()}/${id}`
        );
        const [data] = await DatabaseUtility.getHydratedDocuments([document]);
        return await this.convertDboToDomain(data);
    }

    private async convertDboToDomain(dbo: any): Promise<SemesterClassGroup> {
        return {
            ...dbo,
            classes: await ClassRepository.of(this.semester).getMany(
                dbo.classIds
            ),
        };
    }

    async getMany(ids: Array<string>): Promise<SemesterClassGroup[]> {
        return await Promise.all(
            ids.map(async (id) => {
                return await this.get(id);
            })
        );
    }
    async getByStartsAtOrAfter(
        startsAt: number
    ): Promise<SemesterClassGroup[]> {
        const groupsCollection = await DatabaseUtility.getCollectionRef(
            await this.getGroupsPath()
        );
        const groupDocs = await groupsCollection.listDocuments();
        const groupIds = groupDocs.map((doc) => doc.id);
        const groups = await this.getMany(groupIds);
        const groupsWithAllClassesStartingAfter = groups.filter((group) => {
            return group.classes.every((classItem) => {
                return classItem.startMs >= startsAt;
            });
        });
        return groupsWithAllClassesStartingAfter;
    }

    async getByClassIds(
        classIds: Array<string>
    ): Promise<SemesterClassGroup[]> {
        const groupsCollection = await DatabaseUtility.getCollectionRef(
            await this.getGroupsPath()
        );
        const groupDocs = await groupsCollection.listDocuments();
        const groupIds = groupDocs.map((doc) => doc.id);
        const groups = await this.getMany(groupIds);
        return groups.filter((group) =>
            group.classes.every(({ id }) => classIds.includes(id))
        );
    }
}
