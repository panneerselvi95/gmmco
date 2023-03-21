import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryPartDetail1Component } from './category-part-detail1.component';

describe('CategoryPartDetail1Component', () => {
  let component: CategoryPartDetail1Component;
  let fixture: ComponentFixture<CategoryPartDetail1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryPartDetail1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryPartDetail1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
