import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPlanUpcomingComponent } from './my-plan-upcoming.component';

describe('MyPlanUpcomingComponent', () => {
  let component: MyPlanUpcomingComponent;
  let fixture: ComponentFixture<MyPlanUpcomingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPlanUpcomingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPlanUpcomingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
