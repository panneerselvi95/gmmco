import { Component, OnInit } from '@angular/core';
import { ToastService } from '../../services/toastr.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FleetService } from 'src/app/services/fleet.service';
import { getAnalytics, logEvent } from "firebase/analytics";

@Component({
  selector: 'app-success',
  templateUrl: './success.component.html',
  styleUrls: ['./success.component.scss']
})
export class SuccessComponent implements OnInit {
  currentoutstanding: any;

  constructor(private toastr: ToastService, private router: Router, private activateroute: ActivatedRoute, private fleetservice: FleetService) { }

  ngOnInit() {
    // alert(sessionStorage.getItem('outstanding'))


    // if(sessionStorage.getItem('outstanding') != null){
    //   this.currentoutstanding =  JSON.parse(sessionStorage.getItem('outstanding') || '')
    //   this.hit_cA012(this.currentoutstanding)


    // }

    if (sessionStorage.getItem('pagename') == 'payment') {
      this.router.navigateByUrl('/customer/order-confirmation');
      this.toastr.showSuccess('Payment Success')
    } else {
      this.router.navigateByUrl('/customer/home');
      this.toastr.showSuccess('Payment Success')
    }

  }

  ngAfterViewInit() {
    const analytics = getAnalytics();

    logEvent(analytics, 'Front End Screen Views', {
      firebase_screen: 'Payment Success Page',
      firebase_screen_class: 'Payment Success Page'
    })
  }




  //   hit_cA012(obj:any){
  // this.fleetservice._CA012(obj).subscribe((data:any)=>{
  //   console.log(data)

  //   this.toastr.showSuccess('Payment Reference no : '+data['response']['d']['results'][0]['iCcAvenueRefId'])
  // })

  //   }

}
