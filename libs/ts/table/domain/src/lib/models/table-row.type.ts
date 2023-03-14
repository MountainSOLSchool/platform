import { CellStyle } from './cell-style.type';

export type TableRow<PropertyNames extends string> = {
    cells: Array<{
        propertyName: PropertyNames;
        textContent: string;
        style: CellStyle;
    }>;
};
