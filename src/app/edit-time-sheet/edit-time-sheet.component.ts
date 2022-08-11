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

  // 2022-08-12
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

  }

}
