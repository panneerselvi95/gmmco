import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryListAttachmentComponent } from './category-list-attachment.component';

describe('CategoryListAttachmentComponent', () => {
  let component: CategoryListAttachmentComponent;
  let fixture: ComponentFixture<CategoryListAttachmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryListAttachmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryListAttachmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
