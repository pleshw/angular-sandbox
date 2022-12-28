import { Component, Input } from '@angular/core';
import { getNumberSequence } from '../arrayTools';
import { Grid } from "../grid";
import { Cell } from '../cell';
import { rowColToIndex, Point2D } from '../mathTools';
import { GridCellComponent } from '../grid-cell/grid-cell.component';

@Component( {
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
} )
export class GridComponent {
  @Input() width?: number = 3;
  @Input() height?: number = 3;
  @Input() showInfo?: boolean = false;

  selectedBefore?: GridCellComponent;
  selectedCell?: GridCellComponent;

  grid: Grid<number>;

  getNumberSequence( n: number ) {
    return getNumberSequence( n );
  }

  rowColToIndex( x: number, y: number ) {
    return rowColToIndex( y, x, this.getWidth() )
  }

  grabCell( cell: GridCellComponent ) {
    if ( this.selectedCell ) {
      this.selectedBefore = this.selectedCell;
    }

    this.selectedCell = cell;
  }

  trySwapCellWithSelected( cell: GridCellComponent, x: number, y: number ) {
    if ( this.selectedCell ) {
      this.selectedBefore = this.selectedCell;

      if ( this.selectedBefore.cell && this.selectedBefore.cell.gridReference && this.selectedBefore.cell.gridReference.position ) {
        const selectedBeforePosition = this.selectedBefore.cell.gridReference.position;
        this.grid.swapCells( selectedBeforePosition.x, selectedBeforePosition.y, x, y );
      }

      this.clearSelected();
    } else {
      this.grabCell( cell );
    }
  }

  clearSelected() {
    this.selectedCell = undefined;
    this.selectedBefore = undefined;
  }

  getCellId( x: number, y: number ) {
    return 'cell' + this.rowColToIndex( x, y );
  }

  getWidth(): number {
    return this.width || 3;
  }

  getHeight(): number {
    return this.height || 3;
  }

  getArea(): number {
    return this.getWidth() * this.getHeight();
  }

  constructor() {
    this.grid = new Grid<number>( {
      dimensions: {
        width: this.getWidth(),
        height: this.getHeight()
      }
    } );
  }

  ngOnChanges(): void {
    this.grid = new Grid<number>( {
      dimensions: {
        width: this.getWidth(),
        height: this.getHeight()
      },
      filler: ( i ) => new Cell<number>( {
        content: i + 1
      } )
    } );
  }


}
