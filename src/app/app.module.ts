import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridCellComponent } from './grid-cell/grid-cell.component';
import { GridComponent } from './grid/grid.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule( {
  declarations: [
    AppComponent,
    GridCellComponent,
    GridComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
} )
export class AppModule { }
