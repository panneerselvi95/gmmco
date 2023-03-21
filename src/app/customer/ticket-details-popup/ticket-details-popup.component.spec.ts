import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketDetailsPopupComponent } from './ticket-details-popup.component';

describe('TicketDetailsPopupComponent', () => {
  let component: TicketDetailsPopupComponent;
  let fixture: ComponentFixture<TicketDetailsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketDetailsPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketDetailsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
