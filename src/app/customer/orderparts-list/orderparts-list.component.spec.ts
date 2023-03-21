import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderpartsListComponent } from './orderparts-list.component';

describe('OrderpartsListComponent', () => {
  let component: OrderpartsListComponent;
  let fixture: ComponentFixture<OrderpartsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderpartsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderpartsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
