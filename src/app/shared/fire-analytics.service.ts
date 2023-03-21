import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/analytics';
import { getAnalytics, logEvent ,Analytics} from "firebase/analytics";



@Injectable({
  providedIn: 'root'
})

export class FireAnalyticsService {
private analytics: any;
constructor() { }

logEvents(eventName: String,path:any): void {

  
  const analytics = getAnalytics();

    // logEvent(analytics, 'notification_received');

    
//   logEvent(analytics, 'LoginCOMP', {
// firebase_screen: 'LoginComponent', 
// firebase_screen_class: 'LoginComponent'
// });
        // shared method to log the events
        // this.analytics.logEvent(eventName);
        // logEvent(this.analytics, 'goal_completion', { name: 'lever_puzzle'});

        // this.analytics().setCurrentScreen(path) // sets `screen_name` parameter
// this.analytics().logEvent('screen_view')
    }}
