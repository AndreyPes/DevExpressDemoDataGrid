import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DataGridViewComponent } from './datagridview/data-grid-view/data-grid-view.component';
import { DxDataGridModule, DxButtonModule, DxSelectBoxModule, DxCheckBoxModule, DxTabPanelModule } from 'devextreme-angular';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    DataGridViewComponent,
  ],
  // exports: [
  //   DataGridViewComponent
  // ],
  imports: [
    BrowserModule,
    //RouterModule.forRoot(appRoutes),
    AppRoutingModule,
    DxDataGridModule,
    DxButtonModule,
    DxSelectBoxModule,
    DxCheckBoxModule,
    DxTabPanelModule,
    HttpClientModule,
    //DataGridViewComponent
  ],
  providers: [],
  bootstrap: [
    AppComponent]
})
export class AppModule { }