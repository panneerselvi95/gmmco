import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FleetService } from 'src/app/services/fleet.service';
import { getAnalytics, logEvent } from "firebase/analytics";

@Component({
  selector: 'app-my-outstanding',
  templateUrl: './my-outstanding.component.html',
  styleUrls: ['./my-outstanding.component.scss']
})
export class MyOutstandingComponent implements OnInit {
  @ViewChild('form') form!: ElementRef;

  outstandlist: any;
  encRequestRes: any;
  testAmount: any = '5835';
  selectedAddress: any = {
    name: 'testing',
    address: 'test address',
    city: 'test city',
    pincode: '23456',
    state: 'state test',
    phone: '7401075899'
  }
  accessCode: any;
  constructor(private fleetservice: FleetService) { }

  ngOnInit() {
    this._get_OutStandingDetails()
  }

  ngAfterViewInit() {
    const analytics = getAnalytics();

    logEvent(analytics, 'Front End Screen Views', {
      firebase_screen: 'My Outstanding Page',
      firebase_screen_class: 'My Outstanding Page'
    })
  }


  checkout(obj: any) {
    sessionStorage.setItem('outstanding', JSON.stringify(obj))
    this.accessCode = "AVIG03IG85BN32GINB"
    let redirect_url = 'https://customer.gmmco.in/api/CRM/CCAvenueDecrypt';
    let workingKey = "FF4C98526109B44BEB32E1D8121EF38D";
    let useremail = 'testemail@gmail.com';

    let order_no = sessionStorage.getItem('id')
    let request = `merchant_id=35524&order_id=${order_no}&currency=INR&amount=${obj.balance}&redirect_url=${encodeURIComponent(redirect_url)}&cancel_url=${encodeURIComponent(redirect_url)}&language=EN&billing_name=${this.selectedAddress.name}&billing_address=${this.selectedAddress.address}&billing_city=${this.selectedAddress.city}&billing_state=MH&billing_zip=${this.selectedAddress.pincode}&billing_country=India&billing_tel=${this.selectedAddress.phone}&delivery_name=${this.selectedAddress.name}&delivery_address=${this.selectedAddress.address}&delivery_city=${this.selectedAddress.city}&delivery_state=${this.selectedAddress.state}&delivery_zip=${this.selectedAddress.pincode}&delivery_country=India&delivery_tel=${this.selectedAddress.phone}&billing_email=${useremail}`
    console.log(request)

    this.fleetservice._getPayment_Details(request).subscribe((data: any) => {
      console.log(data.response.encrypted);
      this.encRequestRes = data.response.encrypted;
      // this.getCCavDetail()

      setTimeout(() => {

        this.form.nativeElement.submit();
      }, 1000)

    })
  }
  _get_OutStandingDetails() {
    let id: any = sessionStorage.getItem('id');
    //**OLD */
    // this.fleetservice._get_outstanding(id).subscribe((data:any)=>{
    //   this.outstandlist = data.response.d['results'];
    //   console.log(this.outstandlist)


    // })

    //*new********//

    this.fleetservice._getOutstanding_payments().subscribe((data: any) => {
      this.outstandlist = data.response;
      console.log(this.outstandlist)


    })


  }
}
