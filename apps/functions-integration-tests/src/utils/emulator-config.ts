export const EMULATOR_CONFIG = {
    projectId: 'mountain-sol-platform',
    functionsHost: 'http://localhost:5001',
    firestoreHost: 'localhost:8080',
    authHost: 'localhost:9099',
    region: 'us-central1',
    origin: 'http://localhost:4200',
} as const;

export function getFunctionUrl(functionName: string): string {
    const { functionsHost, projectId, region } = EMULATOR_CONFIG;
    return `${functionsHost}/${projectId}/${region}/${functionName}`;
}
