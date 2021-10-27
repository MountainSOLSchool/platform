export type FlatRecord<PropertyNames extends string, Extras> = {
    [name in PropertyNames]: {
      value: string;
      extras?: Extras;
    };
  };