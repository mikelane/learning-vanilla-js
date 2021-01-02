export default class ItemDragState {
  private static _instance: ItemDragState;
  private _hoverElement?: HTMLElement;
  private _currentItem?: HTMLElement;
  private _startingSwimlane?: HTMLElement;

  private constructor() {
    this._hoverElement = undefined;
    this._currentItem = undefined;
    this._startingSwimlane = undefined;
  }

  public static get instance(): ItemDragState {
    if (!ItemDragState._instance) {
      ItemDragState._instance = new ItemDragState();
    }

    return ItemDragState._instance;
  }

  public clearItem() {
    this._currentItem = undefined;
  }

  public set hoverElement(e: HTMLElement) {
    console.debug({hoverElement: e as HTMLElement});
    this._hoverElement = e as HTMLElement;
  }

  public set currentItem(e: HTMLElement) {
    console.debug({currentItem: e as HTMLElement});
    this._currentItem = e as HTMLElement;
  }

  public set startingSwimlane(e: HTMLElement) {
    console.debug({startingSwimlane: e as HTMLElement});
    this._startingSwimlane = e as HTMLElement;
  }

  public get hoverElement(): HTMLElement {
    return this._hoverElement as HTMLElement;
  }

  public get currentItem(): HTMLElement {
    return this._currentItem as HTMLElement;
  }

  public get startingSwimlane(): HTMLElement {
    return this._startingSwimlane as HTMLElement;
  }
}
