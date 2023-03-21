import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FleetService } from 'src/app/services/fleet.service';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/interval';
import { environment } from '../../../environments/environment';
import { DatePipe } from '@angular/common';
import { DatepickerOptions } from 'ng2-datepicker';
import { ToastService } from 'src/app/services/toastr.service';
import { getAnalytics, logEvent } from "firebase/analytics";

@Component({
  selector: 'app-my-assistant',
  templateUrl: './my-assistant.component.html',
  styleUrls: ['./my-assistant.component.scss'],
  providers: [DatePipe]

})
export class MyAssistantComponent implements OnInit {

  tabs: any = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Six', 'Seven', 'Eight', 'Nine', 'Ten']
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
  summaryDetails: any;
  envVar: any;
  constructor(
    private router: ActivatedRoute,
    private fleetservice: FleetService,
    private _router: Router,
    private toastr: ToastService,
  ) {
    this.envVar = environment
  }

  ngOnInit() {

    this.customerId = sessionStorage.getItem('id')
    this._get_Fleets();
    this._get_TicketSummary();
    this.abc = `translateX(0px)`
    // this.emitSelectedTab.emit(this.FleetsList[0])

  }
  ngAfterViewInit() {
    const analytics = getAnalytics();

    logEvent(analytics, 'Front End Screen Views', {
      firebase_screen: 'MyAssistant Page',
      firebase_screen_class: 'MyAssistant Page'
    })
  }


  ngAfterContentInit() {
    // alert()

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
    // alert(this.FleetsList * 20)
    this.abc = `translateX(${(this.leftTabIdx) * - (this.FleetsList.length * 21)}px)`
    this.atStart = this.leftTabIdx === 0
    this.atEnd = this.leftTabIdx === this.FleetsList.length - 1
  }


  _get_Fleets() {
    this.fleetservice._fleet_list(this.customerId).subscribe((data: any) => {
      console.log(data.response['equipmentlist'])
      this.FleetsList = data.response['equipmentlist'];
    })
  }

  _get_TicketSummary(sno?: any) {
    // alert(this.envVar.track_ticket_summary)
    let ticketObj = {
      "id": Number(this.envVar.track_ticket_summary),
      "filters": [
        {
          "name": "customer_code",
          "values": this.fleetservice._get_id(this.customerId)
        }
      ]
    };
    // let sub = Observable.interval(5000)
    // .subscribe((val) =>

    console.log(ticketObj)
    this.fleetservice._assitant_TicketSummary(ticketObj).subscribe((resData: any) => {
      this.summaryDetails = resData.response;

      //  this._calculate_tickets()
      if (sno != undefined) {
        this.filterTickets(sno)

      }
      console.log(resData)
      // sub.unsubscribe();

    })

    // Observable.interval(10000).subscribe(this.fleetservice._assitant_TicketSummary(ticketObj).subscribe((resData: any) => {
    //   this.summaryDetails = resData.response;
    //   //  this._calculate_tickets()
    //   if(sno != undefined){
    //     this.filterTickets(sno)

    //   }
    //   console.log(resData)
    // })
  }


  convertDate(updatedate: any) {
    let str: any = updatedate.replace(/\'/g, '').split(':');
    return str[0] + ':' + str[1]
    // console.log(str[0]+':'+str[1])
  }
  //  Unsolved,In-progress,Solved
  splitdate(char: any) { let chars: any = char?.replace(/["']/g, ""); return chars?.split(" ") }
  //open tcikets
  // splitDate(val:any){    return val.split("")  }

  _calculate_tickets(details: any) {
    let counts: any = [];
    let opentickets: any = details?.rows.filter((item: any) => { return item[3] == 'Unresolved' || item[3] == 'Assigned' })
    let inprogresstickets: any = details?.rows.filter((item: any) => { return item[3] == 'In-Progress' })
    let closedtickets: any = details?.rows.filter((item: any) => { return item[3] != 'Unresolved' && item[3] != 'Assigned' && item[3] != 'In-Progress' })
    return {
      open: opentickets?.length,
      inprogress: inprogresstickets?.length,
      close: closedtickets?.length
    };
  }

  _create_ticket(fleet: any) {
    if (fleet.status != 'Out of Territory') {


      this.fleetservice._getDefaultDatas().subscribe((data: any) => {
        if (data.response['defEmail'] == null || data.response['defEmail'] == "") {
          this._router.navigateByUrl('/customer/all-contacts')
          this.toastr.showError('Sorry! Since you dont have an E-Mail Id associated with your contact, we are redirecting you to Contacts Screen');
        } else {
          this._router.navigateByUrl(`/customer/create-new-ticket/${fleet.modelOfAsset}/${fleet.assetName}/${fleet.serialNumber}`)
          sessionStorage.setItem('ticket_fleet', JSON.stringify(fleet));
        }

      })
    } else {
      this.toastr.showError('Selected equipment shows as inactive / out of territory asset. Hence the Service Request cannot be created for it. Please call us for any clarifications')

    }


  }
  filterTickets(sno: any) {
    this.summaryDetails['rows'] = this.summaryDetails?.rows.filter((item: any) => { return item[2] == sno })
    this.summaryDetails['rows'].reverse();
    console.log(this.summaryDetails)
  }


}
