import { Cell } from './cell';
import { Dimensions, rowColToIndex } from './mathTools';


/// Uma função no estilo forEach que deve retornar uma Cell<T> com base no index fornecido
export type GridFillerFunction<T> = ( index: number, grid?: Grid<T> ) => Cell<T>;

export class Grid<T> {
  private _dimensions: Dimensions;
  private _buffer: Cell<T>[];

  constructor( { dimensions, filler }: { dimensions: Dimensions; filler?: GridFillerFunction<T>; } ) {
    this._dimensions = dimensions;

    this._buffer = filler !== undefined
      ? Grid.getBufferFromFiller<T>( this._dimensions, filler, this )
      : Grid.getEmptyBuffer<T>( this._dimensions );
  }

  overrideWith( grid: Grid<T> ): void {
    const out: Cell<T> = new Cell<T>();
    for ( let i = 0; i < this._buffer.length; ++i ) {
      if ( grid.tryGetCellByIndex( i, out ) ) {
        this._buffer[i].copy( out );
      }
    }
  }

  get width(): number {
    return this._dimensions.width;
  }

  get height(): number {
    return this._dimensions.height;
  }

  get buffer(): Cell<T>[] {
    return this._buffer;
  }

  *[Symbol.iterator]() {
    for ( let i = 0; i < this._buffer.length; ++i ) {
      yield this._buffer[i];
    }
  }

  public forEach( callbackfn: ( value: Cell<T>, index: number, arr: Cell<T>[] ) => void ) {
    for ( let i = 0; i < this._buffer.length; ++i ) {
      callbackfn( this._buffer[i], i, this.buffer );
    }
  }

  public tryGetCellByIndex( index: number, out: Cell<T> ): boolean {
    if ( !this._buffer[index] ) {
      return false;
    } else {
      out.copy( this._buffer[index] );
      return true;
    }
  }

  public tryGetCell( x: number, y: number, out: Cell<T> ): boolean {
    if ( !this.getCell( x, y ) ) {
      return false;
    } else {
      out.copy( this.getCell( x, y ) );
      return true;
    }
  }

  public setCell( x: number, y: number, val: Cell<T> ): Cell<T> {
    return this._buffer[rowColToIndex( y, x, this.width )] = val;
  }

  public getCell( x: number, y: number ): Cell<T> {
    return this._buffer[rowColToIndex( y, x, this.width )];
  }

  public copy( newGrid: Grid<T> ) {
    this._dimensions = newGrid._dimensions;
    this._buffer = Grid.getEmptyBuffer<T>( newGrid._dimensions );

    for ( let i = 0; i < newGrid._buffer.length; ++i ) {
      this.buffer[i] = newGrid._buffer[i];
    }
  }

  public static copyTo<T>( replaceWith: Grid<T>, newGrid: Grid<T> ) {
    newGrid._dimensions = replaceWith._dimensions;
    newGrid._buffer = Grid.getEmptyBuffer<T>( replaceWith._dimensions );

    for ( let i = 0; i < replaceWith._buffer.length; ++i ) {
      newGrid._buffer[i] = replaceWith._buffer[i];
    }
  }

  public static getEmptyBuffer<T>( dimensions: Dimensions ): Cell<T>[] {
    return [...Array( dimensions.width * dimensions.height )].map( () => new Cell<T>() )
  }

  public static getBufferFromFiller<T>( dimensions: Dimensions, filler: GridFillerFunction<T>, grid?: Grid<T> ): Cell<T>[] {
    return [...Array( dimensions.width * dimensions.height )].map( ( v, index ) => filler( index, grid ) );
  }
}
