import { Component, OnInit } from '@angular/core';
import { FleetService } from 'src/app/services/fleet.service';
import { Router, ActivatedRoute } from '@angular/router';
import { getAnalytics, logEvent } from "firebase/analytics";

@Component({
  selector: 'app-quote-details',
  templateUrl: './quote-details.component.html',
  styleUrls: ['./quote-details.component.scss']
})
export class QuoteDetailsComponent implements OnInit {
  quoteDetails: any;

  constructor(private fleetdetails: FleetService, private route: ActivatedRoute) { }

  ngOnInit() {
    let qid: any = this.route.snapshot.params;
    this._getQuoteDetails(qid['id'])
  }
  ngAfterViewInit() {
    const analytics = getAnalytics();

    logEvent(analytics, 'Front End Screen Views', {
      firebase_screen: 'Quote Details Page',
      firebase_screen_class: 'Quote Details Page'
    })
  }
  _getQuoteDetails(qid: any) {
    this.fleetdetails._QuoteList(qid).subscribe((data: any) => {

      this.quoteDetails = data.response;
      console.log(this.quoteDetails)
    })
  }

}
