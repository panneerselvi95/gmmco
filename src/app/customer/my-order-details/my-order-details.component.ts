import { Component, OnInit } from '@angular/core';
import { getAnalytics, logEvent } from "firebase/analytics";

@Component({
  selector: 'app-my-order-details',
  templateUrl: './my-order-details.component.html',
  styleUrls: ['./my-order-details.component.scss']
})
export class MyOrderDetailsComponent implements OnInit {

  orders: any = {
  };

  constructor() { }

  ngOnInit(): void {
    this.orders = JSON.parse(sessionStorage.getItem('order_detail') || '{}');
    console.log(this.orders)
  }


  ngAfterViewInit() {
    const analytics = getAnalytics();

    logEvent(analytics, 'Front End Screen Views', {
      firebase_screen: 'MyOrder Details Page',
      firebase_screen_class: 'MyOrder Details Page'
    })
  }





  splitchar(char: any) {
    return char.split(':');
  }
}