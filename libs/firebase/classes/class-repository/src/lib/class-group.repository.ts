import { V1DatabaseUtility } from '@sol/firebase/database';
import { SemesterClassGroup } from '@sol/classes/domain';
import { ClassRepository } from './class.repository';
import { SemesterRepository } from './semester.repository';

type SemesterClassGroupDbo = Omit<SemesterClassGroup, 'classes'> & {
    classIds: Array<string>;
};

export class ClassGroupRepository {
    protected constructor(private readonly semester: SemesterRepository) {}
    static of(semester: SemesterRepository): ClassGroupRepository {
        return new ClassGroupRepository(semester);
    }
    private async getGroupsPath(): Promise<string> {
        return `${await this.semester.getPath()}/groups`;
    }

    async get(id: string): Promise<SemesterClassGroup> {
        const document = await V1DatabaseUtility.getDocumentRef(
            `${await this.getGroupsPath()}/${id}`
        );
        const [data] = await V1DatabaseUtility.getHydratedDocuments([document]);
        return await this.convertDboToDomain(data as SemesterClassGroupDbo);
    }

    private async convertDboToDomain(
        dbo: SemesterClassGroupDbo
    ): Promise<SemesterClassGroup> {
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
    async getOpenForRegistration(): Promise<SemesterClassGroup[]> {
        const groupsCollection = await V1DatabaseUtility.getCollectionRef(
            await this.getGroupsPath()
        );
        const groupDocs = await groupsCollection.listDocuments();
        const groupIds = groupDocs.map((doc) => doc.id);
        const groups = await this.getMany(groupIds);
        const now = Date.now();
        const groupsWithAllClassesStartingAfter = groups.filter((group) => {
            return group.classes.every((classItem) => {
                return classItem.live && classItem.registrationEndMs >= now;
            });
        });
        return groupsWithAllClassesStartingAfter;
    }

    async getByClassIds(
        classIds: Array<string>
    ): Promise<SemesterClassGroup[]> {
        const groupsCollection = await V1DatabaseUtility.getCollectionRef(
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
