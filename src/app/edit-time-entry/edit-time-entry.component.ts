import { Component, Input, OnInit } from '@angular/core';
import { TimeEntry } from '../core/entities/entities';

@Component({
  selector: 'app-edit-time-entry',
  templateUrl: './edit-time-entry.component.html',
  styleUrls: ['./edit-time-entry.component.scss']
})
export class EditTimeEntryComponent implements OnInit {

  @Input() timeEntry : TimeEntry = new TimeEntry();
  status: string = "";
  constructor() { 

  }

  ngOnInit(): void {

  }

}
