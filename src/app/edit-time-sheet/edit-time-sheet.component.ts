import { Component, OnInit } from '@angular/core';
import { TimeSheet } from '../core/entities/entities';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-edit-time-sheet',
  templateUrl: './edit-time-sheet.component.html',
  styleUrls: ['./edit-time-sheet.component.scss']
})
export class EditTimeSheetComponent implements OnInit {

  timeSheet: TimeSheet;
  getUserId(){
    return "user";
  }

  constructor() { 
    this.timeSheet = new TimeSheet();
  }

  ngOnInit(): void {
    this.makeNewTimeSheet();

  }

  private makeNewTimeSheet() {
    this.timeSheet = new TimeSheet();
    this.timeSheet.createdAt = Date.now();
    this.timeSheet.createdBy = this.getUserId();
    this.timeSheet.id = uuidv4();
    this.timeSheet.notes = "";
  }

  onAddEntry()
  {

  }

}
