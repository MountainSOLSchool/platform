export interface User {
    displayName: string;
    email: string;
    getIdToken(forceRefresh?: boolean | undefined): Promise<string>;
}
