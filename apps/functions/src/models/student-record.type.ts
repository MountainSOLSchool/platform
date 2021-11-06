import { FlatRecord } from "./flat-record.type";
import { StudentRecordPropertyNames } from "./student-record-property-names";

export type StudentRecord = FlatRecord<StudentRecordPropertyNames, { isImportant: boolean }>;