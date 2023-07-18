import { StudentRepository } from '@sol/student/repository';
import {
    ClassRepository,
    ClassGroupRepository,
    SpecificSemesterRepository,
} from '@sol/classes/repository';
import {
    SemesterRepository,
    ActiveSemesterRepository,
} from '@sol/classes/repository';

export class Semester {
    protected constructor(private readonly repository: SemesterRepository) {}

    static active(): Semester {
        return new Semester(ActiveSemesterRepository.of());
    }

    static of(semesterId: string): Semester {
        return new Semester(SpecificSemesterRepository.of(semesterId));
    }

    get classes(): ClassRepository {
        return ClassRepository.of(this.repository);
    }

    get groups(): ClassGroupRepository {
        return ClassGroupRepository.of(this.repository);
    }

    get students(): StudentRepository {
        return StudentRepository.of(this.repository);
    }
}
