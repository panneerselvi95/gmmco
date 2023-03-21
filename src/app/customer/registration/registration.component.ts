import { Component, OnInit } from '@angular/core';
import { getAnalytics, logEvent } from "firebase/analytics";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    const analytics = getAnalytics();

    logEvent(analytics, 'Front End Screen Views', {
      firebase_screen: 'Registration Page',
      firebase_screen_class: 'Registration Page'
    })
  }


}
