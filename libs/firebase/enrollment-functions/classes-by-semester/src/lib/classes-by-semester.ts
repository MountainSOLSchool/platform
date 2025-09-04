import { Functions } from '@sol/firebase/functions';
import { SemesterClass, SemesterClassGroup } from '@sol/classes/domain';
import { DatabaseUtility } from '@sol/firebase/database';
import { ClassDbo, SemesterClassGroupDbo } from '@sol/classes/repository';
import admin from 'firebase-admin';

interface InstructorDbo {
    id: string;
    first_name: string;
    last_name: string;
    archived?: boolean;
    [key: string]: unknown;
}

interface InstructorResponse {
    id: string;
    firstName: string;
    lastName: string;
    archived?: boolean;
    [key: string]: unknown;
}

interface AdditionalOptionDbo {
    id: string;
    description: string;
    cost: number;
    students?: admin.firestore.DocumentReference[];
}

interface AdditionalOptionResponse {
    id: string;
    description: string;
    cost: number;
    studentsIds: string[];
}

interface RequestConfig {
    onlyOpenForRegistration?: boolean;
}

function transformTimestamp(
    timestamp: admin.firestore.Timestamp | null | undefined
): number {
    return timestamp && timestamp.seconds ? timestamp.seconds * 1000 : 0;
}

function extractIdFromReference(
    ref: admin.firestore.DocumentReference | string
): string {
    if (typeof ref === 'string') return ref;
    return ref.path[ref.path.length - 1];
}

async function fetchInstructorData(
    ref: admin.firestore.DocumentReference
): Promise<InstructorResponse> {
    const doc = await DatabaseUtility.getDatabase().doc(ref.path).get();
    const data = doc.data() as InstructorDbo | undefined;

    if (!data) {
        return {
            id: doc.id,
            firstName: '',
            lastName: '',
        };
    }

    return {
        ...data,
        id: doc.id,
        firstName: data.first_name || '',
        lastName: data.last_name || '',
        archived: data.archived,
    };
}

async function fetchAdditionalOptionsFromSubcollection(
    semesterId: string,
    classId: string
): Promise<AdditionalOptionResponse[]> {
    try {
        const additionalOptionsSnapshot = await DatabaseUtility.getDatabase()
            .collection(
                `semesters/${semesterId}/classes/${classId}/additional_options`
            )
            .get();

        return additionalOptionsSnapshot.docs.map((doc) => {
            const data = doc.data() as AdditionalOptionDbo;
            return {
                id: doc.id,
                description: data.description || '',
                cost: data.cost || 0,
                studentsIds: (data.students || []).map(extractIdFromReference),
            };
        });
    } catch (error) {
        console.log(
            `No additional options subcollection found for class ${classId}`
        );
        return [];
    }
}

function transformInlineAdditionalOptions(
    options: AdditionalOptionDbo[] | undefined
): AdditionalOptionResponse[] {
    if (!options) return [];

    return options.map((option) => ({
        id: option.id || '',
        description: option.description || '',
        cost: option.cost || 0,
        studentsIds: (option.students || []).map(extractIdFromReference),
    }));
}

async function transformClass(
    classDbo: ClassDbo,
    semesterId: string
): Promise<SemesterClass> {
    const instructorRefs = classDbo.instructors || [];
    const instructors = await Promise.all(
        instructorRefs.map(fetchInstructorData)
    );

    let additionalOptions = await fetchAdditionalOptionsFromSubcollection(
        semesterId,
        classDbo.id
    );

    if (additionalOptions.length === 0) {
        additionalOptions = transformInlineAdditionalOptions(
            classDbo.additional_options
        );
    }

    return {
        id: classDbo.id,
        title: classDbo.name,
        startMs: transformTimestamp(classDbo.start),
        endMs: transformTimestamp(classDbo.end),
        registrationEndMs: transformTimestamp(classDbo.registration_end_date),
        enrolledCount: classDbo.students?.length || 0,
        classType: classDbo.class_type,
        gradeRangeStart: classDbo.grade_range_start,
        gradeRangeEnd: classDbo.grade_range_end,
        description: classDbo.description,
        live: classDbo.live,
        cost: Number(classDbo.cost),
        location: classDbo.location,
        instructors,
        dailyTimes: classDbo.daily_times,
        weekday: classDbo.weekday,
        thumbnailUrl: classDbo.thumbnailUrl,
        studentIds: (classDbo.students || []).map(extractIdFromReference),
        pausedForEnrollment: classDbo.paused_for_enrollment || false,
        semesterId: semesterId,
        forInformationOnly: classDbo.for_information_only || false,
        unitIds: (classDbo.units || []).map(extractIdFromReference),
        paymentRange:
            classDbo.payment_range_lowest && classDbo.payment_range_highest
                ? {
                      lowest: classDbo.payment_range_lowest,
                      highest: classDbo.payment_range_highest,
                  }
                : undefined,
        additionalOptions,
    };
}

