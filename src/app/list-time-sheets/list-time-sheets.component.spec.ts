import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTimeSheetsComponent } from './list-time-sheets.component';

describe('ListTimeSheetsComponent', () => {
  let component: ListTimeSheetsComponent;
  let fixture: ComponentFixture<ListTimeSheetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTimeSheetsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTimeSheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
