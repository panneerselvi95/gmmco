import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
// import { parse } from 'path';
import { FleetService, Responses } from 'src/app/services/fleet.service';
import { ToastService } from 'src/app/services/toastr.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalOptions, NgbModalRef, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { getAnalytics, logEvent } from "firebase/analytics";
import { CurrencyPipe } from '@angular/common';

// import * as _ from 'lodash';


declare const $: any

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.component.html',
  styleUrls: ['./my-cart.component.scss']
})
export class MyCartComponent implements OnInit {
  [x: string]: any;
  @ViewChild('form') form!: ElementRef;
  @ViewChild('modalData2') modal!: ElementRef;
  @ViewChild('checkboxclick') checkbox!: ElementRef;
  @ViewChild('deliverInFull') deliverinfull!: ElementRef;
  @ViewChild('mymodal1') modalfoc!: ElementRef;
  @ViewChild('mymodal2') modalonline!: ElementRef;
  @ViewChild('mymodal3') modalconfirm!: ElementRef;


  accessCode: any;
  closeResult: any;
  getDismissReason: any;
  DissableCartfocUpdate: boolean = false;
  totalValueAmt: any
  encRequestRes: any;
  order_no: any = '12';
  testAmount: any = '5835';
  selectedVal: any = '2';
  my_cart_item: any;
  Response: Responses[] = [];
  selectedAddress: any = {
    name: 'testing',
    address: 'test address',
    city: 'test city',
    pincode: '23456',
    state: 'state test',
    phone: '7401075899',
    deliverinfull: 0
  }

  currentCustomerId: any;
  my_cart: any;
  estimatedDetails: any;
  quantityList: any = [];
  currentDatas: any;
  my_cartitem: any;
  addpayload: any;
  mymodalsof1: boolean = false;

  constructor(
    private fleetService: FleetService
    , private toastr: ToastService,
    private router: Router,
    private modalService: NgbModal, private modalRef: NgbActiveModal,
    private cd: ChangeDetectorRef

  ) { }

  ngOnInit(): void {
    this.accessCode = "AVIG03IG85BN32GINB"

    this.currentCustomerId = sessionStorage.getItem('id');
    // this._get_cart_details();

    // setTimeout(() => {
    //   this._get_cart_details();
    // }, 2000)
    this._get_cart_details();

    this.quantityList = Array(99).fill(1).map((x, i) => (i + 1));
    // this.get_credit_check()
    this.getMyCart();

    // this._get_getmaterial_foc();

    // this.get_credit_check();
    this.get_refresh_cart();
    this._getAllDefaultDatas();
    if (sessionStorage.getItem('selectedchoosefoc')) {
      this.selectedVal = JSON.stringify(sessionStorage.getItem('selectedchoosefoc'))

    }
    else {
      this.selectedVal = '2';
    }

  }
  ChangeOnline() {
    this.modalRef.close();
    console.log("hiii online");
  }
  get_refresh_cart() {
    this.fleetService._get_requestFoc(this.currentCustomerId).subscribe(
      (data: any) => {
        this.fleetService._tcsCreditCheck().subscribe(
          (data: any) => {
            if (data.response.excludecount > 0 || data.response.extendedPrice > this.myCart.maxofBalanceValue) {
              // alert(1)  
              this.get_nonFOC_update() // get material updated price
              this.selectedVal = 2;
              console.log(data.response.excludecount, data.response.extendedPrice > this.myCart.maxofBalanceValue, "excludecount")
            }

          }
        )
      }
    )
  }

