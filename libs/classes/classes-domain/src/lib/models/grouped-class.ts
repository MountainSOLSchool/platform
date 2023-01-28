import { Class } from './class';

export interface GroupedClass extends Class {
    classIds: Array<string>;
}
