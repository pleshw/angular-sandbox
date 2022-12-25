import { Component, Input } from '@angular/core';
import { getNumberSequence } from '../arrayTools';
import { Grid } from "../grid";
import { Cell } from '../cell';

@Component( {
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
} )
export class GridComponent {
  @Input() width?: number = 3;
  @Input() height?: number = 3;
  @Input() showInfo?: boolean = false;

  grid: Grid<number>;

  getNumberSequence( n: number ) {
    return getNumberSequence( n );
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
