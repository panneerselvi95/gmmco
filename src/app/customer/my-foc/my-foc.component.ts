import { Component, OnInit } from '@angular/core';
import { getAnalytics, logEvent } from 'firebase/analytics';
import { FleetService } from 'src/app/services/fleet.service';

@Component({
  selector: 'app-my-foc',
  templateUrl: './my-foc.component.html',
  styleUrls: ['./my-foc.component.scss']
})
export class MyFocComponent implements OnInit {
  [x: string]: any;
  myfoc: any;
  customerId: any;
  totalcount: any;


  constructor(private fleetservice: FleetService) { }

  ngOnInit(): void {
    this.customerId = sessionStorage.getItem('id')
    this.my_foc_func()
  }

  ngAfterViewInit() {
    const analytics = getAnalytics();

    logEvent(analytics, 'Front End Screen Views', {
      firebase_screen: 'MyFoc Page',
      firebase_screen_class: 'MyFoc Page'
    })
  }

  my_foc_func() {
    let myfocObj = {
      soldparty: 29350,
      orderreason: "Z34"
    }
    this.fleetservice._get_myFOC(myfocObj).subscribe((data: any) => {
      console.log('this is my foc')
      this.myfocs = data.response.d.results
      // this.totalcount = data.length;
      // this.myfoc.next(data)
      console.log(data)
    })
  }
}
