import { Functions, Role } from '@sol/firebase/functions';
import { DatabaseUtility } from '@sol/firebase/database';

export interface CreateSemesterRequest {
    name: string;
}

export interface CreateSemesterResponse {
    id: string;
    name: string;
}

// Validates semester name format: Word + space + 4-digit year starting with 20
// Examples: "Spring 2025", "Fall 2024", "Test 2099"
function validateSemesterName(name: string): {
    valid: boolean;
    error?: string;
} {
    const trimmed = name.trim();

    // Pattern: one or more letters, space, year starting with 20XX
    const pattern = /^[A-Za-z]+\s+20\d{2}$/;

    if (!pattern.test(trimmed)) {
        return {
            valid: false,
            error: 'Semester name must be in format "Season Year" (e.g., Spring 2025, Fall 2024)',
        };
    }

    return { valid: true };
}

// Generates a normalized ID from the semester name
// "Spring 2025" -> "spring2025"
// "Test 2099" -> "test2099"
function generateSemesterId(name: string): string {
    return name
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '');
}

export const createSemester = Functions.endpoint
    .restrictedToRoles(Role.Admin)
    .handle<CreateSemesterRequest>(async (request, response) => {
        const data = request.body.data;

        if (!data.name || !data.name.trim()) {
            response.status(400).send({ error: 'Semester name is required' });
            return;
        }

        const trimmedName = data.name.trim();

        // Validate name format
        const validation = validateSemesterName(trimmedName);
        if (!validation.valid) {
            response.status(400).send({ error: validation.error });
            return;
        }

        const semesterId = generateSemesterId(trimmedName);

        const semestersCollection =
            await DatabaseUtility.getCollectionRef('semesters');

        // Check if semester with this ID already exists
        const existingDoc = await semestersCollection.doc(semesterId).get();
        if (existingDoc.exists) {
            response.status(400).send({
                error: `Semester "${trimmedName}" already exists`,
            });
            return;
        }

        // Create with explicit ID
        await semestersCollection.doc(semesterId).set({
            displayName: trimmedName,
        });

        response.send({
            id: semesterId,
            name: trimmedName,
        } as CreateSemesterResponse);
    });
