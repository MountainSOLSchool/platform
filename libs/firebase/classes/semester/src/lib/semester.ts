import { V1StudentRepository } from '@sol/student/repository';
import {
    V1ClassRepository,
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

    get classes(): V1ClassRepository {
        return V1ClassRepository.of(this.repository);
    }

    get groups(): ClassGroupRepository {
        return ClassGroupRepository.of(this.repository);
    }

    get students(): V1StudentRepository {
        return V1StudentRepository.of(this.repository);
    }
}
