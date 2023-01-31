import { SemesterClass } from './semester-class';

export interface SemesterClassGroup {
    id: string;
    classes: Array<SemesterClass>;
    name: string;
    cost: number;
}
