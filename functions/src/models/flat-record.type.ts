export type FlatRecord<PropertyNames extends string> = {
    [name in PropertyNames]: string;
  };