import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditTimeSheetComponent } from './edit-time-sheet/edit-time-sheet.component';
import { ListTimeSheetsComponent } from './list-time-sheets/list-time-sheets.component';

@NgModule({
  declarations: [
    AppComponent,
    EditTimeSheetComponent,
    ListTimeSheetsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
