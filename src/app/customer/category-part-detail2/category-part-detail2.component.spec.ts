import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPartDetail2Component } from './category-part-detail2.component';

describe('CategoryPartDetail2Component', () => {
  let component: CategoryPartDetail2Component;
  let fixture: ComponentFixture<CategoryPartDetail2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryPartDetail2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryPartDetail2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
