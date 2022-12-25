import { Component } from '@angular/core';
import { Grid } from './grid';


@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
} )

export class AppComponent {
  gridWidth?: number;
  gridHeight?: number;
  showGridInfo?: boolean;
}
