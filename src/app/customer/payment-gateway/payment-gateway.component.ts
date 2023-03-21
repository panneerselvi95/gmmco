import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { FleetService } from 'src/app/services/fleet.service';
import { NgbActiveModal, NgbModal, NgbModalRef, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/services/toastr.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { getAnalytics, logEvent } from "firebase/analytics";

// import * as nodeCCAvenue from 'node-ccavenue';

@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.scss']
})
export class PaymentGatewayComponent implements OnInit {
  @ViewChild('form') form!: ElementRef;

  accessCode: any;
  closeResult: any;
  getDismissReason: any;
  encRequestRes: any;
  testAmount: any = '5835';
  selectedAddress: any = {
    name: 'testing',
    address: 'test address',
    city: 'test city',
    pincode: '23456',
    state: 'state test',
    phone: '7401075899',
    useremail: "",
    cartAccum: "",
    deafultdatas: {}

  }
  getTotalValues: any;
  creditValue: any;
  refNo: any;
  tcscredit: boolean = false;
  envVar: any;


  constructor(private auth: AuthService, private route: Router, private toaster: ToastService, private fleetservice: FleetService, private modalService: NgbModal, private modalRef: NgbActiveModal) {
    this._getReferenceId();
    this.envVar = environment;
  }



  ngOnInit(): void {
    // debugger;
    this.getTotalValues = JSON.parse(sessionStorage.getItem('total') || '')
    console.log(this.getTotalValues, "get payment val");
    this._getDefaultAddress();
    this.getTcsStatus()
    this.getQuoteUpdated();

    setTimeout(() => {
      this.getQuoteUpdated();
    }, 2000)

  }

  ngAfterViewInit() {
    const analytics = getAnalytics();

    logEvent(analytics, 'Front End Screen Views', {
      firebase_screen: 'Payment Gateway Page',
      firebase_screen_class: 'Payment Gateway Page'
    })
  }


