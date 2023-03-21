import { Component, OnInit } from '@angular/core';
import { FleetService } from 'src/app/services/fleet.service';
import { Router, ActivatedRoute } from '@angular/router';
import { getAnalytics, logEvent } from "firebase/analytics";

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.scss']
})
export class OrderConfirmationComponent implements OnInit {
  customerData: any;
  orderData: any;
  constructor(private fleetService: FleetService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this._getDefaultAddress();
    this._getOrderDetails();
  }
  ngAfterViewInit() {
    const analytics = getAnalytics();

    logEvent(analytics, 'Front End Screen Views', {
      firebase_screen: 'Order Confirmation Page',
      firebase_screen_class: 'Order Confirmation Page'
    })
  }



  _getDefaultAddress() {
    this.fleetService._getDefaultDatas().subscribe((datas: any) => {
      console.log(datas);

      this.customerData = datas.response;
    })
  }

  _getOrderDetails() {
    let orderid: any = this.router.snapshot.queryParams['id'] || "";
    let id: any = sessionStorage.getItem('id')
    let tempid: any = this.router.snapshot.queryParams['id'] ? "" : sessionStorage.getItem('orderid') || "";
    this.fleetService._getOrderDetails_(id, orderid, tempid).subscribe((datas: any) => {
      console.log(datas)
      this.orderData = datas.response;
    })
  }

  convertToInt(num: any) {

    return Number(num)
  }
}
