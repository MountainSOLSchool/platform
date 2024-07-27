import { FlatRecord } from '@sol/record/domain';
import { TableHtml } from '../utilities/table-html.utility';
import { CellStyleBuilder, TableHeader } from '@sol/table/domain';

export abstract class TableHtmlFactory<
    T,
    PropertyNames extends string,
    TitleArgs extends Array<unknown> = [],
    Metadata = never,
> {
    protected abstract getHeaders(): Array<TableHeader<PropertyNames>>;
    protected abstract getRecords(
        list: Array<T>
    ): Array<FlatRecord<PropertyNames, Metadata>>;
    protected abstract getTitle(...args: TitleArgs): string;
    protected getStyleBuilder(): CellStyleBuilder<PropertyNames, Metadata> {
        return () => ({
            isBold: false,
            isHighlighted: false,
        });
    }

    public build(source: Array<T>, titleArgs: TitleArgs) {
        return TableHtml.generateHtmlTableFromRecords({
            records: this.getRecords(source),
            headers: this.getHeaders(),
            title: this.getTitle(...titleArgs),
            styleBuilder: this.getStyleBuilder(),
        });
    }
}
