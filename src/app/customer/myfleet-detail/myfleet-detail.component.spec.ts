import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyfleetDetailComponent } from './myfleet-detail.component';

describe('MyfleetDetailComponent', () => {
  let component: MyfleetDetailComponent;
  let fixture: ComponentFixture<MyfleetDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyfleetDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyfleetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
