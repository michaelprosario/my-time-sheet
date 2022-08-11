import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditTimeSheetComponent } from './edit-time-sheet/edit-time-sheet.component';

const routes: Routes = [ 
  {path: 'edit-time-sheet/:id', component: EditTimeSheetComponent}, 
  {path: 'new-time-sheet', component: EditTimeSheetComponent} 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
