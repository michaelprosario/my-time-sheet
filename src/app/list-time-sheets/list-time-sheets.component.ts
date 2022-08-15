import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetDocumentsQuery, TimeSheet } from '../core/services/server-clients';
import { TimeSheetsService } from '../core/services/time-sheets-service';

@Component({
  selector: 'app-list-time-sheets',
  templateUrl: './list-time-sheets.component.html',
  styleUrls: ['./list-time-sheets.component.scss']
})
export class ListTimeSheetsComponent implements OnInit {

  records: Array<TimeSheet> | undefined;
  constructor(
    private timeSheetsService: TimeSheetsService,     
    private router: Router,
    private route: ActivatedRoute
    ) 
  { 
  }

  async ngOnInit(): Promise<void> {
    const query = new GetDocumentsQuery();
    query.userId = "system";
    query.rows = 512;
    query.page = 1;

    const listResponse = await this.timeSheetsService.getList(query)
    if(listResponse && listResponse.code === 200)
    {
      this.records = listResponse.documents
    }else{
      alert('Error receiving time sheet list data');
      console.log(listResponse);
    }    
  }

  onEditRecord(record: TimeSheet){
    this.router.navigate(['/edit-time-sheet/' + record.id]);    
  }

  onNewRecord(){
    this.router.navigate(['/new-time-sheet']);    
  }

  

}
