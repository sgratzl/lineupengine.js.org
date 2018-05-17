import { IExceptionContext } from '../logic';
import KeyFinder from './KeyFinder';
export { default as KeyFinder } from './KeyFinder';
export declare enum EAnimationMode {
    UPDATE = 0,
    UPDATE_CREATE = 1,
    UPDATE_REMOVE = 2,
    SHOW = 3,
    HIDE = 4,
}
export interface IAnimationItem {
    mode: EAnimationMode;
    node: HTMLElement;
    key: string;
    previous: {
        index: number | -1;
        y: number;
        height: number | null;
    };
    nodeY: number;
    nodeYCurrentHeight: number;
    current: {
        index: number | -1;
        y: number;
        height: number | null;
    };
}
export declare function noAnimationChange({previous, mode, nodeY, current}: IAnimationItem, previousHeight: number, currentHeight: number): boolean;
export interface IPhase {
    readonly delay: number;
    apply(item: Readonly<IAnimationItem>, previousFinder: KeyFinder, currentFinder: KeyFinder): void;
}
export interface IAnimationContext {
    readonly previous: IExceptionContext;
    previousKey(previousRowIndex: number): string;
    currentKey(currentRowIndex: number): string;
    phases?: IPhase[];
}
export declare const defaultPhases: {
    delay: number;
    apply({ mode, previous, nodeY, current, node }: Readonly<IAnimationItem>): void;
}[];