  cartExclusion() {
    this.fleetService._get_cartExclusion(this.currentCustomerId).subscribe(
      (data: any) => {
        console.log(data, "cartExclusion");
        this._get_getmaterial_foc();
        this._get_cart_details();
      }
    )
  }
  MyCartpopup(val?: any) {
    // this._getAllDefaultDatas(); 
    sessionStorage.setItem('selectedchoosefoc', this.selectedVal);
    if (this.selectedVal == '1') {
      let reqcart = this.my_cart;
      console.log(this.my_cart, "MyCartpopup")
      this.Response = this.my_cart;
      let item = this.Response.filter(x => x.isExclude == true).length;
      if (item > 0) {
        // alert("modalconfirm")
        this.open(this.modalconfirm);
      } else {
        // alert("modalfoc")
        this.open(this.modalfoc)
      }

    }
    else {
      this.open(this.modalonline);
    }

  }
  // MyCartpopup(val?: any) { 
  //   sessionStorage.setItem('selectedchoosefoc', this.selectedVal);
  //   if (this.selectedVal == '1') {
  //     if(this.my_cart.isExclude = true){
  //       alert("modalconfirm")
  //       this.open(this.modalconfirm)
  //     }
  //     else{
  //       alert("modalfoc")
  //       this.open(this.modalfoc);
  //     }
  //     console.log(this.my_cart ,"MyCartpopup" )
  //   }
  //   else {
  //     this.open(this.modalonline);
  //   }

  // }

  ngAfterViewInit() {
    const analytics = getAnalytics();

    logEvent(analytics, 'Front End Screen Views', {
      firebase_screen: 'MyCart Page',
      firebase_screen_class: 'MyCart Page'
    })
  }



  getMyCart() {
    let reqcart = {
      soldparty: 29350,
      orderreason: "Z34"
    }
    this.fleetService._get_requestFoc(reqcart).subscribe(
      (data: any) => {
        console.log("this is my cart page")
        this.myCart = data.response
      }
    )
  }
  _get_cart_details() {

    this.fleetService._view_cart(this.currentCustomerId).subscribe((response: any) => {
      if (response['isSuccess']) {
        this.my_cart = response['response'];
        console.log(this.my_cart[0]?.orderType, "ts");
        document.querySelector('#cart-img')?.setAttribute('data-value', response.response.length)
      } else {
        this.my_cart = [];
        document.querySelector('#cart-img')?.setAttribute('data-value', '')
      }
      console.log(this.my_cart, "my_cart_array")
    })
    // this.my_cart.forEach((item:any) => {
    //   this.my_cartitem += Number(item.discountValue);
    //   console.log(this.my_cartitem , "my_cartitem val")
    // });

  }

  _get_getmaterial_foc() {

    this.fleetService._get_foc_getmaterial_price(this.currentCustomerId).subscribe(
      (data: any) => {

        this._get_cart_details();
        this.modalRef.close();
        console.log("get refresh")
      }
    )
  }
  get_nonFOC_update() {
    this.fleetService._get_nonfoc_getmaterial_price(this.currentCustomerId).subscribe(
      (data: any) => {
        this._get_cart_details()
        this.modalRef.close();
        console.log("get online")
      }
    )
  }


  _getAllDefaultDatas() {

    this.fleetService._getDefaultDatas().subscribe((data: any) => {
      this.currentDatas = data.response;
      console.log(data, "curr")
      // alert(2)
      if (this.currentDatas["ordertype"] == 'ZFOC') {

        this._get_getmaterial_foc();

        this.selectedVal = 1;
        console.log("non foc method")
      }

      else {
        this.get_nonFOC_update();
        this.selectedVal = 2
        console.log("online method")
      }


    })
  }




  // _update_cart(item: any, type: string) {
  //   let index = this.my_cart.indexOf(item)
  //   if (type == 'plus') {
  //     this.my_cart[index]['qty'] += 1;
  //     this._get_EstimatedPrice(this.my_cart[index]);
  //   } else if (type == 'minus') {
  //     if (item.qty > 1) {
  //       this.my_cart[index]['qty'] -= 1;
  //       this._get_EstimatedPrice(this.my_cart[index]);
  //     }
  //   }
  // }

  // qty change
  _Foc_data_price() {
    this.fleetService._get_foc_getmaterial_price(this.currentCustomerId).subscribe((data: any) => {
      console.log("datas value", data);


    })
  }
  // qty change

