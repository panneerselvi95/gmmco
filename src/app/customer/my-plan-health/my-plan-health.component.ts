import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FleetService } from 'src/app/services/fleet.service';
import { Observable } from 'rxjs';
import { getAnalytics, logEvent } from "firebase/analytics";

@Component({
  selector: 'app-my-plan-health',
  templateUrl: './my-plan-health.component.html',
  styleUrls: ['./my-plan-health.component.scss']
})
export class MyPlanHealthComponent implements OnInit {

  tabs: any = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven']
  selectedIndex = 0;
  abc: string | undefined;
  leftTabIdx = 0;
  atStart = true;
  atEnd = false;
  pathhome: any = false;
  closeResult: any;
  @Output() emitSelectedTab = new EventEmitter()
  closeModal: any;
  FleetsList: any;
  OutStandingValue: any;
  customerId: any;
  constructor(private router: ActivatedRoute, private fleetservice: FleetService) {



  }

  ngOnInit() {


    // this.emitSelectedTab.emit(this.tabs[0])
    this.abc = `translateX(0px)`
    this.customerId = sessionStorage.getItem('id')
    this._get_Fleets();
    this._get_OutStandingValue();
  }
  ngAfterViewInit() {
    const analytics = getAnalytics();

    logEvent(analytics, 'Front End Screen Views', {
      firebase_screen: 'My Plan Health Page',
      firebase_screen_class: 'My Plan Health Page'
    })
  }



  selectTab(index: any) {
    this.selectedIndex = index
    this.emitSelectedTab.emit(this.tabs[index])
    this.scrollTab(index - this.leftTabIdx - 1)
  }

  scrollTab(x: any) {
    if (this.atStart && x < 0 || this.atEnd && x > 0) {
      return
    }
    this.leftTabIdx = this.leftTabIdx + x
    this.abc = `translateX(${(this.leftTabIdx) * -140}px)`
    this.atStart = this.leftTabIdx === 0
    this.atEnd = this.leftTabIdx === this.tabs.length - 1
  }


  _get_Fleets() {
    this.fleetservice._fleet_list(this.customerId).subscribe((data: any) => {
      console.log(data.response['equipmentlist'])

      this.FleetsList = data.response['equipmentlist'];
    })
  }

  _get_OutStandingValue() {
    this.fleetservice._get_OutStandVal(this.customerId).subscribe((data: any) => {
      console.log(data.response['outstandingBalance'])
      this.OutStandingValue = data.response['outstandingBalance'];
    })
  }


}
