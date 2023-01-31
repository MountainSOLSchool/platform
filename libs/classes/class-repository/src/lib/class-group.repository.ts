import { DatabaseUtility } from '@sol/firebase/database';
import { SemesterClassGroup } from '@sol/classes/domain';
import { ClassRepository } from './class.repository';

export class ClassGroupRepository {
    protected constructor(private readonly semesterId: string) {}
    static of(semesterId: string): ClassGroupRepository {
        return new ClassGroupRepository(semesterId);
    }
    private get groupsPath(): string {
        return `semesters/${this.semesterId}/groups`;
    }

    async get(id: string): Promise<SemesterClassGroup> {
        const document = await DatabaseUtility.getDocumentRef(
            `${this.groupsPath}/${id}`
        );
        const [data] = await DatabaseUtility.getHydratedDocuments([document]);
        return await this.convertDboToDomain(data);
    }

    private async convertDboToDomain(dbo: any): Promise<SemesterClassGroup> {
        return {
            ...dbo,
            classes: await ClassRepository.of(this.semesterId).getMany(
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
        const query = await DatabaseUtility.fetchMatchingDocuments(
            await DatabaseUtility.getCollectionRef(this.groupsPath),
            ['start', '>=', new Date(startsAt)]
        );
        const groupIds = query.map((doc) => doc.id);
        return this.getMany(groupIds);
    }
}
