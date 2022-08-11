import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditTimeSheetComponent } from './edit-time-sheet/edit-time-sheet.component';
import { ListTimeSheetsComponent } from './list-time-sheets/list-time-sheets.component';
import { EditTimeEntryComponent } from './edit-time-entry/edit-time-entry.component';

@NgModule({
  declarations: [
    AppComponent,
    EditTimeSheetComponent,
    ListTimeSheetsComponent,
    EditTimeEntryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
