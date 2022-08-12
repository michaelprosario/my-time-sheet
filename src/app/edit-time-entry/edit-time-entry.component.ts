import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractValidator } from 'fluent-ts-validator';
import { TimeEntry } from '../core/entities/entities';

class TimeEntryValidator extends AbstractValidator<TimeEntry> {
  constructor() {
    super();

    this.validateIf(r => r.createdBy).isNotEmpty();
    this.validateIf(r => r.id).isNotEmpty();
    this.validateIf(r => r.date).isNotEmpty();
    this.validateIfNumber(r => r.hours).isGreaterThan(0);
    this.validateIf(r => r.projectId).isNotEmpty();
    this.validateIf(r => r.storyId).isNotEmpty();
  }
}

@Component({
  selector: 'app-edit-time-entry',
  templateUrl: './edit-time-entry.component.html',
  styleUrls: ['./edit-time-entry.component.scss']
})
export class EditTimeEntryComponent implements OnInit {

   
  @Input()
  timeEntry!: TimeEntry | undefined;
  @Output() onRecordSaved = new EventEmitter<TimeEntry>();
  status: string = "";
  formErrors: Array<string> = [];
  constructor() { 

  }

  ngOnInit(): void {
    this.status = "Add time entry"
  }

  onSave()
  {

    this.formErrors = [];
    let validator = new TimeEntryValidator();
    if(!this.timeEntry){
      throw Error("timeEntry is not defined");
    }

    let results = validator.validate(this.timeEntry);
    if(results.isInvalid())
    {
      this.formErrors = results.getFailureMessages();
      return;
    }

    this.onRecordSaved.emit(this.timeEntry);
  }

}
