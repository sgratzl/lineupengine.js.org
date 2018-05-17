import { IColumn } from './IColumn';
import StyleManager from './StyleManager';
export declare const TEMPLATE = "\n  <header>\n    <article></article>\n  </header>\n  <main>\n    <footer>&nbsp;</footer>\n    <article></article>\n  </main>";
export declare function setTemplate(root: HTMLElement): HTMLElement;
export declare function setColumn(node: HTMLElement, column: {
    index: number;
    id: string;
}): void;
export default class GridStyleManager extends StyleManager {
    readonly id: string;
    constructor(root: HTMLElement, id: string);
    readonly hashedId: string;
    update(defaultRowHeight: number, columns: IColumn[], frozenShift: number, tableId?: string, unit?: string): void;
    remove(tableId: string): void;
    tableIds(tableId: string, asSelector?: boolean): {
        header: string;
        body: string;
    };
    private updateColumns(columns, selectors, frozenShift, unit?);
}
