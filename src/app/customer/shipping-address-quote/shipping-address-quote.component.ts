import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbModalRef, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { FleetService } from 'src/app/services/fleet.service';
import { ToastService } from 'src/app/services/toastr.service';
import { getAnalytics, logEvent } from "firebase/analytics";

@Component({
  selector: 'app-shipping-address-quote',
  templateUrl:
    './shipping-address-quote.component.html',
  styleUrls: ['./shipping-address-quote.component.scss']
})
export class ShippingAddressQuoteComponent implements OnInit {

  AddAddressForm!: FormGroup;
  primaryaddress: any;
  title_dropdown: any = [];
  region_dropdown: any = [];
  currentCustomerId: any;
  disableRegion: boolean = true;
  active_tab: string = 'ship';
  address_list: any;
  selectedCity: any;
  selectedPincode: any;




  constructor(
    private modalRef: NgbActiveModal,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private fleetService: FleetService,
    private toaster: ToastService
  ) { }

  ngOnInit(): void {
    this.AddAddressForm = this.formBuilder.group({
      address_type: [this.active_tab, [Validators.required]],
      company_name: ["", Validators.required],
      house_number: ["", Validators.required],
      street: ["", Validators.required],
      city: ["", Validators.required],
      region: [""],
      district: [],
      postal_code: ["", [Validators.required, Validators.maxLength(6)]],
      salutation: ["", Validators.required],
      gst_number: [""],
      contact_name: ["", Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      contact_phone: ["", [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      gst_last_char: ["", [Validators.required, Validators.maxLength(3)]]
    });
    this.currentCustomerId = sessionStorage.getItem('id');
    this.viewAddress();
    this.customerHistory();
  }

  ngAfterViewInit() {
    const analytics = getAnalytics();

    logEvent(analytics, 'Front End Screen Views', {
      firebase_screen: 'Shipping Address Page',
      firebase_screen_class: 'Shipping Address Page'
    })
  }


  viewAddress() {
    this.fleetService._view_address(this.currentCustomerId).subscribe((resp: any) => {

      this.address_list = resp.response;

      // if (resp['isSuccess']) {
      //   for (let address of resp['response']) {

      //     if (address.mode == 'ZG04') {

      //       this.address_list.bill.push(address)

      //     } else if (address.mode == 'ZG02' ) {

      //       this.address_list.ship.push(address)
      //     } else if ( address.mode == 'ZG01'){
      //       this.address_list.bill.push(address)
      //       this.address_list.ship.push(address)
      //     }
      //   }


      //   console.log(this.address_list.bill)
      // } else {
      //   this.address_list = {};
      // }
      console.log(this.address_list)
    });
  }
  saveAddress() {
    if (this.AddAddressForm.valid) {
      this.AddAddressForm.controls.region.patchValue(this.AddAddressForm.controls.region.value.split(':')[1])
      this.AddAddressForm.controls.gst_number.patchValue(this.AddAddressForm.controls.gst_number.value + this.AddAddressForm.controls.gst_last_char.value);
      let obj = this._load_add_address_req(this.AddAddressForm.value, this.currentCustomerId)
      this.fleetService._add_address(obj).subscribe((resp: any) => {
        console.log(resp);
        if (resp.isSuccess == true) {
          this.toaster.showSuccess(resp.message);
          this.viewAddress()

        } else {
          this.toaster.showError(resp.message)
        }
      });
      this.modalRef.close();
    }
  }
  open(content: any) {
    if (this.title_dropdown.length == 0)
      this.fleetService._get_salutation_region('Title').subscribe((resp: any) => {
        if (resp['isSuccess'] || !resp['isSuccess']) {
          this.title_dropdown = resp['response'];
        } else {
          this.title_dropdown = [];
        }
        console.log(resp)
      });
    if (this.region_dropdown.length == 0)
      this.fleetService._getStatesList('state', '').subscribe((resp: any) => {
        if (resp['isSuccess'] || !resp['isSuccess']) {
          this.region_dropdown = resp['response'];
          this.AddAddressForm.controls.region.patchValue("");
        } else {
          this.region_dropdown = [];
        }
        console.log(resp)
      });
    this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }



  getcityAndPincode() {

    let name: any = this.AddAddressForm.controls.region.value.split(':');



    this.fleetService._getStatesList('district', name[0]).subscribe((resp: any) => {
      this.selectedCity = resp.response;

      console.log(this.AddAddressForm.controls.region.value)
      this.AddAddressForm.controls.city.patchValue("");
      this.AddAddressForm.controls.postal_code.patchValue("")
      this.AddAddressForm.controls.gst_number.patchValue(name[2] + sessionStorage.getItem('pan'));
      // this.AddAddressForm.controls.region.patchValue(this.AddAddressForm.controls.region.value.pos)
    })



  }

  getPincode() {
    this.fleetService._getStatesList('pincode', this.AddAddressForm.controls.city.value).subscribe((resp: any) => {
      this.selectedPincode = resp.response;

      this.AddAddressForm.controls.district.patchValue(this.AddAddressForm.controls.city.value)

    })
  }
  close() {
    this.AddAddressForm.reset()
    this.customerHistory()
    this.modalRef.close();
  }
  onNavChange(changeEvent: NgbNavChangeEvent) {
    // this.AddAddressForm.patchValue({ address_type: changeEvent.nextId })
    this.AddAddressForm.patchValue({ address_type: 'ship' })
  }
  _load_add_address_req(inp: any, customer_id: any) {
    let req: any = {};
    req['CUSTOMER_ACCOUNT_GROUP'] = inp['address_type'] == 'bill' ? 'ZG04' : inp['address_type'] == 'ship' ? 'ZG02' : '';
    req['COMPANY_CODE'] = "GMMC"
    req['SALES_ORGANIZATION'] = "GS01"
    req['DISTRIBUTION_CHANNEL'] = "40"
    req['DIVISION'] = "00"
    req['NAME1'] = inp['company_name'];
    req['SOLD_TO_PARTY'] = this.fleetService._get_id(this.currentCustomerId);
    req['CITY'] = inp['city'];
    req['REGION'] = inp['region'];
    req['COUNTRY'] = "IN";
    req['PAYMENT_TERMS'] = "0001";
    req['STREET'] = inp['street']
    req['HOUSE_NUMBER'] = inp['house_number'];
    req['DISTRICT'] = inp['district'];
    req['POSTAL_CODE'] = inp['postal_code'];
    req['TITLE'] = this.filterTitle(inp['salutation']);
    req['TAX_NUMBER3'] = inp['gst_number'];
    req['CONTACT_PERSON_NAME'] = this.filterTitle(inp['salutation']) + '' + inp['contact_name'];
    req['CONTACT_PERSON_TELEPHONE'] = inp['contact_phone'];
    req['MOBILE_PHONE'] = inp['contact_phone'];
    req['CUSTOMER_EMAIL_ADDRESS'] = inp['email']
    return { "d": req };
  }

  _Set_isDefault(cusid: any, address: any, cid: any) {
    let obj: any = {

      "name": this.active_tab == 'bill' ? 'billaddress' : 'shipaddress',
      "id": cid + "",

      "ccOde": parseInt(cusid),
      "serialNumber": "string"

    }
    this.fleetService._set_isDefault(obj).subscribe((data: any) => {
      console.log(data)
      if (data.isSuccess == true) {
        this.toaster.showSuccess(data.response + '  ' + 'Address: ' + address)
        this.viewAddress();
      } else {
        this.toaster.showError('Something went Wrong')
      }
      // this.viewAddress()
    })
  }
  customerHistory() {
    let userHistory: any;
    let cccode: any = sessionStorage.getItem('id');
    this.fleetService.customer_records(cccode).subscribe((data: any) => {
      userHistory = data.response['d']['results'].filter((item: any) => { return cccode == item.customerNumber });
      console.log(userHistory)

      this.AddAddressForm.controls.region.patchValue(userHistory[0].regionStateProvinceCounty);
      this.AddAddressForm.controls.gst_number.patchValue(userHistory[0].taxNumber3)
    })
  }

  filterTitle(id: any) {
    console.log(id)
    let title: any;
    for (let tit of this.title_dropdown) {
      if (tit.tid == id) {
        console.log(tit)

        title = tit.title;
      }
    }
    return title
  }
}
