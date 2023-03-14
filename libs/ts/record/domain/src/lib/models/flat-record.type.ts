export type FlatRecord<PropertyNames extends string, Metadata = undefined> = {
    [name in PropertyNames]: {
        value: string;
        metadata?: Metadata;
    };
};
