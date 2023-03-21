import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '../../services/toastr.service';
import { getAnalytics, logEvent } from "firebase/analytics";

@Component({
  selector: 'app-failure',
  templateUrl: './failure.component.html',
  styleUrls: ['./failure.component.scss']
})
export class FailureComponent implements OnInit {

  constructor(private router: Router, private activateroute: ActivatedRoute, private toaster: ToastService) { }

  ngOnInit(): void {
    this.router.navigateByUrl('/customer/payment-gateway');
    this.toaster.showError('Payment Failure !!!, Try Again')
  }

  ngAfterViewInit() {
    const analytics = getAnalytics();

    logEvent(analytics, 'Front End Screen Views', {
      firebase_screen: 'Payment Failure Page',
      firebase_screen_class: 'Payment Failure Page'
    })
  }



}
