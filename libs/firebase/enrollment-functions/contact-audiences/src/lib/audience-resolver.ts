import { DatabaseUtility } from '@sol/firebase/database';
import { ContactDbEntry, StudentDbEntry } from '@sol/student/domain';
import { ClassEnrollmentRepository } from '@sol/classes/enrollment/repository';
import type {
    AudienceContact,
    AudienceSelector,
    ContactAudienceResponse,
} from '@sol/ts/firebase/api-types';
import type { DocumentData, DocumentReference } from 'firebase-admin/firestore';

/**
 * Only the fields needed to build an address. Projecting keeps an all-time
 * audience to a single cheap read per student rather than hydrating every
 * student document and its subcollections.
 */
const CONTACT_FIELDS = [
    'first_name',
    'last_name',
    'primary_first_name',
    'primary_last_name',
    'primary_email',
    'guardians',
] as const;

type StudentContactFields = Pick<
    StudentDbEntry,
    (typeof CONTACT_FIELDS)[number]
>;

/** One student and every address that can be used to reach their family. */
type StudentContactSource = {
    studentName: string;
    contacts: Array<{ name: string; email: string }>;
};

const FIRESTORE_GET_ALL_CHUNK = 300;

export async function resolveAudience(
    selector: AudienceSelector,
    includeAllGuardians: boolean
): Promise<ContactAudienceResponse> {
    const sources = await collectSources(selector, includeAllGuardians);
    return dedupe(sources);
}

async function collectSources(
    selector: AudienceSelector,
    includeAllGuardians: boolean
): Promise<Array<StudentContactSource>> {
    switch (selector.type) {
        case 'semester':
            return studentsById(
                await studentIdsInSemester(selector.semesterId),
                includeAllGuardians
            );
        case 'class':
            return studentsById(
                await studentIdsInClass(selector.semesterId, selector.classId),
                includeAllGuardians
            );
        case 'allTime':
            return await allStudents(includeAllGuardians);
        case 'recentYears':
            return await studentsEnrolledSince(
                cutoffForYears(selector.years),
                includeAllGuardians
            );
    }
}

function cutoffForYears(years: number): Date {
    const cutoff = new Date();
    cutoff.setFullYear(cutoff.getFullYear() - years);
    return cutoff;
}

/**
 * Reads the raw class documents rather than going through ClassRepository:
 * that filters on `live`, which would drop the families of any class since
 * unlisted. Grouped classes live in this same collection, so nothing is
 * missed by not resolving groups separately.
 */
async function studentIdsInSemester(
    semesterId: string
): Promise<Array<string>> {
    const classes = await DatabaseUtility.getDatabase()
        .collection(`semesters/${semesterId}/classes`)
        .select('students')
        .get();

    return classes.docs.flatMap((doc) => studentIdsOf(doc.data()));
}

async function studentIdsInClass(
    semesterId: string,
    classId: string
): Promise<Array<string>> {
    const doc = await DatabaseUtility.getDatabase()
        .doc(`semesters/${semesterId}/classes/${classId}`)
        .get();

    return doc.exists ? studentIdsOf(doc.data()) : [];
}

function studentIdsOf(data: DocumentData | undefined): Array<string> {
    const students = data?.['students'];
    return Array.isArray(students)
        ? (students as Array<DocumentReference>).map((ref) => ref.id)
        : [];
}

async function studentsById(
    ids: Array<string>,
    includeAllGuardians: boolean
): Promise<Array<StudentContactSource>> {
    const uniqueIds = [...new Set(ids)];
    if (!uniqueIds.length) {
        return [];
    }

    const db = DatabaseUtility.getDatabase();
    const sources: Array<StudentContactSource> = [];

    for (let i = 0; i < uniqueIds.length; i += FIRESTORE_GET_ALL_CHUNK) {
        const refs = uniqueIds
            .slice(i, i + FIRESTORE_GET_ALL_CHUNK)
            .map((id) => db.collection('students').doc(id));
        const docs = await db.getAll(...refs, {
            fieldMask: [...CONTACT_FIELDS],
        });
        for (const doc of docs) {
            if (doc.exists) {
                sources.push(
                    sourceFromStudent(
                        doc.data() as StudentContactFields,
                        includeAllGuardians
                    )
                );
            }
        }
    }

    return sources;
}

