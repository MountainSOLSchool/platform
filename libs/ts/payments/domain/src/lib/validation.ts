export interface ValidationResult {
    valid: boolean;
    errors: string[];
}

export function validationSuccess(): ValidationResult {
    return { valid: true, errors: [] };
}

export function validationFailure(errors: string[]): ValidationResult {
    return { valid: false, errors };
}
