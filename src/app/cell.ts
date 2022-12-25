export class Cell<T> implements ICell {
  private _content?: T;

  public fillState: CellFillState;
  public openState: CellOpenState;
  public accessState: CellAccessState;

  public onContentChange: ( cell: Cell<T>, newContent: T | undefined ) => void;

  constructor( { content, fillState, openState, accessState, onContentChange }: { content?: T; fillState?: CellFillState; openState?: CellOpenState; accessState?: CellAccessState; onContentChange?: ( cell: Cell<T>, newContent: T | undefined ) => void; } = {} ) {
    this._content = content;

    this.onContentChange = onContentChange || ( () => { } );
    this.fillState = fillState || CellFillState.EMPTY;
    this.openState = openState || CellOpenState.ALL;
    this.accessState = accessState || CellAccessState.FREE;
  }

  public clear(): void {
    this.fillState = CellFillState.EMPTY;
    this.openState = CellOpenState.ALL;
    this.accessState = CellAccessState.FREE;
  }

  get content(): T | undefined {
    return this._content;
  }

  public copy( newCell: Cell<T> ) {
    this._content = newCell._content;
    this.fillState = newCell.fillState;
    this.openState = newCell.openState;
    this.accessState = newCell.accessState;
    this.onContentChange = newCell.onContentChange;
  }

  public static copyTo<T>( replaceWith: Cell<T>, newCell: Cell<T> ) {
    newCell._content = replaceWith._content;
    newCell.fillState = replaceWith.fillState;
    newCell.openState = replaceWith.openState;
    newCell.accessState = replaceWith.accessState;
    newCell.onContentChange = replaceWith.onContentChange;
  }

  set content( newContent: T | undefined ) {
    this.onContentChange( this, newContent );

    this._content = newContent;
  }
}


interface ICell {
  fillState: CellFillState;
  openState: CellOpenState;
  accessState: CellAccessState;
}


///Adicionando múltiplos valores
///   let topRight = CellOpenState.TOP | CellOpenState.RIGHT
///   (topRight & CellOpenState.TOP) === CellOpenState.TOP
///     (topRight & CellOpenState.RIGHT) === CellOpenState.TOP
///Adicionando um valor depois de atribuir
///   topRight |= CellOpenState.LEFT
///     (topRight & CellOpenState.RIGHT) === CellOpenState.LEFT
///Removendo um valor depois de atribuir
///   topRight &= ~CellOpenState.RIGHT
///     (topRight & CellOpenState.RIGHT) !== CellOpenState.RIGHT
export enum CellOpenState {
  NONE = 0,
  TOP = 1 << 0,
  RIGHT = 1 << 1,
  BOTTOM = 1 << 2,
  LEFT = 1 << 3,
  TOP_RIGHT = 1 << 4,
  TOP_LEFT = 1 << 5,
  BOTTOM_RIGHT = 1 << 6,
  BOTTOM_LEFT = 1 << 7,
  ALL = ~( ~0 << 8 )
}

export enum CellAccessState { FREE, BLOCKED, VISITED }

export enum CellFillState { EMPTY, FILLED, FULL }
