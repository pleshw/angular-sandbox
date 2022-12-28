import { Component, EventEmitter, Input, OnInit, Output, ElementRef } from '@angular/core';
import { Cell } from '../cell';

@Component( {
  selector: 'app-grid-cell',
  templateUrl: './grid-cell.component.html',
  styleUrls: ['./grid-cell.component.scss']
} )
export class GridCellComponent implements OnInit {
  isGrabbed: boolean = false;

  @Input() cell?: Cell<number>;

  @Output() grabCellEvent = new EventEmitter<GridCellComponent>();
  @Output() trySwapCellWithSelectedEvent = new EventEmitter<GridCellComponent>();

  grabCell( value: GridCellComponent ) {
    this.isGrabbed = true;
    this.grabCellEvent.emit( value );
  }

  trySwapCellWithSelected( value: GridCellComponent ) {
    this.isGrabbed = true;
    this.trySwapCellWithSelectedEvent.emit( value );
  }

  dropCell( cell: GridCellComponent ) {
    this.isGrabbed = false;
  }

  constructor( private elementRef: ElementRef ) {
  }

  ngOnInit(): void {
    this.elementRef.nativeElement.querySelector( '.cell-content' ).addEventListener( 'mouseleave', () => {
      this.dropCell( this );
    } );
  }

}
