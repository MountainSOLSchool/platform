import {CellStyleBuilder, TableHeader, TableRow} from '@sol/table/domain';
import {FlatRecord} from '@sol/record/domain';

export class TableHtml {

    public static generateHtmlTableFromRecords<
        T,
        PropertyNames extends string,
        Extras
    >({
        records,
        headers,
        styleBuilder,
    }: {
        records: Array<FlatRecord<PropertyNames, Extras>>;
        headers: readonly TableHeader<PropertyNames>[];
        styleBuilder: CellStyleBuilder<PropertyNames, Extras>;
    }) {
        const rows = TableHtml.transformRecordsIntoTableRows(records, styleBuilder);

        return TableHtml.createHtmlTable(headers, rows);
    }

    private static createHtmlTable<T extends string>(
        headers: readonly TableHeader<T>[],
        rows: Array<TableRow<T>>
    ): string {
        const headerTitles = headers.map((h) => h.title);
        return `
        <table>
            <tr>
              ${headers.map((h) => '<th>' + h.title + '</th>').join('')}
            </tr>
            ${rows
                .map(
                    (r) =>
                        '<tr>' +
                        [...r.cells]
                            .sort(
                                (a, b) =>
                                    headerTitles.indexOf(a.propertyName) -
                                    headerTitles.indexOf(b.propertyName)
                            )
                            .map(
                                (c) =>
                                    "<td style='background-color:" +
                                    (c.style.isHighlighted
                                        ? 'yellow'
                                        : 'white') +
                                    ';font-weight:' +
                                    (c.style.isBold ? 'bold' : 'normal') +
                                    "'>" +
                                    c.textContent +
                                    '</td>'
                            )
                            .join('') +
                        '</tr>'
                )
                .join('')}
          </table>
        `;
    }

    private static transformRecordsIntoTableRows<
        PropertyNames extends string,
        Extras
    >(
        records: Array<FlatRecord<PropertyNames, Extras>>,
        styleBuilder: CellStyleBuilder<PropertyNames, Extras>
    ): Array<TableRow<PropertyNames>> {
        return records.map((record) => ({
            cells: Object.entries(record).map(([key, v]) => {
                const propertyName = key as PropertyNames;
                const theRecord = v as { value: string; extras: Extras };
                const textContent = theRecord.value as string;
                const extras = theRecord.extras;
                return {
                    propertyName,
                    textContent,
                    style: styleBuilder(propertyName, textContent, extras),
                };
            }),
        }));
    }
}
