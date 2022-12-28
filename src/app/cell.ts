import { Point2D } from './mathTools';

export type CellInputParameters<T> = {
  content?: T;
  gridReference?: CellGridReference;
  fillState?: CellFillState;
  openState?: CellOpenState;
  accessState?: CellAccessState;
  onContentChange?: ( newContent: T | undefined, cell: Cell<T> ) => void;
}

export type CellGridReference = {
  position?: Point2D;
  index?: number;
}

export class Cell<T> implements ICell {
  private _content?: T;

  public gridReference?: CellGridReference;
  public fillState: CellFillState;
  public openState: CellOpenState;
  public accessState: CellAccessState;

  public onContentChange: ( newContent: T | undefined, cell: Cell<T> ) => void;

  constructor( { content, fillState, openState, accessState, onContentChange, gridReference }: CellInputParameters<T> = {} ) {
    this._content = content;

    this.gridReference = gridReference;
    this.onContentChange = onContentChange || ( () => { } );
    this.fillState = fillState || CellFillState.EMPTY;
    this.openState = openState || CellOpenState.ALL;
    this.accessState = accessState || CellAccessState.FREE;
  }

  public clear(): void {
    this.fillState = CellFillState.EMPTY;
    this.openState = CellOpenState.ALL;
    this.accessState = CellAccessState.FREE;
    this.onContentChange( this._content, this );
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
    this.onContentChange( this._content, this );
    return this;
  }

  public static copyTo<T>( replaceWith: Cell<T>, newCell: Cell<T> ) {
    newCell._content = replaceWith._content;
    newCell.fillState = replaceWith.fillState;
    newCell.openState = replaceWith.openState;
    newCell.accessState = replaceWith.accessState;
    newCell.onContentChange = replaceWith.onContentChange;

    newCell.onContentChange( newCell._content, newCell );
  }

  public static swap<T>( cellA: Cell<T>, cellB: Cell<T> ) {
    const placeholder = new Cell<T>().copy( cellA );

    cellA.copy( cellB );
    cellB.copy( placeholder );

    cellA.onContentChange( cellA._content, cellA );
    cellB.onContentChange( cellB._content, cellB );
  }

  set content( newContent: T | undefined ) {
    this.onContentChange( newContent, this );

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
