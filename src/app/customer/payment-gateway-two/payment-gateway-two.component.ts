


import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { FleetService, Foclisting } from 'src/app/services/fleet.service';
import { NgbActiveModal, NgbModal, NgbModalRef, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/services/toastr.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { getAnalytics, logEvent } from "firebase/analytics";

// import * as nodeCCAvenue from 'node-ccavenue';

@Component({
  selector: 'app-payment-gateway-two',
  templateUrl: './payment-gateway-two.component.html',
  styleUrls: ['./payment-gateway-two.component.scss']
})
export class PaymentGatewayTwoComponent implements OnInit {
  @ViewChild('form') form!: ElementRef;

  accessCode: any;
  closeResult: any;
  getDismissReason: any;
  encRequestRes: any;
  orderReq: any;
  testAmount: any = '5835';
  cCode: any;
  // Code:number = + cCode ;
  selectedAddress: any = {
    name: 'testing',
    address: 'test address',
    city: 'test city',
    pincode: '23456',
    state: 'state test',
    phone: '7401075899',
    useremail: "",
    cartAccum: "",
    deafultdatas: {},
    shipCode: "",
    defCustName: "",
    billCode: "",
    defEquipSerial: "",
    extendedPrice: ""


  }
  Foclisting: Foclisting[] = [];
  focobj: Foclisting = { valueContract: "", balanceValue: "", cvalidTo: "", serialNumber: "", csalesOrg: "", cdistriChannel: "", cdivision: "", csalesGroup: "", refInvoiceNo: "", csalesOffice: "", cplant: "" }
  // selectedFoc: any = {
  //   valuecontract: "",
  //   balancevalue: "",
  //   cvalidto: "",
  //   serialnumber: "",
  //   csalesorg: "",
  //   cdistrichannel: "",
  //   cdivision: "",
  //   csalesgroup: "",
  //   refinvoiceNo: "",


  // }
  selectedFocList = [];
  getTotalValues: any;
  creditValue: any;
  refNo: any;
  tcscredit: boolean = false;
  envVar: any;
  myvalidFocs: any;
  loginForm: any;
  foccreate: any;
  myfocs: any;
  focorder: any;
  httpclient: any;
  currentCustomerId: any;
  currentDatas: any;
  valueContract: string = "";

  constructor(private auth: AuthService, private route: Router, private toaster: ToastService, private fleetservice: FleetService, private modalService: NgbModal, private modalRef: NgbActiveModal) {
    this._getReferenceId();
    this.envVar = environment;
  }

  ngOnInit(): void {
    this.currentCustomerId = sessionStorage.getItem('id');
    this.getTotalValues = JSON.parse(sessionStorage.getItem('total') || '')
    this._getDefaultAddress();
    this.getTcsStatus()

    this._getAllDefaultDatas()
    // ======

    setTimeout(() => {
      // this.getQuoteUpdated();
      this.my_validFoc_func();
    }, 1000)

    // this.get_forCreateOrder();

    // create radio dynamically 


  }

  _getAllDefaultDatas() {
    this.fleetservice._getDefaultDatas().subscribe((data: any) => {
      this.currentDatas = data.response;
      console.log("cure", this.currentDatas)

      // if(this.currentDatas["ordertype"] == 'ZFOC'){


      // console.log("non foc method")
      // }

      // else if((this.currentDatas["ordertype"] == 'ZPCC')){

      //   console.log("online method")
      // }

    })
  }


  // _get_getmaterial_foc(){
  //   this.fleetService._get_foc_getmaterial_price(this.currentCustomerId).subscribe(
  //     (data:any) =>{

  //       this._get_cart_details() 
  //       this.modalRef.close();
  //       console.log("get refresh")
  //     }
  //   )
  // }
  // get_nonFOC_update(){
  //   this.fleetService._get_nonfoc_getmaterial_price(this.currentCustomerId).subscribe(
  //     (data:any) =>{
  //       this._get_cart_details()
  //       this.modalRef.close();
  //       console.log("get online")
  //     }
  //   )
  // }
  open(content: any) {
    // console.log(this.get_credit_check())

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  ngAfterViewInit() {
    const analytics = getAnalytics();

    logEvent(analytics, 'Front End Screen Views', {
      firebase_screen: 'Payment Gateway Page Two',
      firebase_screen_class: 'Payment Gateway Page Two'
    })
  }


  getTcsStatus() {
    this.fleetservice._tcsCreditCheck().subscribe((data: any) => {
      this.selectedAddress.extendedPrice = data.response.extendedPrice;
      if (data.response.dTcsAppl == 'Yes' && data.response.applyinbill == true) {
        // alert(1)
        this.selectedAddress.cartAccum = data.response.cartAccum;
        this.selectedAddress.extendedPrice = data.response.extendedPrice

        console.log(data, "cartAccum");
        this.tcscredit = true
      } else {

        // alert(2)
        this.tcscredit = false
      }
    })

  }


  get_forCreateOrder() {
    if (this.valueContract) {

      let obj = {

        // from login
        "logMobile": sessionStorage.getItem('mob'),
        "logPAN": sessionStorage.getItem('pan'),
        "cCode": Number(sessionStorage.getItem('id')),
        // from custdefalut Api
        "defShipCode": this.selectedAddress['shipCode'],
        "defBillCode": this.selectedAddress['billCode'],
        "defCustName": this.selectedAddress['defCustName'],
        "defMobile": this.selectedAddress['phone'],
        "defEmail": this.selectedAddress['useremail'],
        // "defEquipSerial":this.selectedAddress['defEquipSerial'],
        // from validFoc
        "valuecontract": this.focobj.valueContract,
        "balancevalue": this.focobj.balanceValue.toString(),
        "cvalidto": this.focobj.cvalidTo,
        "serialnumber": this.focobj.serialNumber,
        "csalesorg": this.focobj.csalesOrg,
        "cdistrichannel": this.focobj.cdistriChannel,
        "cdivision": this.focobj.cdivision,
        "csalesgroup": this.focobj.csalesGroup,
        "refinvoiceNo": this.focobj.refInvoiceNo,
        "cplant": this.focobj.cplant,
        "csalesOffice": this.focobj.csalesOffice

      }
      console.log(obj, ' obj get')
      console.log(this.focobj.valueContract, "valueContract")
      this.fleetservice._get_forCreateOrder(obj).subscribe((data: any) => {

        if (data.isSuccess) {
          this.focorder = data.response;
          // call validFoc
          this.my_validFoc_func();
          console.log(this.my_validFoc_func);
          // call custDefault api
          this._getDefaultAddress();
          console.log(obj, "finalresponse");
          // condition for navigate url
          console.log(this.focorder.isFoc, "isFoc")
          this.toaster.showSuccess('Ordered Successfully')
          sessionStorage.setItem('orderid', this.focorder.poNumber);
          this.route.navigateByUrl('/customer/order-confirmation?id=' + this.focorder.poNumber)
          // if (this.focorder.isFoc == true) {
          //   alert(1)

          //   // this.toaster.showSuccess('Ordered Successfully')
          //   // sessionStorage.setItem('orderid', this.focorder.poNumber);
          //   // this.route.navigateByUrl('/customer/order-confirmation?id='+this.focorder.poNumber)
          // } 
          // else{
          //   alert(2)
          //   this.toaster.showError('Sorry ! Your Order could not be completed.')
          //   // this.toaster.showError('Sorry! An unexpected error was encountered. Please try after some time.')
          //   this.route.navigateByUrl('/customer/payment-gateway-two')
          // }
        }

      })
    }
    else {
      this.toaster.showError('Sorry ! Your Order could not be completed.')
      this.route.navigateByUrl('/customer/payment-gateway-two')
    }


  }
  my_validFoc_func() {
    console.log(this.selectedAddress.extendedPrice, "my value")
    let reqvalidFoc = {
      soldparty: this.currentCustomerId,
      orderreason: "Z34",
      CCode: this.currentCustomerId,
      CartValue: this.selectedAddress.extendedPrice.replace(",", ""),
    }
    console.log(reqvalidFoc, "reqvalidFoc")
    // return false;
    this.fleetservice._get_validFOC(reqvalidFoc).subscribe((data: any) => {
      this.myvalidFocs = data.response.d.results;
      for (let i = 0; i < data.response.d.results.length; i++) {

        this.focobj = { valueContract: "", balanceValue: "", cvalidTo: "", serialNumber: "", csalesOrg: "", cdistriChannel: "", cdivision: "", csalesGroup: "", refInvoiceNo: "", csalesOffice: "", cplant: "" }
        this.focobj.valueContract = data.response.d.results[i]['valueContract'];
        this.focobj.balanceValue = data.response.d.results[i]['balanceValue'];
        this.focobj.cvalidTo = data.response.d.results[i]['cvalidTo'];
        this.focobj.csalesOrg = data.response.d.results[i]['csalesOrg'];
        this.focobj.cdistriChannel = data.response.d.results[i]['cdistriChannel'];
        this.focobj.cdivision = data.response.d.results[i]['cdivision'];
        this.focobj.csalesGroup = data.response.d.results[i]['csalesGroup'];
        this.focobj.refInvoiceNo = data.response.d.results[i]['refInvoiceNo'];
        this.focobj.serialNumber = data.response.d.results[i]['serialNumber'];
        this.focobj.csalesOffice = data.response.d.results[i]['csalesOffice'];
        this.focobj.cplant = data.response.d.results[i]['cplant']

        this.Foclisting.push(this.focobj);
      }

      console.log(this.Foclisting, "Foclisting")
    })
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
      this.selectedAddress['state'] = datas.response['billStateName'];
      this.selectedAddress['deafultdatas'] = datas.response;
      this.selectedAddress['shipCode'] = datas.response['shipCode'];
      this.selectedAddress['defCustName'] = datas.response['defCustName'];
      this.selectedAddress['billCode'] = datas.response['billCode'];
      this.selectedAddress['defEquipSerial'] = datas.response['defEquipSerial'];




    })
  }

  focValidchk(value: string) {
    this.valueContract = value;
    this.focobj = this.Foclisting.filter(x => x.valueContract == value)[0];
    console.log(this.focobj);
  }


  checkout() {

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




  }


  numberWithCommas(x: any) {
    return Number(x).toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR'
    });

  }
  numberWithOnlyCommas(x: any) {
    return Number(x).toLocaleString('en-IN')

  }

  get_credit_check() {
    let data: any;
    this.fleetservice.credit_check().subscribe((data: any) => {

      this.creditValue = data.response.feed.entry.content.mProperties.dCreditExp;
      // this.toaster.showSuccess('Successfully Submitted')

      // alert(data.response.feed.entry.content.mProperties.dCreditExp+'Your Credit Balance')

    })

  }
  getValidFoc() {
    let reqvalidFoc = {
      soldparty: this.currentCustomerId,
      orderreason: "Z34",
      CCode: this.currentCustomerId,
      CartValue: this.selectedAddress.extendedPrice
    }
    this.fleetservice._get_validFOC(reqvalidFoc).subscribe(
      (data: any) => {

        this.myvalidFocs = data.response.d.results
        console.log("payment-gatway", data)
      }
    )
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
