import admin from 'firebase-admin';
import { getFirestore } from 'firebase-admin/firestore';

// ─── Configuration ───────────────────────────────────────────────────────────

const SEMESTER_ID = 'summer2026';
const LIVE = process.argv.includes('--fix');

// ─── Types ───────────────────────────────────────────────────────────────────

type EnrollmentDoc = {
    id: string;
    studentId?: string;
    studentName: string;
    status: string;
    additionalOptionIdsByClassId: Record<string, Array<string>>;
    classes?: Array<{ id: string; semesterId: string }>;
};

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
    admin.initializeApp({ projectId: 'mountain-sol-platform' });
    const db = getFirestore();

    console.log(
        `Mode: ${LIVE ? 'LIVE (will write to Firestore)' : 'DRY RUN (pass --fix to apply)'}`
    );
    console.log(`Semester: ${SEMESTER_ID}\n`);

    // 1. Find all summer2026 classes that have inline additional_options
    console.log('Scanning classes for inline additional_options...');
    const classesSnapshot = await db
        .collection(`semesters/${SEMESTER_ID}/classes`)
        .get();

    const classesWithInlineOptions: Array<{
        id: string;
        name: string;
        inlineOptions: Array<{ id: string; description: string; cost: number }>;
    }> = [];

    for (const doc of classesSnapshot.docs) {
        const data = doc.data();
        if (data.additional_options && data.additional_options.length > 0) {
            classesWithInlineOptions.push({
                id: doc.id,
                name: data.name ?? doc.id,
                inlineOptions: data.additional_options,
            });
        }
    }

    console.log(
        `Found ${classesWithInlineOptions.length} classes with inline additional_options\n`
    );

    // 2. Migrate inline options to subcollection docs
    console.log(
        '═══════════════════════════════════════════════════════════════'
    );
    console.log('  STEP 1: Migrate inline options → subcollection');
    console.log(
        '═══════════════════════════════════════════════════════════════\n'
    );

    let optionsMigrated = 0;
    let optionsAlreadyInSubcollection = 0;

    for (const cls of classesWithInlineOptions) {
        const classRef = db.doc(
            `semesters/${SEMESTER_ID}/classes/${cls.id}`
        );
        const optionsCollection = classRef.collection('additional_options');

        for (const opt of cls.inlineOptions) {
            const existingDoc = await optionsCollection.doc(opt.id).get();

            if (existingDoc.exists) {
                optionsAlreadyInSubcollection++;
                continue;
            }

            console.log(
                `  ${cls.name} → create subcollection doc "${opt.description}" ($${opt.cost})`
            );
            optionsMigrated++;

            if (LIVE) {
                await optionsCollection.doc(opt.id).set({
                    description: opt.description,
                    cost: opt.cost,
                    students: [],
                });
            }
        }

        // Delete the inline field now that options are in subcollection
        if (LIVE) {
            await classRef.update({
                additional_options: admin.firestore.FieldValue.delete(),
            });
        }

        if (cls.inlineOptions.length > 0) {
            console.log(
                `  ${cls.name} → ${LIVE ? 'deleted' : 'will delete'} inline additional_options field`
            );
        }
    }

    console.log(
        `\nOptions to migrate: ${optionsMigrated} (${optionsAlreadyInSubcollection} already in subcollection)\n`
    );

    // 3. Build expected student assignments from enrollment records
    console.log(
        '═══════════════════════════════════════════════════════════════'
    );
    console.log('  STEP 2: Backfill student references from enrollments');
    console.log(
        '═══════════════════════════════════════════════════════════════\n'
    );

    console.log('Fetching enrolled enrollments...');
    const enrollmentSnapshot = await db
        .collection('enrollment')
        .where('status', '==', 'enrolled')
        .get();

    const enrollments: EnrollmentDoc[] = [];
    for (const doc of enrollmentSnapshot.docs) {
        const data = doc.data() as Omit<EnrollmentDoc, 'id'>;
        if (data.classes?.some((c) => c.semesterId === SEMESTER_ID)) {
            enrollments.push({ ...data, id: doc.id });
        }
    }

    console.log(
        `Found ${enrollments.length} enrolled enrollments for ${SEMESTER_ID}`
    );

    // classId → optionId → Set<studentId>
    const classOptionStudents = new Map<
        string,
        Map<string, Set<string>>
    >();

    for (const enrollment of enrollments) {
        if (!enrollment.studentId) continue;

        const optionEntries = Object.entries(
            enrollment.additionalOptionIdsByClassId ?? {}
        );
        for (const [classId, optionIds] of optionEntries) {
            if (optionIds.length === 0) continue;

            if (!classOptionStudents.has(classId)) {
                classOptionStudents.set(classId, new Map());
            }
            const optionMap = classOptionStudents.get(classId)!;

            for (const optionId of optionIds) {
                if (!optionMap.has(optionId)) {
                    optionMap.set(optionId, new Set());
                }
                optionMap.get(optionId)!.add(enrollment.studentId);
            }
        }
    }

    console.log(
        `Found ${classOptionStudents.size} classes with additional option purchases\n`
    );

    // 4. For each class, check subcollection docs (or pending inline migrations) and add missing student refs
    let studentsAdded = 0;
    let studentsAlreadyCorrect = 0;

    // Build class name cache and inline options lookup (for dry-run awareness)
    const classNameCache = new Map<string, string>();
    for (const doc of classesSnapshot.docs) {
        classNameCache.set(doc.id, doc.data().name ?? doc.id);
    }

    const pendingInlineOptions = new Map<string, Map<string, { description: string; cost: number }>>();
    for (const cls of classesWithInlineOptions) {
        const optMap = new Map<string, { description: string; cost: number }>();
        for (const opt of cls.inlineOptions) {
            optMap.set(opt.id, { description: opt.description, cost: opt.cost });
        }
        pendingInlineOptions.set(cls.id, optMap);
    }

    for (const [classId, optionMap] of classOptionStudents) {
        const className = classNameCache.get(classId) ?? classId;
        const optionsCollection = db.collection(
            `semesters/${SEMESTER_ID}/classes/${classId}/additional_options`
        );

        for (const [optionId, expectedStudentIds] of optionMap) {
            const optionDoc = await optionsCollection.doc(optionId).get();

            // In dry-run, subcollection docs from Step 1 don't exist yet —
            // check if this option would be created from the inline migration
            const pendingOption = pendingInlineOptions.get(classId)?.get(optionId);

            if (!optionDoc.exists && !pendingOption) {
                console.log(
                    `  ⚠ ${className} → option ${optionId} not found, skipping`
                );
                continue;
            }

            const optionData = optionDoc.exists ? optionDoc.data()! : null;
            const description = optionData?.description ?? pendingOption?.description ?? optionId;
            const currentStudentIds = new Set(
                (optionData?.students ?? []).map(
                    (ref: admin.firestore.DocumentReference) => ref.id
                )
            );

            const missingStudentIds = [...expectedStudentIds].filter(
                (sid) => !currentStudentIds.has(sid)
            );

            if (missingStudentIds.length === 0) {
                studentsAlreadyCorrect += expectedStudentIds.size;
                continue;
            }

            studentsAdded += missingStudentIds.length;

            console.log(
                `  ${className} → "${description}" — adding ${missingStudentIds.length} student(s): ${missingStudentIds.join(', ')}`
            );

            if (LIVE) {
                const newStudentRefs = missingStudentIds.map((sid) =>
                    db.doc(`students/${sid}`)
                );
                await optionsCollection.doc(optionId).update({
                    students: [
                        ...(optionData?.students ?? []),
                        ...newStudentRefs,
                    ],
                });
            }
        }
    }

    // 5. Summary
    console.log(
        '\n═══════════════════════════════════════════════════════════════'
    );
    console.log('  SUMMARY');
    console.log(
        '═══════════════════════════════════════════════════════════════\n'
    );
    console.log(`Inline options migrated to subcollection: ${optionsMigrated}`);
    console.log(`Student references to add: ${studentsAdded}`);
    console.log(`Student references already correct: ${studentsAlreadyCorrect}`);
    console.log(
        `Mode: ${LIVE ? 'LIVE — changes written' : 'DRY RUN — no changes written'}`
    );

    if (!LIVE && (optionsMigrated > 0 || studentsAdded > 0)) {
        console.log('\nTo apply changes, re-run with --fix');
    }
}

main().catch((err) => {
    console.error('Error:', err);
    process.exit(1);
});
