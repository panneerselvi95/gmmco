import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentGatewayTwoComponent } from './payment-gateway-two.component';

describe('PaymentGatewayTwoComponent', () => {
  let component: PaymentGatewayTwoComponent;
  let fixture: ComponentFixture<PaymentGatewayTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentGatewayTwoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentGatewayTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
