import { FlatRecord } from '@sol/record/domain';
import { TableHeader, CellStyleBuilder } from '@sol/table/domain';
import { TableHtml } from '@sol/table/html';
import * as pdf from 'html-pdf';

export class TablePdfUtility {
    public static createTablePdf<PropertyNames extends string, Metadata>({
        records,
        headers,
        styleBuilder,
    }: {
        records: Array<FlatRecord<PropertyNames, Metadata>>;
        headers: readonly TableHeader<PropertyNames>[];
        styleBuilder: CellStyleBuilder<PropertyNames, Metadata>;
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
