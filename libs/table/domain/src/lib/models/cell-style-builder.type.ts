import { CellStyle } from './cell-style.type';

export type CellStyleBuilder<PropertyNames extends string, Extras> = (
    propertyName: PropertyNames,
    value: string,
    extras?: Extras
) => CellStyle;
