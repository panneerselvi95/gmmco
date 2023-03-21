import { Component, OnInit } from '@angular/core';
import { getAnalytics, logEvent } from "firebase/analytics";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    const analytics = getAnalytics();

    logEvent(analytics, 'Front End Screen Views', {
      firebase_screen: 'Dashboard',
      firebase_screen_class: 'Dashboard'
    })
  }
}
