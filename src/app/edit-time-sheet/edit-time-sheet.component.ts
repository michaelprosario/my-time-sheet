import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { v4 as uuidv4 } from 'uuid';
import { DeleteDocumentCommand, GetDocumentQuery, GetDocumentsQuery, StoreDocumentCommandOfTimeSheet, TimeEntry, TimeSheet } from '../core/services/server-clients';
import { TimeSheetsService } from '../core/services/time-sheets-service';
import { EditTimeEntryComponent } from '../edit-time-entry/edit-time-entry.component';

export class ProjectHoursItem{
  projectId: string = "";
  totalHours: number = 0;
}

@Component({
  selector: 'app-edit-time-sheet',
  templateUrl: './edit-time-sheet.component.html',
  styleUrls: ['./edit-time-sheet.component.scss']
})
export class EditTimeSheetComponent implements OnInit {

  timeSheet: TimeSheet;
  currentTimeEntry: TimeEntry | undefined;
  projectHoursItems: Array<ProjectHoursItem> = [];
  totalHours: number = 0;
  @ViewChild('editTimeEntry') editTimeEntry : EditTimeEntryComponent | undefined;
  getUserId(){
    return "user";
  }

  constructor(private timeSheetService: TimeSheetsService,     
    private router: Router,
    private route: ActivatedRoute) { 
    this.timeSheet = new TimeSheet();
  }

  getPropertyFromUrl(property: string): string {   
    return this.route.snapshot.paramMap.get(property) || '';
  }  

  async ngOnInit(): Promise<void> {
    const url = this.router.url;
    const handleNewRecord = url.startsWith('/new-time-sheet');    
    if (handleNewRecord) {
      this.makeNewTimeSheet();
    } else {
      await this.loadExistingRecord();
    }
  }

  updateTimeSheetSummary(){
    if(!this.timeSheet.entries)
      return;
    
    let projects = Array<string>();
    for(let entry of this.timeSheet.entries)
    {
      if(entry.projectId && !projects.includes(entry.projectId))
      {
        projects.push(entry.projectId)
      }
    }    
    
    this.projectHoursItems = [];
    this.totalHours = 0;
    for(let project of projects)
    {
      // find the list of project entries for project ..
      let projectItems = this.timeSheet.entries.filter(r => r.projectId === project);
      let sum = 0;
      for(let projectItem of projectItems)
      {
        sum += projectItem.hours;
      }

      let projectHoursItem = new ProjectHoursItem();
      projectHoursItem.projectId = project;
      projectHoursItem.totalHours = sum;    
      this.projectHoursItems.push(projectHoursItem);
      this.totalHours += sum;
    }
  }

  private async loadExistingRecord() {
    const id = this.getPropertyFromUrl('id');

    const query = new GetDocumentQuery();
    query.userId = this.getUserId();
    query.id = id;
    const getResponse = await this.timeSheetService.get(query);
    if (getResponse?.code == 200) {
      this.timeSheet = getResponse.document as TimeSheet;
      this.updateTimeSheetSummary();
    }

    else {
      alert('error in loading record');
      console.log(getResponse);
    }
  }

  async onDeleteTimeSheet(){

    if(!confirm("Press OK to delete time sheet")){
      return;
    }

    const command = new DeleteDocumentCommand();
    command.id = this.timeSheet.id;
    command.userId = this.getUserId();
    const response = await this.timeSheetService.delete(command);
    if(response?.code === 200){
      alert('Time sheet deleted');
      this.onTimeSheets();
    }else{
      alert('Error deleting time sheet')
      console.log(response);
    }
  }

  async onSaveTimeSheet()
  {
    // validate the time sheet
    const command = new StoreDocumentCommandOfTimeSheet();
    command.document = this.timeSheet;
    command.userId = "mrosario";
    const storeResponse = await this.timeSheetService.storeDocument(command);
    if(storeResponse?.code === 200){
      alert('Time sheet saved');
    }else{
      alert('Error saving time sheet');
      console.log(storeResponse)
    }

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
      const recordToDelete = this.timeSheet.entries?.findIndex(r => r.id === timeEntry.id);
      if(recordToDelete || recordToDelete === 0){
        this.timeSheet.entries?.splice(recordToDelete, 1);
        this.updateTimeSheetSummary();
      }
    }
  }

  onTimeSheets(){
    this.router.navigate(['']);  
  }

  onClosed(timeEntry: TimeEntry){
    this.currentTimeEntry = undefined;
  }

  onRecordSaved(newRecord: TimeEntry){
    
    const results = this.timeSheet.entries?.filter(r => r.id === newRecord.id)
    if(results && results.length === 0)
    {
      this.timeSheet.entries?.push(newRecord);
    }

    this.currentTimeEntry = undefined;
    this.updateTimeSheetSummary()
  }

  private makeNewTimeSheet() {
    this.getWeekEndingDate();
    this.timeSheet = new TimeSheet();
    this.timeSheet.createdAt = new Date();
    this.timeSheet.createdBy = this.getUserId();
    this.timeSheet.id = uuidv4();
    this.timeSheet.notes = "";
    this.timeSheet.weekEnding = this.getWeekEndingDate();
    this.timeSheet.entries = [];
  }

  onAddEntry()
  {
    let timeEntry = new TimeEntry();
    timeEntry.createdAt = new Date();
    timeEntry.createdBy = this.getUserId();
    let currentDate = new Date();
    let strCurrentDate: string = currentDate.toISOString().split('T')[0];
    timeEntry.date = strCurrentDate;
    timeEntry.id = uuidv4();
    this.currentTimeEntry = timeEntry;

    this.editTimeEntry?.onNewRecordStart();
  }


}
