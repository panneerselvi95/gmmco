import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressFormPopupComponent } from './address-form-popup.component';

describe('AddressFormPopupComponent', () => {
  let component: AddressFormPopupComponent;
  let fixture: ComponentFixture<AddressFormPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressFormPopupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressFormPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
