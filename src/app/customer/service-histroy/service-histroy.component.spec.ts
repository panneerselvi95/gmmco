import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceHistroyComponent } from './service-histroy.component';

describe('ServiceHistroyComponent', () => {
  let component: ServiceHistroyComponent;
  let fixture: ComponentFixture<ServiceHistroyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceHistroyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceHistroyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
