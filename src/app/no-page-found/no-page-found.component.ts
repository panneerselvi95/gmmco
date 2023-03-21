import { Component, OnInit } from '@angular/core';
import { getAnalytics, logEvent } from "firebase/analytics";

@Component({
  selector: 'app-no-page-found',
  templateUrl: './no-page-found.component.html',
  styleUrls: ['./no-page-found.component.scss']
})
export class NoPageFoundComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  ngAfterViewInit() {

    const analytics = getAnalytics();

    logEvent(analytics, 'Front End Screen Views', {
      firebase_screen: 'No Page Found Page',
      firebase_screen_class: 'No Page Found Page'
    })
  }
}
