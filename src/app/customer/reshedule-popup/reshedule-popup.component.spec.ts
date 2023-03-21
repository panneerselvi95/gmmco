import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReshedulePopupComponent } from './reshedule-popup.component';

describe('ReshedulePopupComponent', () => {
  let component: ReshedulePopupComponent;
  let fixture: ComponentFixture<ReshedulePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReshedulePopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReshedulePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
