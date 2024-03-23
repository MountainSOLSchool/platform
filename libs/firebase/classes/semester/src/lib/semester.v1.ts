import { V1StudentRepository } from '@sol/student/repository';
import {
    V1ClassRepository,
    V1ClassGroupRepository,
    SpecificSemesterRepository,
} from '@sol/classes/repository';
import {
    SemesterRepository,
    ActiveSemesterRepository,
} from '@sol/classes/repository';

export class V1Semester {
    protected constructor(private readonly repository: SemesterRepository) {}

    static active(): V1Semester {
        return new V1Semester(ActiveSemesterRepository.of());
    }

    static of(semesterId: string): V1Semester {
        return new V1Semester(SpecificSemesterRepository.of(semesterId));
    }

    get classes(): V1ClassRepository {
        return V1ClassRepository.of(this.repository);
    }

    get groups(): V1ClassGroupRepository {
        return V1ClassGroupRepository.of(this.repository);
    }

    get students(): V1StudentRepository {
        return V1StudentRepository.of(this.repository);
    }
}
