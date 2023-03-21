import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Frame13Component } from './frame13.component';

describe('Frame13Component', () => {
  let component: Frame13Component;
  let fixture: ComponentFixture<Frame13Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Frame13Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Frame13Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
