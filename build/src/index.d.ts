interface ItemParams {
    id: string;
    title: string;
    details: string;
    assignee?: string;
}
interface Item {
    readonly id: string;
    readonly title: string;
    readonly details: string;
    readonly assignee?: string;
}
interface itemsResponse {
    readonly todo: Item[];
    readonly assigned: Item[];
    readonly inProgress: Item[];
    readonly completed: Item[];
}
declare const itemsGqlResponse: string;
declare type laneName = 'todo' | 'assigned' | 'inProgress' | 'completed';
declare const itemClickHandler: (e: Event) => void;
declare const itemMouseDown: (e: Event) => void;
declare const itemMouseUp: (e: Event) => void;
declare const itemHtml: ({ id, title, details, assignee }: Item) => string;
declare const insertItemsIntoSwimlanes: (allItems: itemsResponse) => Promise<void>;
declare const items: any;
declare let hoverEl: HTMLElement | null;
declare let currentItem: HTMLElement | null;
declare let startingPos: HTMLElement | null;
declare const mdHandler: (e: Event) => void;
declare const muHandler: (e: Event) => void;
declare const mouseMoveHandler: (e: MouseEvent) => void;
declare const hoverHandler: (e: MouseEvent) => void;
declare const normalBorder: (e: Event) => void;