async function transformGroup(
    groupDbo: SemesterClassGroupDbo,
    allClasses: SemesterClass[]
): Promise<SemesterClassGroup> {
    const classIds = groupDbo.classIds || [];
    const groupClasses = allClasses.filter((cls) => classIds.includes(cls.id));

    console.log(
        `Group ${groupDbo.id}: classIds=${JSON.stringify(classIds)}, found ${groupClasses.length} classes`
    );

    return {
        id: groupDbo.id,
        name: groupDbo.name,
        cost: groupDbo.cost,
        classes: groupClasses,
    };
}

export async function _getCategorizedClassesOptimized(
    semesterId: string,
    config: RequestConfig = {}
): Promise<{
    groups: SemesterClassGroup[];
    classesNotInGroups: SemesterClass[];
}> {
    const db = DatabaseUtility.getDatabase();

    const classesPath = `semesters/${semesterId}/classes`;
    const groupsPath = `semesters/${semesterId}/groups`;

    const classesQuery = config.onlyOpenForRegistration
        ? db
              .collection(classesPath)
              .where('registration_end_date', '>=', new Date(Date.now()))
              .where('live', '==', true)
        : db.collection(classesPath).where('live', '==', true);

    const groupsQuery = db.collection(groupsPath);

    const [classesSnapshot, groupsSnapshot] = await Promise.all([
        classesQuery.get(),
        groupsQuery.get(),
    ]);

    const classDboes: ClassDbo[] = classesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<ClassDbo, 'id'>),
    }));

    const groupDbos: SemesterClassGroupDbo[] = groupsSnapshot.docs.map(
        (doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<SemesterClassGroupDbo, 'id'>),
        })
    );

    const classes = await Promise.all(
        classDboes.map((classDbo) => transformClass(classDbo, semesterId))
    );

    const allGroups = await Promise.all(
        groupDbos.map((groupDbo) => transformGroup(groupDbo, classes))
    );

    let filteredGroups = allGroups;
    if (config.onlyOpenForRegistration) {
        const now = Date.now();
        filteredGroups = allGroups.filter((group) => {
            if (!group.classes || group.classes.length === 0) {
                console.log(`Filtering out group ${group.id}: no classes`);
                return false;
            }

            return group.classes.every(
                (classItem) =>
                    classItem.live && classItem.registrationEndMs >= now
            );
        });
    }

    filteredGroups = filteredGroups.filter((group) => {
        if (!group.classes || group.classes.length === 0) {
            console.log(`Removing empty group: ${group.id}`);
            return false;
        }
        return true;
    });

    const idsOfClassesInGroups = new Set<string>(
        filteredGroups.flatMap((g) => g.classes.map((c) => c.id))
    );

    const classesNotInGroups = classes.filter(
        (c) => !idsOfClassesInGroups.has(c.id)
    );

    return {
        groups: filteredGroups,
        classesNotInGroups,
    };
}

