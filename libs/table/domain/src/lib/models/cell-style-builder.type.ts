import { CellStyle } from './cell-style.type';

export type CellStyleBuilder<PropertyNames extends string, Metadata> = (
    propertyName: PropertyNames,
    value: string,
    metadata?: Metadata
) => CellStyle;
