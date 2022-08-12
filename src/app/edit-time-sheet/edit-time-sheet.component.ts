import { Component, OnInit, ViewChild } from '@angular/core';
import { TimeEntry, TimeSheet } from '../core/entities/entities';
import { v4 as uuidv4 } from 'uuid';
import { EditTimeEntryComponent } from '../edit-time-entry/edit-time-entry.component';

@Component({
  selector: 'app-edit-time-sheet',
  templateUrl: './edit-time-sheet.component.html',
  styleUrls: ['./edit-time-sheet.component.scss']
})
export class EditTimeSheetComponent implements OnInit {

  timeSheet: TimeSheet;
  currentTimeEntry: TimeEntry | undefined;
  @ViewChild('editTimeEntry') editTimeEntry : EditTimeEntryComponent | undefined;
  getUserId(){
    return "user";
  }

  constructor() { 
    this.timeSheet = new TimeSheet();
  }

  ngOnInit(): void {
    this.makeNewTimeSheet();
  }

  getWeekEndingDate(){
    // get current date
    let currentDate = new Date();
    let day = currentDate.getDay();
    
    // if current date is less than friday
    if(day < 5){
      let k = 5 - day - 1;
      const date = currentDate;
      date.setDate(date.getDate() + k);      
      currentDate = date;
    }
    else if(day > 5)
    {
      let k = day - 5 - 1;
      const date = currentDate;
      date.setDate(date.getDate() - k);      
      currentDate = date;
    }

    let response = currentDate.toISOString().split('T')[0];
    return response;
  }

  onEditEntry(timeEntry: TimeEntry){
    this.currentTimeEntry = timeEntry;
    this.editTimeEntry?.onUpdateRecordStart();
  }

  onDeleteEntry(timeEntry: TimeEntry){
    if(confirm("Press OK to delete record")){
      const recordToDelete = this.timeSheet.entries.findIndex(r => r.id === timeEntry.id);
      this.timeSheet.entries.splice(recordToDelete, 1);
    }
  }

  onClosed(timeEntry: TimeEntry){
    this.currentTimeEntry = undefined;
  }

  onRecordSaved(newRecord: TimeEntry){
    const results = this.timeSheet.entries.filter(r => r.id === newRecord.id)
    if(results.length === 0)
    {
      this.timeSheet.entries.push(newRecord);
    }

    this.currentTimeEntry = undefined;
  }

  private makeNewTimeSheet() {
    this.getWeekEndingDate();
    this.timeSheet = new TimeSheet();
    this.timeSheet.createdAt = Date.now();
    this.timeSheet.createdBy = this.getUserId();
    this.timeSheet.id = uuidv4();
    this.timeSheet.notes = "";
    this.timeSheet.weekEnding = this.getWeekEndingDate();
  }

  onAddEntry()
  {
    let timeEntry = new TimeEntry();
    timeEntry.createdAt = Date.now();
    timeEntry.createdBy = this.getUserId();
    let currentDate = new Date();
    let strCurrentDate: string = currentDate.toISOString().split('T')[0];
    timeEntry.date = strCurrentDate;
    timeEntry.id = uuidv4();
    this.currentTimeEntry = timeEntry;

    this.editTimeEntry?.onNewRecordStart();
  }

}