  open(content: any) {
    // console.log(this.get_credit_check())

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  getTcsStatus() {
    this.fleetservice._tcsCreditCheck().subscribe((data: any) => {
      if (data.response.dTcsAppl == 'Yes' && data.response.applyinbill == true) {
        // alert(1)
        this.selectedAddress.cartAccum = data.response.cartAccum

        this.tcscredit = true
      } else {
        // alert(2)
        this.tcscredit = false
      }
    })

  }

  getQuoteUpdated() {
    this.fleetservice._QuoteCalcUpdate().subscribe((data: any) => {
    })
  }

  checkout() {

    // this.fleetservice._getDefaultDatas().subscribe((data: any) => {

    //   if (data.response.defEmail != null && data.response.defEmail != "") {

    this.accessCode = environment.accesscode
    let redirect_url = environment.baseUrl + 'CRM/CCAvenueDecrypt';
    let workingKey = environment.workingKey;
    let useremail = 'testemail@gmail.com';

    let order_no = sessionStorage.getItem('id')
    let request = `merchant_id=35524&merchant_param2=${order_no}&merchant_param4=${this.selectedAddress.cartAccum}&merchant_param5=${sessionStorage.getItem('deliverorder') || 0}&order_id=${this.refNo}&currency=INR&amount=${this.tcscredit ? this.getTotalValues["total"] : this.getTotalValues["subtotal"]}&redirect_url=${encodeURIComponent(redirect_url)}&cancel_url=${encodeURIComponent(redirect_url)}&language=EN&billing_name=${this.selectedAddress.name}&billing_address=${this.selectedAddress.address}&billing_city=${this.selectedAddress.city}&billing_state=MH&billing_zip=${this.selectedAddress.pincode}&billing_country=India&billing_tel=${this.selectedAddress.phone}&delivery_name=${this.selectedAddress.name}&delivery_address=${this.selectedAddress.address}&delivery_city=${this.selectedAddress.city}&delivery_state=${this.selectedAddress.state}&delivery_zip=${this.selectedAddress.pincode}&delivery_country=India&sub_account_id=HQCCA&delivery_tel=${this.selectedAddress.phone}&billing_email=${this.selectedAddress.useremail}`
    console.log(request, "ccAvnreqEnq")
    console.log(this.tcscredit ? this.getTotalValues["total"] : this.getTotalValues["subtotal"])

    this.fleetservice._getPayment_Details(this.auth.encryptUsingAES256(request)).subscribe((data: any) => {
      console.log(data.response.encrypted);
      this.encRequestRes = data.response.encrypted;
      // this.getCCavDetail()
      sessionStorage.setItem('pagename', 'payment')
      setTimeout(() => {

        this.form.nativeElement.submit();
      }, 1000)

    })

    // } else {
    //   this.toaster.showInformation('Select Default Contact');
    //   this.route.navigateByUrl('/customer/all-contacts')
    // }

    // })




  }

  // getCCavDetail(){
  //   this.fleetservice._get_ccav().subscribe((data:any)=>{
  //     console.log(data)
  //   })
  // }

  numberWithCommas(x: any) {
    return Number(x).toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR'
    });

  }
  numberWithOnlyCommas(x: any) {
    return Number(x).toLocaleString('en-IN')

  }
  _getDefaultAddress() {
    this.fleetservice._getDefaultDatas().subscribe((datas: any) => {
      console.log(datas, "email def")
      this.selectedAddress['useremail'] = datas.response['defEmail'];
      this.selectedAddress['address'] = datas.response['billAdd1'];
      this.selectedAddress['name'] = datas.response['billName1'];
      this.selectedAddress['phone'] = datas.response['defMobile'];
      this.selectedAddress['billCity'] = datas.response['billCity'];
      this.selectedAddress['pincode'] = datas.response['billPin'];
      this.selectedAddress['state'] = datas.response['billStateName'];;
      this.selectedAddress['deafultdatas'] = datas.response;


    })
  }
  get_credit_check() {
    let data: any;
    this.fleetservice.credit_check().subscribe((data: any) => {

      this.creditValue = data.response.feed.entry.content.mProperties.dCreditExp;
      // this.toaster.showSuccess('Successfully Submitted')

      // alert(data.response.feed.entry.content.mProperties.dCreditExp+'Your Credit Balance')

    })

  }


  _getReferenceId() {
    this.fleetservice._getRefNo_ccav().subscribe((data: any) => {
      this.refNo = data.response
      sessionStorage.setItem('orderid', this.refNo)
    })
  }

  _dedcreditAmt() {
    this.fleetservice._deductFromCredit().subscribe((data: any) => {
      console.log(data)

      this.toaster.showSuccess('Order Created Successfully')

      this.route.navigateByUrl('/customer/home')
      this.modalRef.close();
    })
  }
  split(key: any) {
    return key.split('/');
  }
  //     createOrder(){

  //       let obj:any = { "SalesOrderNo" : "",
  //       "QuotationNumber" : "",
  //       "OrderType" : "ZPCC",
  //       "SalesOrg" : "GS01",
  //       "DistrChannel" : "20",
  //       "Division": "",
  // "DeliveryPlant": "",
  // "SalesOffice": "",
  // "SalesGroup": "",
  // "SoldToParty": this.currentCustomerId,
  // "ShipToParty": this.currentCustomerId,
  // "BillToParty": this.currentCustomerId,
  // "CusPoNum": "",
  // "CusPoDate": "",
  // "NeedByDate": "",
  // "PaymentTerms": "",
  // "Incoterms": "",
  // "OrderReason": "",
  // "SalesEmployee": "",
  // "Model": "",
  // "SerialNo": "FBY11462",
  // "CrmRefId": "",
  // "ActualSmu": "",
  // "JobCode": "",
  // "ComponentCode": "",
  // "Lead1": "",
  // "Lead2": "",
  // "Lead3": "",
  // "ContactPersonName": "",
  // "ContactPersonNum": "9010203067",
  // "Text": "string",
  // "PaymentMode": "Cash",
  // "PaymentReference": "",
  // "PaymentAmount": "",  
  // "AS_ITEM" :this.my_cart

  // }



  //       this.fleetService.create_order(obj).subscribe((data:any)=>{
  // console.log(data)
  // this.toastr.showSuccess(data.response.salesOrderNo+'  Order Placed Successfully')

  //       })
  //     }


}
