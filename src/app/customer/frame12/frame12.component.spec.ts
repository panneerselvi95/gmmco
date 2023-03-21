import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Frame12Component } from './frame12.component';

describe('Frame12Component', () => {
  let component: Frame12Component;
  let fixture: ComponentFixture<Frame12Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Frame12Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Frame12Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
