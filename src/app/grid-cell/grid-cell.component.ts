import { Component, Input, OnInit } from '@angular/core';
import { Cell } from '../cell';

@Component( {
  selector: 'app-grid-cell',
  templateUrl: './grid-cell.component.html',
  styleUrls: ['./grid-cell.component.scss']
} )
export class GridCellComponent implements OnInit {
  @Input() cell?: Cell<number>;

  constructor() { }

  ngOnInit(): void {
  }

}
