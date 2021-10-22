import { CellStyle } from "./cell-style.type";

export type CellStyleBuilder<PropertyNames extends string> = (
    propertyName: PropertyNames,
    value: string
  ) => CellStyle;