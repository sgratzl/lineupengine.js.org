import { IExceptionContext } from '../logic';
export declare enum EScrollResult {
    NONE = 0,
    ALL = 1,
    SOME = 2,
    SOME_BOTTOM = 3,
    SOME_TOP = 4,
}
export interface IMixinAdapter {
    readonly visible: {
        first: number;
        last: number;
        forcedFirst: number;
        forcedLast: number;
    };
    readonly visibleFirstRowPos: number;
    readonly context: IExceptionContext;
    readonly scroller: HTMLElement;
    addAtBeginning(from: number, to: number, frozenShift: number): void;
    addAtBottom(from: number, to: number): void;
    removeFromBeginning(from: number, to: number, frozenShift: number): void;
    removeFromBottom(from: number, to: number): void;
    updateOffset(firstRowPos: number): void;
    syncFrozen?(first: number): number;
}
export interface IMixin {
    onScrolled(isGoingDown: boolean, scrollResult: EScrollResult): void;
}
export interface IMixinClass {
    new (adapter: IMixinAdapter, options?: any): IMixin;
}
