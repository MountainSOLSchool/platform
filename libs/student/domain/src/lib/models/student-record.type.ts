import { StudentRecordPropertyNames } from "./student-record-property-names";
import {FlatRecord} from '@sol/record/domain';

export type StudentRecord = FlatRecord<StudentRecordPropertyNames, { isImportant: boolean }>;