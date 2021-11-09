import { FlatRecord } from '@sol/record/domain';
import { TableHeader, CellStyleBuilder } from '@sol/table/domain';
import { TableHtml } from '@sol/table/html';
import * as pdf from 'html-pdf';

export class TablePdfUtility {
    public static createTablePdf<PropertyNames extends string, Extras>({
        records,
        headers,
        styleBuilder,
    }: {
        records: Array<FlatRecord<PropertyNames, Extras>>;
        headers: readonly TableHeader<PropertyNames>[];
        styleBuilder: CellStyleBuilder<PropertyNames, Extras>;
    }) {
        const htmlTable = TableHtml.generateHtmlTableFromRecords({
            records,
            headers,
            styleBuilder,
        });

        return pdf.create(htmlTable, {
            orientation: 'landscape',
        });
    }
}
