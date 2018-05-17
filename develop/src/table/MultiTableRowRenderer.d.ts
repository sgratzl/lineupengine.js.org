import { GridStyleManager } from '../style/index';
export interface ITableSection {
    readonly id: string;
    readonly width: number;
    readonly height: number;
    readonly header: HTMLElement;
    readonly body: HTMLElement;
    init(): void;
    show(left: number, width: number, isGoingRight: boolean): void;
    hide(): void;
    destroy(): void;
}
export interface ITableFactory<T extends ITableSection> {
    (header: HTMLElement, body: HTMLElement, tableId: string, style: GridStyleManager, ...extras: any[]): T;
}
export interface ISeparatorFactory<T extends ITableSection> {
    (header: HTMLElement, body: HTMLElement, style: GridStyleManager, ...extras: any[]): T;
}
export interface IMultiTableRowRendererOptions {
    columnPadding: number;
    async: number | 'animation' | 'sync' | 'immediate';
    minScrollDelta: number;
}
export default class MultiTableRowRenderer {
    readonly node: HTMLElement;
    readonly style: GridStyleManager;
    private tableId;
    private readonly sections;
    private readonly options;
    constructor(node: HTMLElement, htmlId: string, options?: Partial<IMultiTableRowRendererOptions>);
    private update();
    private onScrolledHorizontally(scrollLeft, clientWidth, isGoingRight);
    private updateOffset();
    destroy(): void;
    private readonly doc;
    private readonly header;
    private readonly main;
    pushTable<T extends ITableSection>(factory: ITableFactory<T>, ...extras: any[]): T;
    pushSeparator<T extends ITableSection>(factory: ISeparatorFactory<T>, ...extras: any[]): T;
    remove(section: ITableSection): boolean;
    clear(): void;
    widthChanged(): void;
}
