import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyOutstandingComponent } from './my-outstanding.component';

describe('MyOutstandingComponent', () => {
  let component: MyOutstandingComponent;
  let fixture: ComponentFixture<MyOutstandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyOutstandingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyOutstandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
