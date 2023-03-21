import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippingAddressQuoteComponent } from './shipping-address-quote.component';

describe('ShippingAddressQuoteComponent', () => {
  let component: ShippingAddressQuoteComponent;
  let fixture: ComponentFixture<ShippingAddressQuoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShippingAddressQuoteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippingAddressQuoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
