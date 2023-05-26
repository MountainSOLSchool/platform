import { ClassRepository } from './class.repository';
import { ClassGroupRepository } from './class-group.repository';
import { StudentRepository } from '@sol/student/repository';

export class SemesterRepository {
    protected constructor(private readonly id: string) {}

    static of(semesterId: string): SemesterRepository {
        return new SemesterRepository(semesterId);
    }

    get classes(): ClassRepository {
        return ClassRepository.of(this.id);
    }

    get groups(): ClassGroupRepository {
        return ClassGroupRepository.of(this.id);
    }

    get students(): StudentRepository {
        return StudentRepository.of(this.id);
    }
}
