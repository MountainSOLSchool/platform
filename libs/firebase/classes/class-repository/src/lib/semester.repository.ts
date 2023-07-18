export abstract class SemesterRepository {
    abstract getPath(): Promise<string>;

    protected getBasePath(): string {
        return 'semesters';
    }
}
