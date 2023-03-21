import { Component, OnInit, Output, EventEmitter,AfterViewInit, } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as firebase from 'firebase/app';
declare var $:any;
import{Router,ActivatedRoute, NavigationEnd} from '@angular/router'
import { getAnalytics, logEvent ,Analytics} from "firebase/analytics";
import { FireAnalyticsService } from './shared/fire-analytics.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit ,AfterViewInit{

  parent: any;
  parentCount: any;
  currentlang: any;

  constructor(public translate: TranslateService, public route:ActivatedRoute , public routes:Router) {

    this.routes.events.subscribe( (event) => {
      if (event instanceof NavigationEnd) {
        console.log('FROM APPCOMPONENT ----------');
        console.log(this.route.routeConfig?.data);
      }
    });
    //     translate.setDefaultLang('hindhi')

    // translate.use('hindhi');
  }



  ngOnInit(): void {
    console.log(this.route,"routename");
    this.currentlang = sessionStorage.getItem('langName');
    console.log("c lang", this.currentlang)
    this.translate.use('hindhi')

    // $(document).ready(function () {
    //   if (window.IsDuplicate()) {
    //     alert("This is duplicate window\n\n Closing...");
    //     window.close();
    //   }
    // });

    // window.addEventListener('storage', (event) => {
    //   if (event.storageArea != localStorage) return;
    //   if (event.key === 'loggedIn') { alert('Do something with event.newValue') }});
    // $(document).ready(function () {
    //   if (window.IsDuplicate()) {
    //   alert("this is duplicate window\n\n closing...");
    //   window.close();             }         });

    //** for AVOID DUPLICATE tabs */
    // window.addEventListener('beforeunload', function (event) {
    //   sessionStorage.clear();
    // });

    // if (sessionStorage.getItem('userlist')) {
    //   sessionStorage.clear();
    //   // console.warn('Found a lock in session storage. The storage was cleared.');
    // }

    // sessionStorage.setItem('userlist', '1');
    //**END */
// registerOpenTab FUNCTION
// const registerOpenTab = () => {
//   let tabsOpen = 1;
//   while (localStorage.getItem('openTab' + tabsOpen) !== null) {
//     tabsOpen++;
//   }
//   localStorage.setItem('openTab' + tabsOpen, 'open');
//   if (localStorage.getItem('openTab2') !== null) {
//       window.alert('This application is already running in ' + (tabsOpen - 1) + ' other browser tab(s).')
//       window.close()
//   }
// }

// // unregisterOpenTab FUNCTION
// const unregisterOpenTab = () => {
//   alert('ranjith2')

//   let tabsOpen = 1;
//   while (localStorage.getItem('openTab' + tabsOpen) !== null) {
//     tabsOpen++;
//   }
//   localStorage.removeItem('openTab' + (tabsOpen - 1));
//   alert('ranjith')
// }

// // EVENT LISTENERS
// window.addEventListener('load', registerOpenTab);
// window.addEventListener('beforeunload', unregisterOpenTab);


// $(window).on("storage", function(ev:any) {
//   if (ev.originalEvent.key == "tabsync") {
//       window.close(); // will probably not work if the user opened the tab
//       let url:any = 'http://localhost:4200/'
//       window.location = url;
//   }
// });

// localStorage.setItem("tabsync", 'h');
  }


ngAfterViewInit(){
  const analytics = getAnalytics();

logEvent(analytics,'Front End Screen Views',{
  firebase_screen: 'App Component',
firebase_screen_class: 'App Component'
})
}

//   logEvent(analytics, 'LoginCOMP', {
// firebase_screen: 'LoginComponent',
// firebase_screen_class: 'LoginComponent'
// });
  title = 'GmmcoCustomer';
  displayCounter(count: any) {
    console.log(count, "hidsxgvxcvgx")
    this.parentCount = count;
  }




}





