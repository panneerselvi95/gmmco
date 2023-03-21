import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FleetService } from 'src/app/services/fleet.service';
import { ToastService } from 'src/app/services/toastr.service';
import { DatePipe } from '@angular/common';
import { getAnalytics, logEvent } from "firebase/analytics";

declare var $: any;
@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.scss'],
  providers: [DatePipe]
})
export class MyOrdersComponent implements OnInit {

  tabs: any = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven']
  selectedIndex = 0;
  currentCustomerId: any;
  my_orders: any = [];
  order_details: any = {};
  ship_details: any;
  checkpoints: any;
  curreSaleorderNo: any;
  getmore: boolean = true;

  constructor(
    private fleetService: FleetService,
    private toaster: ToastService,
    private router: Router,
    private datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.currentCustomerId = sessionStorage.getItem('id');
    this._get_my_orders();
  }

  ngAfterViewInit() {
    const analytics = getAnalytics();

    logEvent(analytics, 'Front End Screen Views', {
      firebase_screen: 'MyOrders Page',
      firebase_screen_class: 'MyOrders Page'
    })
  }



  _get_my_orders() {
    this.fleetService._my_orders(this.currentCustomerId).subscribe((resp: any) => {
      if (resp['isSuccess']) {
        this.my_orders = resp['response'];
      } else {
        this.my_orders = [];
      }
      console.log(resp);
    });
  }
  _get_order_details(order_id: any, i: any) {
    let order_id_temp = order_id;
    this.curreSaleorderNo = order_id
    // order_id = 16348;
    if (!this.order_details.hasOwnProperty(order_id_temp))
      this.fleetService._order_details(order_id).subscribe((resp: any) => {

        console.log(resp, "inovnum")
        if (resp['isSuccess'] || !resp['isSuccess']) {
          this.order_details[order_id_temp] = resp['response']['d']['results'];
          console.log(this.order_details[order_id_temp], 'hjg');
          if (this.order_details[order_id_temp][0]['odnNo']) {
            this.shipping_Details(this.order_details[order_id_temp][0]['odnNo'], this.order_details[order_id_temp][i]);
          } else if (this.order_details[order_id_temp][0]['odnNo'] == "" || this.order_details[order_id_temp][0]['status'] != "Order Invoiced") {
            this.getmore = false;

            // $('.panel-collapse.collapse.in').css("display", "none");
            this.toaster.showError('Selected Order is yet to be Invoiced. Please try after sometime')
          }

          console.log(this.order_details[order_id_temp][i])

        } else {
          this.order_details[order_id_temp] = [];
        }
        console.log(resp);
        // console.log(this.order_details)
      });
  }
  request_mail(order_detail: any) {
    let obj = {
      // email: order_detail.email || 'balasubbu@colaninfotech.net',
      invoice_no: order_detail.invoiceNo,
      id: this.currentCustomerId
    }
    this.fleetService._mail_order_receipt(obj).subscribe((resp: any) => {
      if (resp['isSuccess']) {
        if (resp['response']['d']['results'][0]['maiL_ID'] && resp['response']['d']['results'][0]['maiL_ID'] != "null") {
          this.toaster.showSuccess(resp.message)
        } else {
          this.toaster.showError(resp['response']['d']['results'][0]['message'])
        }
      } else {
        this.toaster.showError(resp.message)
      }
      console.log(resp);
    });
  }
  _order_detail_route(sales_order_no: any, specific_invoice: any) {
    console.log(specific_invoice);
    if (specific_invoice) {
      sessionStorage.setItem('order_detail', JSON.stringify({
        'specific_invoice': specific_invoice,
        order_detail: this.order_details[sales_order_no],
        sales_order_no: this.my_orders.find((item: any) => item.salesOrderNo == sales_order_no)
      }))
      this.router.navigateByUrl('/customer/my-order-details');
    }
  }
  _filter_order_details(order_details: any) {

    // console.log(order_details)
    let filter: any = {};
    if (order_details) {
      for (let order of order_details) {
        filter[order.invoiceNo] = {
          invoiceNo: order.invoiceNo,
          invQty: this._chech_prop(filter, order.invoiceNo, 'invQty') ? (Number(order.invQty) + Number(filter[order.invoiceNo]['invQty'])) : Number(order.invQty),
          invGrossVal: this._chech_prop(filter, order.invoiceNo, 'invGrossVal') ? (Number(order.invGrossVal) + Number(filter[order.invoiceNo]['invGrossVal'])) : Number(order.invGrossVal),
          invCrtdOn: order.invCrtdOn,
          status: order.status,
          odnNo: order.odnNo,
          obdCrtdOn: order.obdCrtdOn,
          shipdetails: this.ship_details,
          checkpoints: this.checkpoints,
          // obdQty:order.obdQty,
          obdQty: this._chech_prop(filter, order.invoiceNo, 'obdQty') ? (Number(order.obdQty) + Number(filter[order.invoiceNo]['obdQty'])) : Number(order.obdQty),
          soGrossVal: this._chech_prop(filter, order.invoiceNo, 'soGrossVal') ? (Number(order.soGrossVal) + Number(filter[order.invoiceNo]['soGrossVal'])) : Number(order.soGrossVal),

          // soGrossVal:order.soGrossVal
        }
      }
    }
    let res = [];
    for (let key of Object.keys(filter)) {
      res.push({
        invoiceNo: filter[key].invoiceNo,
        odnNo: filter[key].odnNo,
        invQty: filter[key].invQty,
        invGrossVal: filter[key].invGrossVal,
        invCrtdOn: filter[key].invCrtdOn,
        status: filter[key].status,
        obdCrtdOn: filter[key].obdCrtdOn,
        shipdetails: this.ship_details,
        checkpoints: this.checkpoints,
        obdQty: filter[key].obdQty,
        soGrossVal: filter[key].soGrossVal

      })
    }
    return res;
  }
  _chech_prop(inp: any, type1: any, type2: any) {
    return inp.hasOwnProperty(type1) && inp[type1].hasOwnProperty(type2)
  }
  track_shipment() {

  }
  ifStartDate(odbdate: any) {

    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    // console.log(typeof odbdate)
    const firstDate: any = this.datepipe.transform(new Date(), 'dd.MM.yyyy')
    // const secondDate :any= Date.UTC(odbdate)
    // console.log(new Date(Date.parse(odbdate)));
    // const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    // console.log(new Date(firstDate) ,secondDate)

  }
  initiate_return(crtdon: any) {
    console.log(crtdon)
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    let date1: any = new Date(crtdon)
    let date2: any = new Date();
    console.log(date1)
    console.log(date2)
    const diffDays = Math.round(Math.abs((date1 - date2) / oneDay));
    console.log(diffDays)


    if (date1 < date2 && diffDays > 10) {
      console.log('DA')
      // alert('Sorry! Parts can only be returned within 10 days from the date of Delivery');
      this.toaster.showError('Sorry! Parts can only be returned within 10 days from the date of Delivery')
    } else {
      console.log('Allow')
      this.router.navigateByUrl('/customer/initial-orders/' + this.curreSaleorderNo)
    }
    // 
  }

  shipping_Details(invno?: any, obj?: any) {

    this.fleetService._get_ShippingDetails(invno).subscribe((data: any) => {
      this.ship_details = data.response.results[0];
      this.checkpoints = this.ship_details.checkpoints.reverse()
      console.log(this.ship_details, "shipdetails")
    })

  }

  numberWithCommas(x: any) {
    return Number(x).toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR'
    });



  }
}
