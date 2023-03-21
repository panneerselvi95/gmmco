import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFocComponent } from './my-foc.component';

describe('MyFocComponent', () => {
  let component: MyFocComponent;
  let fixture: ComponentFixture<MyFocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyFocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