  Get_Focparts(item: any, quote: boolean) {
    console.log(item, "estimate")
    let d = new Date()
    let todayDate = [this.pad(d.getDate()), this.pad(d.getMonth() + 1), d.getFullYear()].join('.')
    this.fleetService._get_focPartsDetails(item.partNumber, item.sourcesupply, item.qty, todayDate).subscribe((resData: any) => {
      this.estimatedDetails = resData.response.d.results[0];
      console.log("quote ", quote)
      if (quote) {

        this.fleetService._add_to_cart(this.fleetService._load_add_to_cart_request(this.estimatedDetails, this.currentCustomerId), this.currentDatas).subscribe((response: any) => {

          this._Foc_data_price();
          this._get_cart_details();
        })


      }
    })
  }

  _update_cart(item: any, e: any) {
    console.log(e.target.value, "event")
    let obj: any = {
      "qid": item.mode,
      "matNo": item.partNumber,
      "sos": item.sourcesupply,
    }
    if (item.orderType == 'ZFOC') {

      this.fleetService._QuoteCalcCart(obj, e.target.value).subscribe((data: any) => {
        console.log(data, "_QuoteCalcCart")
        if (data.isSuccess == true) {
          // debugger
          let index = this.my_cart.indexOf(item);
          this.my_cart[index]['qty'] = e.target.value;
          this.Get_Focparts(this.my_cart[index], true);
          // this._Foc_data_price()
          console.log(item)
        }
      })
    }

    else {
      if (item.mode != 'Parts') {
        this.fleetService._QuoteCalcCart(obj, e.target.value).subscribe((data: any) => {
          if (data.isSuccess == true) {
            let index = this.my_cart.indexOf(item);
            this.my_cart[index]['qty'] = e.target.value;
            this._get_EstimatedPrice(this.my_cart[index], true);
            this._getUpadtedOuotePrice()
            console.log(item)
          }
        })
      }
      else {
        let index = this.my_cart.indexOf(item);
        this.my_cart[index]['qty'] = e.target.value;
        this._get_EstimatedPrice(this.my_cart[index], false);
        console.log(item)
      }
    }

    // if (item.mode != 'Parts') {
    // let obj: any = {
    //   "qid": item.mode,
    //   "matNo": item.partNumber,
    //   "sos": item.sourcesupply,
    // }
    // this.fleetService._QuoteCalcCart(obj, e.target.value).subscribe((data: any) => {
    //   if (data.isSuccess == true) {
    //     let index = this.my_cart.indexOf(item);
    //     this.my_cart[index]['qty'] = e.target.value;
    //     this._get_EstimatedPrice(this.my_cart[index], true);
    //     this._getUpadtedOuotePrice()
    //     console.log(item)
    //   }
    // })
    // }
    // else {
    //   let index = this.my_cart.indexOf(item);
    //   this.my_cart[index]['qty'] = e.target.value;
    //   this._get_EstimatedPrice(this.my_cart[index], false);
    //   console.log(item)
    // }
  }

  _remove_from_cart(item: any, val: any) {

    console.log()
    let obj = {
      material_no: val == 'single' ? item.partNumber : "",
      customer_id: this.currentCustomerId
    }
    this.fleetService._remove_cart(obj).subscribe((response: any) => {
      console.log(response)
      this._get_cart_details();
    })
    if (item.mode != 'Parts') {
      // alert('i')


      this._getUpadtedOuotePrice()


    }



  }
  _get_EstimatedPrice(item: any, quote: boolean) {
    console.log(item, "estimate")
    let d = new Date()
    let todayDate = [this.pad(d.getDate()), this.pad(d.getMonth() + 1), d.getFullYear()].join('.')
    this.fleetService._get_EstimateFleetPriceValue(item.partNumber, item.sourcesupply, item.qty, todayDate).subscribe((resData: any) => {
      this.estimatedDetails = resData.response.d.results[0];

      if (!quote) {

        this.ItemAddedCart();


      }
    })
  }

  _getUpadtedOuotePrice() {
    this.fleetService._QuoteCalcUpdate().subscribe((data: any) => {
      this._get_cart_details();

    })
  }



