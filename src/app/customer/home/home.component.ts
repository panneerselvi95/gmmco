import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FleetService } from 'src/app/services/fleet.service';
import { NgbActiveModal, NgbModal, NgbModalRef, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { ToastService } from 'src/app/services/toastr.service';
import { environment } from '../../../environments/environment';
import { AuthService } from 'src/app/services/auth.service';
import { HeaderComponent } from '.././layout/header/header.component';
import { getAnalytics, logEvent } from "firebase/analytics";
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('form') form!: ElementRef;
  @ViewChild(HeaderComponent) child: any;

  // @Input() tabs: string | any | undefined;
  tabs: any = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven']
  selectedIndex = 0;
  abc: string | undefined;
  leftTabIdx = 0;
  atStart = true;
  atEnd = false;
  pathhome: any = false;
  closeResult: any;
  @Output() emitSelectedTab = new EventEmitter()
  closeModal: any;
  FleetsList: any = [];
  OutStandingValue: any;
  customerId: any;
  summaryDetails: any;
  defaultAdr: any;
  parentCount: any;
  parent: any;
  currentlang: any;
  encRequestRes: any;
  testAmount: any = '5835';
  accessCode: any;
  diffDays: any;
  selectedAddress: any = {
    name: 'testing',
    address: 'test address',
    city: 'test city',
    pincode: '23456',
    state: 'state test',
    phone: '7401075899',
    useremail: ""
  }
  refNo: any;
  outStandingRandomId: any;
  envVar: any;
  focData: any;
  constructor(private auth: AuthService, private toastr: ToastService, private modalRef: NgbActiveModal,
    private modalService: NgbModal, private route: Router, private router: ActivatedRoute, private fleetservice: FleetService) {
    this._getReferenceId()

    this.parentCount = sessionStorage.getItem('lang');
    this.envVar = environment;

  }
  // data!: IcoindDetail;

  ngOnInit() {



    // this.emitSelectedTab.emit(this.tabs[0])
    this.abc = `translateX(0px)`
    this.customerId = sessionStorage.getItem('id')
    this._getDefaultAddress()
    this._get_Fleets();
    this._get_OutStandingValue();
    this._get_TicketSummary();
    this._getOutstandingIds();
    this.getFocRequest();
    // console.log(this.customerId ,"mmmmmm")

    /* foc */
    // this.fleetservice._getFocData()
    // .pipe(take(1)) 
    // .subscribe((minofBalanceValue) => this.data = minofBalanceValue)
  }
  ngAfterViewInit() {
    console.log(this.child.screens, "from head");
    const analytics = getAnalytics();

    logEvent(analytics, 'Front End Screen Views', {
      firebase_screen: 'HomePage',
      firebase_screen_class: 'HomePage'
    })
  }

  selectTab(index: any) {
    this.selectedIndex = index
    this.emitSelectedTab.emit(this.tabs[index])
    this.scrollTab(index - this.leftTabIdx - 1)
  }

  scrollTab(x: any) {
    if (this.atStart && x < 0 || this.atEnd && x > 0) {
      return
    }
    this.leftTabIdx = this.leftTabIdx + x
    this.abc = `translateX(${(this.leftTabIdx) * -140}px)`
    this.atStart = this.leftTabIdx === 0
    this.atEnd = this.leftTabIdx === this.tabs.length - 1
  }


  goOutstand(val: any) {
    if (val == 'pay') {
      const oneDay: any = 24 * 60 * 60 * 1000;
      let date1: any = new Date(this.OutStandingValue['lastTranscation'])
      console.log(date1, 'iiiii')
      let date2: any = new Date();
      const diffDays: any = (date1 - date2) / oneDay;


      console.log(date1 - date2)

      if (parseInt(diffDays) == 0) {
        this.toastr.showError('You have already made payment today,Hence we are not allowing to pay again')
        this.close()
      } else {
        this.checkout()

      }


    } else {
      let obj: any = {
        "panNumber": sessionStorage.getItem('pan'),
        "mobile": sessionStorage.getItem('mob'),
        "customercode": parseInt(sessionStorage.getItem('id') || '0'),
        "mode": 3,
        "timeofrequest": new Date().toISOString(),
        "rescheduletime": null,
        "incidentID": 0
      }
      this.fleetservice._needAssitance(obj).subscribe((data: any) => {
        console.log(data)
        this.close()
        this.toastr.showSuccess(val == 'reschedule' ? 'Rescheduled SuccessFully' : 'Your request has been received successfully. Gmmco team will share the details soon.')

      })
    }
    // this.modalRef.close();
    // this.route.navigateByUrl('/customer/my-outstanding')
  }
  _getReferenceId() {
    this.fleetservice._getRefNo_ccav().subscribe((data: any) => {
      this.refNo = data.response
    })
  }
  _getOutstandingIds() {
    this.fleetservice._paymentTrackId().subscribe((data: any) => {
      this.outStandingRandomId = data.response;
    })
  }
  checkout() {
    this.accessCode = environment.accesscode
    let redirect_url = environment.baseUrl + 'CRM/CCAvenueDecrypt';
    let workingKey = environment.workingKey
    let useremail = 'testemail@gmail.com';

    let order_no = sessionStorage.getItem('id')
    let request = `merchant_id=35524&merchant_param2=${order_no}&merchant_param3=${this.outStandingRandomId}&order_id=${this.refNo}&currency=INR&amount=${this.OutStandingValue?.outstandingBalance}&redirect_url=${encodeURIComponent(redirect_url)}&cancel_url=${encodeURIComponent(redirect_url)}&language=EN&billing_name=${this.selectedAddress.name}&billing_address=${this.selectedAddress.address}&billing_city=${this.selectedAddress.city}&billing_state=MH&billing_zip=${this.selectedAddress.pincode}&billing_country=India&billing_tel=${this.selectedAddress.phone}&delivery_name=${this.selectedAddress.name}&delivery_address=${this.selectedAddress.address}&delivery_city=${this.selectedAddress.city}&delivery_state=${this.selectedAddress.state}&delivery_zip=${this.selectedAddress.pincode}&delivery_country=India&sub_account_id=HQCCA&delivery_tel=${this.selectedAddress.phone}&billing_email=${this.selectedAddress.useremail}`
    console.log(request)

    this.fleetservice._getPayment_Details(this.auth.encryptUsingAES256(request)).subscribe((data: any) => {
      console.log(data.response.encrypted);
      this.encRequestRes = data.response.encrypted;
      // this.getCCavDetail()
      sessionStorage.setItem('pagename', 'outstanding')

      setTimeout(() => {

        this.form.nativeElement.submit();
      }, 1000)

    })
  }


  close() {
    this.modalRef.close();
  }

  open(content: any) {

    this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true });
  }


  getFocRequest() {
    // alert(this.customerId)
    let reqObj = {
      // soldparty:this.customerId,
      orderreason: "Z34"
    }

    this.fleetservice._get_requestFoc(reqObj).subscribe((data: any) => {
      // console.log('my FOC service' , data);
      this.focData = data.response
    })
  }

  _get_Fleets() {
    this.fleetservice._fleet_list(this.customerId).subscribe((data: any) => {
      console.log(data.response['equipmentlist'])

      this.FleetsList = data.response['equipmentlist'];

    })
  }
  gototabs() {
    window.open('http://3.109.30.40:8081/bugzilla/')

  }
  _get_OutStandingValue() {
    this.fleetservice._get_OutStandVal(this.customerId).subscribe((data: any) => {
      //  console.log(data.response['outstandingBalance'])
      this.OutStandingValue = data.response;
      const oneDay: any = 24 * 60 * 60 * 1000;
      let date1: any = new Date(this.OutStandingValue['lastTranscation'])
      console.log(date1, 'iiiii')
      let date2: any = new Date();
      let diffDays: any = (date2 - date1) / oneDay;

      this.diffDays = parseInt(diffDays)
      console.log(this.diffDays)


    })
  }

  _goTo_FleetDetails(fleetObj: any) {
    sessionStorage.setItem('fleetDetails', JSON.stringify(fleetObj))
    this.route.navigateByUrl('/customer/my-fleet-details')
  }


  gotohealthalert(data: any) {

    let obj: any = {
      "serialNumber": data.serialNumber,
      "modelOfAsset": data.modelOfAsset,
      "invoiceDate": data.invoiceDate,
      "assetName": data.assetName
    }
    sessionStorage.setItem('fleet', JSON.stringify(obj))
    this.route.navigateByUrl('/customer/health-alert-detail');
  }

  _get_TicketSummary() {
    console.log(this.fleetservice._get_id(this.customerId), "hhhhhhhhh")
    let ticketObj = {
      "id": Number(this.envVar.track_ticket_summary),
      "filters": [
        {
          "name": "customer_code",
          "values": this.fleetservice._get_id(this.customerId)
        }
      ]
    };
    this.fleetservice._assitant_TicketSummary(ticketObj).subscribe((resData: any) => {
      // this.summaryDetails = resData.response;
      let res: any = resData.response.rows
      // filter((item:any) =>{  return item[3] == 'Assigned'} )
      this.summaryDetails = res[0];
      //  this._calculate_tickets()
      console.log(this.summaryDetails, "   this.summaryDetails ")
    })
  }

  convertDate(updatedate: any) {
    let str: any = updatedate.replace(/\'/g, '').split(':');
    return str[0] + ':' + str[1]
    // console.log(str[0]+':'+str[1])
  }

  splitfunc(c: any) { let matId = c.split(':'); return matId }

  //*lang func()*//
  displayCounter(count: any) {
    console.log(count, "hidsxgvxcvgx")
    this.parentCount = count;
  }
  // end

  _getDefaultAddress() {
    this.fleetservice._getDefaultDatas().subscribe((datas: any) => {
      console.log(datas, "email def")
      this.selectedAddress['useremail'] = datas.response['defEmail'];
      this.selectedAddress['address'] = datas.response['billAdd1'];
      this.selectedAddress['name'] = datas.response['billName1'];
      this.selectedAddress['phone'] = datas.response['defMobile'];
      this.selectedAddress['city'] = datas.response['city'];
      this.selectedAddress['pincode'] = datas.response['billPin'];
      this.selectedAddress['state'] = "";


    })
  }
  custDefault(modelOfAsset: any, assetName: any, serialNumber: any, obj: any) {
    console.log(obj.status.trim())
    if (obj.status != 'Out of Territory') {


      this.fleetservice._getDefaultDatas().subscribe((data: any) => {
        if (data.response['defEmail'] == null || data.response['defEmail'] == "") {
          this.route.navigateByUrl('/customer/all-contacts')
          this.toastr.showError('Sorry! Since you dont have an E-Mail Id associated with your contact, we are redirecting you to Contacts Screen');
        }
        else {
          sessionStorage.setItem('fleetDetails', JSON.stringify(obj))
          this.route.navigateByUrl('/customer/create-new-ticket/' + modelOfAsset + '/' + assetName + '/' + serialNumber)
        }
      })
    }
    else {
      this.toastr.showError('Selected equipment shows as inactive / out of territory asset. Hence the Service Request cannot be created for it. Please call us for any clarifications')
    }
    // routerLink="/customer/create-new-ticket/{{fleets.modelOfAsset}}/{{fleets.assetName}}/ {{fleets.serialNumber}}"
    // if(e.target.checked){
    //   this.fleetservice._set_isDefault(obj).subscribe((data:any)=>{
    //     if(data.isSuccess == true){
    //       this.toastr.showSuccess("Default Fleet Set Successfully")
    //       this.  _get_Fleets()
    //     }else{
    //       this.toastr.showError('Something went Wrong')
    //     }  })
    // }else{
    //   console.log('hhh')
    // }

    /* FOC reason */


  }

}

// function getRequest() {
//   throw new Error('Function not implemented.');
// }
// function reason(reason: any) {
//   throw new Error('Function not implemented.');
// }

