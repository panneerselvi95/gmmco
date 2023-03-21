import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPlanHealthComponent } from './my-plan-health.component';

describe('MyPlanHealthComponent', () => {
  let component: MyPlanHealthComponent;
  let fixture: ComponentFixture<MyPlanHealthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyPlanHealthComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPlanHealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