  ItemAddedCart() {

    this.fleetService._add_to_cart(this.fleetService._load_add_to_cart_request(this.estimatedDetails, this.currentCustomerId), this.currentDatas).subscribe((response: any) => {

      this._getUpadtedOuotePrice()
      this._get_cart_details();
    })
  }
  get_cumulative(inp: string, i?: any) {
    let cart: any = { unitprice: 0, subTotal: 0, extendedPrice: 0, itemscount: 0, total: 0, disCountValue: 0, item: 0, quantity: 0, tax: 0, cgst: 0, p_cgst: new Array(), igst: 0, p_igst: new Array(), sgst: 0, p_sgst: new Array(), tcs: 0, p_tcs: new Array(), taxable_amount: 0 }
    if (this.my_cart)
      // console.log(this.my_cart , "my cart val");
      for (let items of this.my_cart) {
        cart.item++;
        cart.quantity += items['qty'];
        cart.tax += items['cgstValue'] + items['igstValue'] + items['sgstValue'];
        cart.cgst += items['cgstValue'];
        cart.p_cgst.push(items['cgst'] + '%');
        cart.igst += items['igstValue'];
        cart.p_igst.push(items['igst'] + '%');
        cart.sgst += items['sgstValue'];
        cart.p_sgst.push(items['sgst'] + '%');
        cart.tcs += items['tcsValue'];

        cart.itemscount += items['itemscountValue'];
        // cart.p_itemscount.push(items['itemscount'] + '%');

        // cart.itemscount += items['itemscount']
        cart.p_tcs.push(items['tcs'] + '%');
        cart.taxable_amount += items['taxableValue'];
        cart.total += items['totalValue'];
        cart.subTotal += Number(items['subTotal']);
        cart.unitprice += Number(items['unitPrice']);
        cart.disCountValue += items['discountValue'];
        cart.extendedPrice += items['extendedPrice'];
        // cart.extendedPrice += Number(items['extendedPrice'])
        // debugger;
      }
    if (inp == 'item/quantity') return cart.item + '/' + cart.quantity;
    else if (inp == 'tax') return cart.tax ? cart.tax : cart.tax;
    else if (inp == 'cgst') return cart.cgst ? cart.cgst : cart.cgst;
    else if (inp == 'cgst%') return [...new Set(cart.p_cgst)];
    else if (inp == 'igst') return cart.igst ? cart.igst : cart.igst;
    else if (inp == 'igst%') return [...new Set(cart.p_igst)];
    else if (inp == 'sgst') return cart.sgst ? cart.sgst : cart.sgst;
    else if (inp == 'sgst%') return [...new Set(cart.p_sgst)];
    else if (inp == 'tcs') return cart.tcs ? cart.tcs : cart.tcs;
    else if (inp == 'itemscount') return cart.itemscount ? cart.itemscount : cart.itemscount;
    // else if (inp == 'itemscount%') return [...new Set(cart.p_itemscount)];
    else if (inp == 'tcs%') return [...new Set(cart.p_tcs)];
    // else if (inp == 'extended_price') return cart.extended_price ? cart.extended_price : cart.extended_price;
    // else if (inp == 'tcs%') return [...new Set(cart.p_extended_price)];
    else if (inp == 'taxable_amount') return cart.taxable_amount ? cart.taxable_amount : cart.taxable_amount;
    // else if (inp == 'taxable_amount') {console.log(cart.unitprice * cart.quantity);return cart.unitprice * cart.quantity;}
    else if (inp == 'total') return cart.total;

    else if (inp == 'subtotal') {

      this.totalValueAmt = cart.subTotal;

      return cart.subTotal
    }
    else if (inp == "disCountValue") return cart.disCountValue;
    else if (inp == "extendedPrice") return cart.extendedPrice;
    // else if(inp == "itemscount" ) return cart.itemscount;
    else return '';

  }
  compute_eta(inp: any) {
    let date = new Date(inp['date']);
    let s_date = new Date(inp['date']);
    let s_date_str = '';
    let ns_date = new Date(inp['date']);
    let ns_date_str = '';
    let days = 0;


    // if (inp['stock'] >= inp['qty'] || inp['stock']) {
    // days = Number(inp['tatStockpartsDays']);
    // s_date.setDate(date.getDate() + days);
    // s_date_str = [this.pad(s_date.getDate()), this.pad(s_date.getMonth() + 1), s_date.getFullYear()].join('/') + '(In Stock)';

    // }
    if (inp['stock'] != 0 && inp['qty'] > inp['stock']) {
      s_date_str = inp['stock'] + ' QTY ,' + inp['tatStockpartsDesc'];
      ns_date_str = Number(inp['qty']) - Number(inp['stock']) + ' QTY , ' + inp['tatNonstockpartsDesc'];
    }


    if (inp['qty'] < inp['stock'] || inp['qty'] == inp['stock']) {
      s_date_str = inp['qty'] + '  QTY , ' + inp['tatStockpartsDesc'];


      // days = Number(inp['tatNonstockpartsDays']);
      // ns_date.setDate(date.getDate() + days);
      // ns_date_str = [this.pad(ns_date.getDate()), this.pad(ns_date.getMonth() + 1), ns_date.getFullYear()].join('/') + '(Out Of Stock)';

    }
    if (inp['stock'] === 0) {
      s_date_str = inp['qty'] + ' QTY ,' + inp['tatNonstockpartsDesc'];
    }
    return s_date_str + '/' + ns_date_str;
  }
  pad(s: any) { return (s < 10) ? '0' + s : s; }

