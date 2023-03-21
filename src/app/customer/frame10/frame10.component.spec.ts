import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Frame10Component } from './frame10.component';

describe('Frame10Component', () => {
  let component: Frame10Component;
  let fixture: ComponentFixture<Frame10Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Frame10Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Frame10Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