export async function _getCategorizedClassesOptimizedBatched(
    semesterId: string,
    config: RequestConfig = {}
): Promise<{
    groups: SemesterClassGroup[];
    classesNotInGroups: SemesterClass[];
}> {
    const db = DatabaseUtility.getDatabase();

    const classesPath = `semesters/${semesterId}/classes`;
    const groupsPath = `semesters/${semesterId}/groups`;

    const classesQuery = config.onlyOpenForRegistration
        ? db
              .collection(classesPath)
              .where('registration_end_date', '>=', new Date(Date.now()))
              .where('live', '==', true)
        : db.collection(classesPath).where('live', '==', true);

    const groupsQuery = db.collection(groupsPath);

    const [classesSnapshot, groupsSnapshot] = await Promise.all([
        classesQuery.get(),
        groupsQuery.get(),
    ]);

    const classDboes: ClassDbo[] = classesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<ClassDbo, 'id'>),
    }));

    const groupDbos: SemesterClassGroupDbo[] = groupsSnapshot.docs.map(
        (doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<SemesterClassGroupDbo, 'id'>),
        })
    );

    const instructorPaths = new Set<string>();
    classDboes.forEach((cls) => {
        cls.instructors?.forEach((ref) => {
            instructorPaths.add(ref.path);
        });
    });

    const instructorPromises = Array.from(instructorPaths).map((path) =>
        db.doc(path).get()
    );
    const instructorDocs = await Promise.all(instructorPromises);

    const instructorMap = new Map<string, InstructorResponse>();
    instructorDocs.forEach((doc) => {
        if (doc.exists) {
            const data = doc.data() as InstructorDbo;
            instructorMap.set(doc.ref.path, {
                ...data,
                id: doc.id,
                firstName: data.first_name || '',
                lastName: data.last_name || '',
                archived: data.archived,
            });
        }
    });

    const classes = await Promise.all(
        classDboes.map(async (classDbo): Promise<SemesterClass> => {
            const instructors: InstructorResponse[] = (
                classDbo.instructors || []
            ).map((ref) => {
                const path = ref.path;
                return (
                    instructorMap.get(path) || {
                        id: extractIdFromReference(ref),
                        firstName: '',
                        lastName: '',
                    }
                );
            });

            let additionalOptions =
                await fetchAdditionalOptionsFromSubcollection(
                    semesterId,
                    classDbo.id
                );
            if (additionalOptions.length === 0) {
                additionalOptions = transformInlineAdditionalOptions(
                    classDbo.additional_options
                );
            }

            return {
                id: classDbo.id,
                title: classDbo.name,
                startMs: transformTimestamp(classDbo.start),
                endMs: transformTimestamp(classDbo.end),
                registrationEndMs: transformTimestamp(
                    classDbo.registration_end_date
                ),
                enrolledCount: classDbo.students?.length || 0,
                classType: classDbo.class_type,
                gradeRangeStart: classDbo.grade_range_start,
                gradeRangeEnd: classDbo.grade_range_end,
                description: classDbo.description,
                live: classDbo.live,
                cost: Number(classDbo.cost),
                location: classDbo.location,
                instructors,
                dailyTimes: classDbo.daily_times,
                weekday: classDbo.weekday,
                thumbnailUrl: classDbo.thumbnailUrl,
                studentIds: (classDbo.students || []).map(
                    extractIdFromReference
                ),
                pausedForEnrollment: classDbo.max_student_size
                    ? (classDbo.students ?? []).length >
                      classDbo.max_student_size
                    : classDbo.paused_for_enrollment || false,
                semesterId: semesterId,
                forInformationOnly: classDbo.for_information_only || false,
                unitIds: (classDbo.units || []).map(extractIdFromReference),
                paymentRange:
                    classDbo.payment_range_lowest &&
                    classDbo.payment_range_highest
                        ? {
                              lowest: classDbo.payment_range_lowest,
                              highest: classDbo.payment_range_highest,
                          }
                        : undefined,
                additionalOptions,
            };
        })
    );

    const allGroups = await Promise.all(
        groupDbos.map((groupDbo) => transformGroup(groupDbo, classes))
    );

    let filteredGroups = allGroups;
    if (config.onlyOpenForRegistration) {
        const now = Date.now();
        filteredGroups = allGroups.filter((group) => {
            if (!group.classes || group.classes.length === 0) {
                return false;
            }
            return group.classes.every(
                (classItem) =>
                    classItem.live && classItem.registrationEndMs >= now
            );
        });
    }

    filteredGroups = filteredGroups.filter(
        (group) => group.classes && group.classes.length > 0
    );

    const idsOfClassesInGroups = new Set<string>(
        filteredGroups.flatMap((g) => g.classes.map((c) => c.id))
    );

    const classesNotInGroups = classes.filter(
        (c) => !idsOfClassesInGroups.has(c.id)
    );

    return {
        groups: filteredGroups,
        classesNotInGroups,
    };
}

// TODO: This endpoint optimized by Claude but much of the functionality should be extracted to the re-usable repository utilities
export const classesBySemester = Functions.endpoint.handle<string[]>(
    async (request, response) => {
        try {
            const semesterIds: string[] = request.body.data;
            const results: Record<
                string,
                {
                    classes: SemesterClass[];
                    groups: SemesterClassGroup[];
                }
            > = {};

            const semesterPromises = semesterIds.map(
                async (semesterId: string) => {
                    const { classesNotInGroups, groups } =
                        await _getCategorizedClassesOptimizedBatched(
                            semesterId
                        );
                    return { semesterId, classesNotInGroups, groups };
                }
            );

            const allResults = await Promise.all(semesterPromises);

            allResults.forEach(({ semesterId, classesNotInGroups, groups }) => {
                results[semesterId] = {
                    classes: classesNotInGroups,
                    groups,
                };
            });

            response.send(results);
        } catch (error) {
            console.error('Error in classesBySemesterOptimized:', error);
            response.status(500).send({
                error: 'Error fetching classes by semester',
                details:
                    error instanceof Error ? error.message : 'Unknown error',
            });
        }
    }
);
