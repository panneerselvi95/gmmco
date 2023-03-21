import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FleetService } from 'src/app/services/fleet.service';
import { Observable } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { getAnalytics, logEvent } from "firebase/analytics";

declare var $: any;
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-my-plan-upcoming',
  templateUrl: './my-plan-upcoming.component.html',
  styleUrls: ['./my-plan-upcoming.component.scss']
})
export class MyPlanUpcomingComponent implements OnInit {

  tabs: any = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven']
  selectedIndex = 0;
  abc: string | undefined;
  datePickerConfig = { format: 'MM/DD/YYYY' };
  leftTabIdx = 0;
  atStart = true;
  atEnd = false;
  pathhome: any = false;
  closeResult: any;
  @Output() emitSelectedTab = new EventEmitter()
  closeModal: any;
  FleetsList: any;
  PMSchduleSummaryList: any;
  OutStandingValue: any;
  customerId: any;
  healthAlert: any;
  dynamicLabel: any = 'UPCOMING PREVENTIVE MAINTENANCE SCHEDULES'
  constructor(private router: ActivatedRoute, private _router: Router, private fleetservice: FleetService) {



  }

  ngOnInit() {
    // this.emitSelectedTab.emit(this.tabs[0])
    this.abc = `translateX(0px)`
    this.customerId = sessionStorage.getItem('id')
    this._get_Fleets();
    this._get_pm_schedule_summary();
    this._get_OutStandingValue();
    this._get_healthList()

  }

  ngAfterViewInit() {
    const analytics = getAnalytics();

    logEvent(analytics, 'Front End Screen Views', {
      firebase_screen: 'My Plan Upcoming Page',
      firebase_screen_class: 'My Plan Upcoming Page'
    })
  }




  setLabel(value: any) {
    value == 'pm' ? this.dynamicLabel = 'UPCOMING PREVENTIVE MAINTENANCE SCHEDULES' : this.dynamicLabel = 'Health Alerts'

  }


  selectTab(index: any) {
    this.selectedIndex = index
    this.emitSelectedTab.emit(this.FleetsList[index])
    this.scrollTab(index - this.leftTabIdx - 1)
  }

  scrollTab(x: any) {
    if (this.atStart && x < 0 || this.atEnd && x > 0) {
      return
    }
    this.leftTabIdx = this.leftTabIdx + x
    this.abc = `translateX(${(this.leftTabIdx) * - (this.FleetsList.length * 21)}px)`
    this.atStart = this.leftTabIdx === 0
    this.atEnd = this.leftTabIdx === this.FleetsList.length - 1;
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

  _get_pm_schedule_summary(sno?: any) {
    let obj = {
      "id": environment.PM_summary_id,
      "filters": [
        {
          "name": "customer_code",
          "values": this.fleetservice._get_id(sessionStorage.getItem('id'))
        }
      ]
    };
    this.fleetservice._pm_schedule_summary(obj).subscribe((data: any) => {
      this.PMSchduleSummaryList = data.response;
      if (sno != undefined) {
        this._filterPlan(sno)

      }
      console.log(data.response)
    })
  }

  _get_healthList(sno?: any) {
    let obj: any = {
      "id": environment.healthalert,
      "filters": [
        {
          "name": "CustomerCode",
          "values": this.fleetservice._get_id(sessionStorage.getItem('id'))
        }
      ]
    }

    this.fleetservice._get_healthAlerts(obj).subscribe((data: any) => {
      console.log(data)
      this.healthAlert = data.response;
      if (sno != undefined) {
        this._filterPlan(sno)

      }
    })
  }
  splitdate(char: any) { let chars: any = char?.replace(/["']/g, ""); return chars?.split(" ") }

  route_health(i: number) {
    let data = {
      serialNumber: this.FleetsList[i]['serialNumber'],
      modelOfAsset: this.FleetsList[i]['modelOfAsset'],
      invoiceDate: this.FleetsList[i]['invoiceDate'],
      assetName: this.FleetsList[i]['assetName']
    }
    sessionStorage.setItem('fleet', JSON.stringify(data))
    this._router.navigateByUrl('/customer/health-alert-detail');
  }
  requestInovice(incidentID: any, e: any) {
    console.log()
    this.fleetservice._mailtoincident(incidentID, new Date(e.target.value).toISOString()).subscribe((data: any) => {
      console.log(data)

    })
  }

  _split_char(c: any) { let matId = c.split(':'); return matId };


  _filterPlan(sno: any) {
    this.PMSchduleSummaryList['rows'] = this.PMSchduleSummaryList?.rows.filter((item: any) => { return sno == item[1] })


    this.healthAlert['rows'] = this.PMSchduleSummaryList?.rows.filter((item: any) => { return sno == item[0] })
  }
}
