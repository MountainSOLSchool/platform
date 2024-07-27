export abstract class SemesterRepository {
    abstract getPath(): Promise<string>;
    abstract getId(): Promise<string>;

    protected getBasePath(): string {
        return 'semesters';
    }
}
