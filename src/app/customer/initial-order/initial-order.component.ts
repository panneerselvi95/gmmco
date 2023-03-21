import { Component, OnInit } from '@angular/core';
import { FleetService } from 'src/app/services/fleet.service';
import { ToastService } from 'src/app/services/toastr.service';
import { Router, ActivatedRoute } from '@angular/router';
import { EMPTY } from 'rxjs';
import { getAnalytics, logEvent } from "firebase/analytics";

@Component({
  selector: 'app-initial-order',
  templateUrl: './initial-order.component.html',
  styleUrls: ['./initial-order.component.scss']
})
export class InitialOrderComponent implements OnInit {
  afuConfig = {
    uploadAPI: {
      url: "https://example-file-upload-api"
    }

  };

  booleans: boolean = true

  myFiles: any[] = [];
  sMsg: any = '';
  selectedReason: any;

  orderDetails: any;
  counter: number = 1;
  currentOrderDetails: any;
  id: any;
  defectDetails: any;

  constructor(private fleetService: FleetService, private toastr: ToastService, private activateRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.id = this.activateRoute.snapshot.params;
    this.getReturnDetails()
    this.selectedReason = "";



  }

  ngAfterViewInit() {
    const analytics = getAnalytics();

    logEvent(analytics, 'Front End Screen Views', {
      firebase_screen: 'Initial Order Page',
      firebase_screen_class: 'Initial Order Page'
    })
  }



  increment(val: any, i: any, currentObj: any) {
    console.log(i, "jiojijij")

    // console.log(   this.orderDetails[0] ,"jiojijij")
    this.currentOrderDetails = currentObj;

    if (val == 'plus') {
      this.orderDetails[i]['returnedQty1'] += this.counter;

    } else if (val == 'minus') {

      this.orderDetails[i]['returnedQty1'] -= this.counter;
    }
  }

  getReturnDetails() {
    this.fleetService._get_ReturnOrderDetails(this.id['id']).subscribe((data: any) => {
      console.log(data.response);

      this.orderDetails = data.response.orderDetails;
      this.orderDetails.forEach((item: any) => {

        item['returnedQty1'] = (this.convertToNum(item.quantity) - this.convertToNum(item.returnedQty));
      });
      // .filter((item:any)=>{ return item.salesOrderNo == this.id['id']});
      this.defectDetails = data.response.returnReasons;
      console.log(this.orderDetails, "ji")
    })
  }
  getFileDetails(e: any) {
    //console.log (e.target.files);
    for (var i = 0; i < e.target.files.length; i++) {
      this.myFiles.push(e.target.files[i]);
    }
  }

  convertToNum(num: any) { return parseInt(num) }
  split(str: any) { return str.split(':') }

  returnReason(item: any) {
    console.log(item)
    this.currentOrderDetails = item;
    let returnInfo: any = [{
      "mobile": sessionStorage.getItem('mob'),
      "panNumber": sessionStorage.getItem('pan'),
      "orderNumber": this.currentOrderDetails.poNumber + "",
      "orderDate": this.currentOrderDetails.createdOn,
      "material": this.currentOrderDetails.custMaterial,
      "materialNo": this.currentOrderDetails.custMaterial,
      "sourceofsupply": this.currentOrderDetails.sourceOfSupply,
      "returnQty": this.currentOrderDetails.returnedQty1,
      "returnTime": "",
      "returnReasoncode": parseInt(this.selectedReason)
    }]

    if (this.selectedReason != "" && this.selectedReason != null) {
      this.fleetService._returnInformation(returnInfo).subscribe((data: any) => {
        console.log(data)

        if (data.isSuccess == true) {
          this.toastr.showSuccess('Returned SuccessFully')
          this.router.navigateByUrl('/customer/my-orders')
        }
      })
    } else {
      this.toastr.showError('please select reason for return')
    }

  }


}
