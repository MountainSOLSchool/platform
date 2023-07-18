import { SemesterRepository } from './semester.repository';

export class SpecificSemesterRepository extends SemesterRepository {
    protected constructor(private readonly id: string) {
        super();
    }

    static of(semesterId: string): SpecificSemesterRepository {
        return new SpecificSemesterRepository(semesterId);
    }

    async getPath(): Promise<string> {
        return `semesters/${this.id}`;
    }
}
