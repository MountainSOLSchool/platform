export type FlatRecord<PropertyNames extends string, Metadata> = {
    [name in PropertyNames]: {
        value: string;
        metadata?: Metadata;
    };
};