  checkout() {
    let redirect_url = 'https://gmmco-ui.colanonline.net/customer/my-cart';
    let workingKey = "FF4C98526109B44BEB32E1D8121EF38D";
    let useremail = 'testemail@gmail.com';
    let request = `merchant_id=35524&order_id=${this.order_no}&currency=INR&amount=${this.get_cumulative('total')}&redirect_url=${redirect_url}&cancel_url=${redirect_url}&language=EN&billing_name=${this.selectedAddress.name}&billing_address=${this.selectedAddress.address}&billing_city=${this.selectedAddress.city}&billing_state=MH&billing_zip=${this.selectedAddress.pincode}&billing_country=India&billing_tel=${this.selectedAddress.phone}&delivery_name=${this.selectedAddress.name}&delivery_address=${this.selectedAddress.address}&delivery_city=${this.selectedAddress.city}&delivery_state=${this.selectedAddress.state}&delivery_zip=${this.selectedAddress.pincode}&delivery_country=India&delivery_tel=${this.selectedAddress.phone}&billing_email=${useremail}`
    console.log(request)

    this.fleetService._getPayment_Details(request).subscribe((data: any) => {
      console.log(data.response.encrypted);
      this.encRequestRes = data.response.encrypted;
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
  open(content: any) {
    let ngbModalOptions: NgbModalOptions = {
      backdrop: 'static',
      keyboard: false,
      centered: true,
      // size:'lg'
    };

    this.modalRef = this.modalService.open(content, ngbModalOptions);

  }

  close() {
    this.modalRef.close();
    // this.selectedVal=='2'
    console.log(this.selectedVal)
    this.selectedVal = this.selectedVal == 1 ? 2 : 1

  }
  get_credit_check() {


    this.fleetService._tcsCreditCheck().subscribe((data: any) => {
      console.log(data, "credit data");



      if (data.response.dTcsAppl == 'NAV' && data.response.cartAccum >= 5000000) {
        let obj: any = {
          "panNumber": sessionStorage.getItem('pan'),
          "mobile": sessionStorage.getItem('mob'),
          "customercode": parseInt(sessionStorage.getItem('id') || '0'),
          "mode": 7,
          "timeofrequest": new Date(),
          "rescheduletime": null,
          "incidentID": 0,
          "ordervalue": data.response.cartValue
        }
        this.fleetService._needAssitance(obj).subscribe((data: any) => { })
        this.toastr.showError('We are unable to process your order due to total order value crossing INR 50Lacs for the year and your TCS/TDS declaration being unavailable to us. Please submit your TCS/TDS declaration certificate immediately with your Gmmco rep to enable further processing of orders.”')
      }
      //  else if (this.currentDatas.defEquipSerial != null && this.currentDatas.defEquipSerial  != ""){
      //   this.toastr.showError('Sorry! You do not have any Equipment associated to your Organization, hence cannot transact')
      // }



      else {


        let obj: any = {
          "item/quantity": this.get_cumulative('item/quantity'),
          "taxable": this.get_cumulative('taxable_amount'),
          "cgst": this.get_cumulative('cgst'),
          "sgst": this.get_cumulative('sgst'),
          "igst": this.get_cumulative('igst'),
          "tcs": this.get_cumulative('tcs'),
          "total": this.get_cumulative('total'),
          "subtotal": this.get_cumulative('subtotal'),
          "discountValue": this.get_cumulative('disCountValue'),
          "extendedPrice": this.get_cumulative('extendedPrice'),
          "itemscount": data.response.itemscount,


        }
        console.log("value ", obj)

        if (this.currentDatas.defEquipSerial == null || this.currentDatas.defEquipSerial == "") {
          this.toastr.showError('Sorry! You do not have any Equipment associated to your Organization, hence cannot transact')
        }
        else if (this.currentDatas["ordertype"] == 'ZFOC' && data.response.extendedPrice > this.myCart.maxofBalanceValue) {
          console.log(data.response.extendedPrice, this.myCart.maxofBalanceValue, "cct")
          if (data.response.extendedPrice > this.myCart.maxofBalanceValue) {
            // `$ ${dsfdsf}`
            // let msg= this.myCart.maxofBalanceValue;
            // console.log(msg, "msg")
            this.toastr.showError("You can redeem only up to " + `$ ${this.myCart.maxofBalanceValue}` + " for a transaction. You can choose to adjust the cart to a value less than this redeemable value or you can make an only online payment for the chosen cart. ")
          }


        }
        else if (this.currentDatas.defEmail != null && this.currentDatas.defEmail != "") {
          if (this.currentDatas.billName1 != null && this.currentDatas.billAdd1 != null && this.currentDatas.billCity != null && this.currentDatas.billPin != null && this.currentDatas.billStateName != null) {


            sessionStorage.setItem('total', JSON.stringify(obj))


            console.log(this.currentDatas.defEquipSerial, "defEquipSerial")
            if (this.selectedVal == 1) {
              this.router.navigateByUrl('/customer/payment-gateway-two')
            }
            else {
              this.router.navigateByUrl('/customer/payment-gateway')
            }
          } else {
            this.toastr.showError("You Don't Have Sufficient Information About Your Organization In SAP")
          }


        }


        else {

          this.toastr.showInformation('Select Default Contact');
          this.router.navigateByUrl('/customer/all-contacts')
        }

      }
      // if (data.response.excludecount > 0 || data.response.extendedPrice > this.myCart.maxofBalanceValue) {

      //   this._Foc_data_price()
      // } 
      // console.log(data.response.excludecount , data.response.extendedPrice > this.myCart.maxofBalanceValue , "excludecount")
    })


    // this.fleetService._view_cart(this.currentCustomerId).subscribe((data:any)=>{
    //   if(data.response.isExclude == false){
    //     alert()
    //     this.open(this.modalconfirm)
    //   }
    // })


  }

  deliverFull(e: any) {
    // console.log(e)
    if (e.target.checked) {
      this.open(this.modal)
      this.selectedAddress.deliverinfull = 1;
      sessionStorage.setItem('deliverorder', this.selectedAddress.deliverinfull)

      // if(e == 'ok'){
      //    this.close()
      // }
      // this.close()
    }

    else {
      console.log(this.deliverinfull)
      this.deliverinfull.nativeElement.checked = false

      this.selectedAddress.deliverinfull = 0
      sessionStorage.setItem('deliverorder', this.selectedAddress.deliverinfull)
      this.close()
    }
  }

  split(key: any) {
    return key.split('/')
  }


  //  replace(myObj:any){
  //     Object.keys(myObj).forEach(function(key){
  //       if(typeof myObj[key] == 'object') { 
  //         this.replace(myObj[key]) : myObj[key]= String(myObj[key]);
  //       }
  //       console.log(myObj)
  //     });
  //   }

}
