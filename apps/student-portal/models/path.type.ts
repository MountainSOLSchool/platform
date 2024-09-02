export type Path = {
    id: string;
    name: string;
    description: string;
    unitIds: Array<string>;
    electives: Array<{
        name: string;
        unitIds: Array<string>;
    }>;
};
