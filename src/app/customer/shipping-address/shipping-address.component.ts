import { Component, OnInit } from '@angular/core';
import { getAnalytics, logEvent } from "firebase/analytics";

@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.scss']
})
export class ShippingAddressComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    const analytics = getAnalytics();

    logEvent(analytics, 'Front End Screen Views', {
      firebase_screen: 'Shipping Address Page',
      firebase_screen_class: 'Shipping Address Page'
    })
  }



}

