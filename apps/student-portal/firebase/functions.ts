import {
    connectFunctionsEmulator,
    getFunctions,
    httpsCallable,
} from 'firebase/functions';
import { StudentDbEntry } from '@sol/student/domain';
import { SemesterClass } from '@sol/classes/domain';
import { Path } from '../models/path.type';
import { RepeatableUnitCompletion } from '../store/updateUnits/updateUnitsSlice';

let _functions: ReturnType<typeof getFunctions> | undefined;

const isProduction = process.env.NODE_ENV === 'production';

export class FirebaseFunctions {
    private static get functions() {
        _functions ??= getConfiguredFunctions();
        return _functions;
    }

    static async getSemesters(): Promise<Array<{ name: string; id: string }>> {
        const getSemestersFn = httpsCallable<
            void,
            {
                semesters: Array<{ name: string; id: string }>;
                currentSemesterId: string;
            }
        >(this.functions, 'historicalSemesters');
        const result = await getSemestersFn();
        return result.data.semesters;
    }

    static async getClassesForSemester(
        semesterId: string
    ): Promise<Array<SemesterClass>> {
        const getClassesForSemesterFn = httpsCallable<
            { query: { semesterId: string } },
            {
                classes: Array<SemesterClass>;
            }
        >(this.functions, 'classes');
        const result = await getClassesForSemesterFn({ query: { semesterId } });
        return result.data.classes;
    }

    static async getAllStudents(
        fields: Array<keyof StudentDbEntry>
    ): Promise<Array<StudentDbEntry>> {
        const allStudentsFn = httpsCallable<
            { fields: Array<keyof StudentDbEntry> },
            { students: Array<StudentDbEntry> }
        >(this.functions, 'allStudents');
        const result = await allStudentsFn({ fields });
        return result.data.students;
    }

    static async getFullUnitsAndPaths(): Promise<{
        paths: Array<Path>;
        units: Record<
            string,
            {
                name: string;
                description: string;
                category: string;
                isRepeatable: boolean;
                prereqUnitIds: Array<string>;
            }
        >;
    }> {
        const getPathsFn = httpsCallable<
            void,
            {
                paths: Array<Path>;
                units: Record<
                    string,
                    {
                        name: string;
                        description: string;
                        category: string;
                        isRepeatable: boolean;
                        prereqUnitIds: Array<string>;
                    }
                >;
            }
        >(this.functions, 'fullUnitsAndPaths');
        const result = await getPathsFn();
        return result.data;
    }

    static async updateCompletedUnits(
        studentId: string,
        completedUnitIds: Array<string>,
        repeatableCompletions: RepeatableUnitCompletion[]
    ): Promise<void> {
        const updateCompletedUnitsFn = httpsCallable<
            {
                studentId: string;
                completedUnitIds: Array<string>;
                repeatableCompletions: RepeatableUnitCompletion[];
            },
            void
        >(this.functions, 'updateCompletedUnits');

        await updateCompletedUnitsFn({
            studentId,
            completedUnitIds,
            repeatableCompletions: repeatableCompletions.map((completion) => ({
                unitId: completion.unitId,
                recordedDate: completion.recordedDate,
                appliedToPath: completion.appliedToPath,
            })),
        });

        return undefined;
    }

    static async getCompletedUnitIds(studentId: string): Promise<{
        regularUnitIds: Array<string>;
        repeatableCompletions: RepeatableUnitCompletion[];
    }> {
        const getCompletedUnitsFn = httpsCallable<
            { studentId: string },
            {
                completedUnits: Array<{
                    type: 'regular' | 'repeatable';
                    unitId: string;
                    recordedDate?: string;
                    appliedToPath?: string;
                }>;
            }
        >(this.functions, 'getCompletedUnits');

        const result = await getCompletedUnitsFn({ studentId });

        // Process the result to separate regular units from repeatable completions
        const regularUnitIds: string[] = [];
        const repeatableCompletions: RepeatableUnitCompletion[] = [];

        result.data.completedUnits.forEach((item) => {
            if (item.type === 'regular') {
                regularUnitIds.push(item.unitId);
            } else {
                repeatableCompletions.push({
                    unitId: item.unitId,
                    recordedDate: item.recordedDate as string,
                    appliedToPath: item.appliedToPath,
                });
            }
        });

        return {
            regularUnitIds,
            repeatableCompletions,
        };
    }

    static async getStudentCompletedUnits(
        studentId: string
    ): Promise<{ name: string; completed_units: Array<string> }> {
        const getCompletedUnitsFn = httpsCallable<
            { studentId: string },
            {
                student: {
                    name: string;
                    completed_units: Array<string>;
                };
            }
        >(this.functions, 'getStudentCompletedUnits');
        const result = await getCompletedUnitsFn({ studentId });
        return result.data.student;
    }

    static async getRoles(): Promise<Array<string>> {
        const getRolesFn = httpsCallable<void, Array<string>>(
            this.functions,
            'roles'
        );
        const result = await getRolesFn();
        return result.data;
    }
}

function getConfiguredFunctions() {
    const functions = getFunctions();
    if (!isProduction) {
        connectFunctionsEmulator(functions, 'localhost', 5001);
    }
    return functions;
}
