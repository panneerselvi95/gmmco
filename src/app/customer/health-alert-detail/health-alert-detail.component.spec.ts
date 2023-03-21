import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthAlertDetailComponent } from './health-alert-detail.component';

describe('HealthAlertDetailComponent', () => {
  let component: HealthAlertDetailComponent;
  let fixture: ComponentFixture<HealthAlertDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HealthAlertDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthAlertDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
