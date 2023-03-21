import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyfleetsListComponent } from './myfleets-list.component';

describe('MyfleetsListComponent', () => {
  let component: MyfleetsListComponent;
  let fixture: ComponentFixture<MyfleetsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyfleetsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyfleetsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