/**
 * Every student ever, without the `school >= ''` filter the general-purpose
 * student repository uses — a range filter silently excludes documents that
 * lack the field, which is tolerable for an info-sheet table and wrong for a
 * mailing audience.
 */
async function allStudents(
    includeAllGuardians: boolean
): Promise<Array<StudentContactSource>> {
    const students = await DatabaseUtility.getDatabase()
        .collection('students')
        .select(...CONTACT_FIELDS)
        .get();

    return students.docs.map((doc) =>
        sourceFromStudent(
            doc.data() as StudentContactFields,
            includeAllGuardians
        )
    );
}

async function studentsEnrolledSince(
    cutoff: Date,
    includeAllGuardians: boolean
): Promise<Array<StudentContactSource>> {
    const enrollments =
        await ClassEnrollmentRepository.getEnrolledSince(cutoff);

    const studentIds = enrollments
        .map(({ studentId }) => studentId)
        .filter((id): id is string => !!id);

    // Enrollments predating `studentId` can still be reached through the
    // address captured at checkout, so they are not dropped from the audience
    // — they just carry no guardian records to expand.
    const legacy: Array<StudentContactSource> = enrollments
        .filter(({ studentId }) => !studentId)
        .map(({ studentName, contactEmail }) => ({
            studentName: studentName ?? '',
            contacts: [{ name: '', email: contactEmail ?? '' }],
        }));

    return [
        ...(await studentsById(studentIds, includeAllGuardians)),
        ...legacy,
    ];
}

function sourceFromStudent(
    student: StudentContactFields,
    includeAllGuardians: boolean
): StudentContactSource {
    const contacts = [
        {
            name: fullName(
                student.primary_first_name,
                student.primary_last_name
            ),
            email: student.primary_email ?? '',
        },
    ];

    if (includeAllGuardians) {
        for (const guardian of student.guardians ?? []) {
            contacts.push({
                name: fullName(guardian.first_name, guardian.last_name),
                email: (guardian as ContactDbEntry).email ?? '',
            });
        }
    }

    return {
        studentName: fullName(student.first_name, student.last_name),
        contacts,
    };
}

function fullName(first?: string, last?: string): string {
    return [first, last].filter(Boolean).join(' ').trim();
}

function dedupe(sources: Array<StudentContactSource>): ContactAudienceResponse {
    const byEmail = new Map<string, AudienceContact>();
    let totalBeforeDedupe = 0;
    let studentsWithoutEmail = 0;

    for (const source of sources) {
        const usable = source.contacts.filter(({ email }) => isEmailish(email));
        if (!usable.length) {
            studentsWithoutEmail++;
            continue;
        }

        for (const { name, email } of usable) {
            totalBeforeDedupe++;
            const key = email.trim().toLowerCase();
            const existing = byEmail.get(key);

            if (existing) {
                // A name is worth keeping even when the first sighting of the
                // address had none, so the Gmail chip reads as a person.
                if (!existing.name && name) {
                    existing.name = name;
                }
                if (
                    source.studentName &&
                    !existing.students.includes(source.studentName)
                ) {
                    existing.students.push(source.studentName);
                }
            } else {
                byEmail.set(key, {
                    name,
                    email: key,
                    students: source.studentName ? [source.studentName] : [],
                });
            }
        }
    }

    const contacts = [...byEmail.values()].sort((a, b) =>
        (a.name || a.email).localeCompare(b.name || b.email)
    );

    return { contacts, totalBeforeDedupe, studentsWithoutEmail };
}

function isEmailish(email: string | undefined): email is string {
    const trimmed = email?.trim() ?? '';
    return trimmed.includes('@') && !trimmed.includes(' ');
}
