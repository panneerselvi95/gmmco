import { Component, ViewEncapsulation, Inject, ViewChild, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FleetService } from 'src/app/services/fleet.service';
import { Observable } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ToastService } from 'src/app/services/toastr.service';
import { environment } from 'src/environments/environment';
import { getAnalytics, logEvent } from "firebase/analytics";

@Component({
  selector: 'app-health-alert-detail',
  templateUrl: './health-alert-detail.component.html',
  styleUrls: ['./health-alert-detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HealthAlertDetailComponent {


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
  Fleet: any;
  FleetsList: any;
  OutStandingValue: any;
  customerId: any;
  getDismissReason: any;
  connectedDevice: any;
  healthAlert: any;
  upcomingParts: any;
  public dateValue: any;
  diffDays: any;
  incidentId: any;

  constructor(private toaster: ToastService, private router: ActivatedRoute, private fleetservice: FleetService, private modalService: NgbModal) {

    this.customerId = sessionStorage.getItem('id');

    this._init();
    this._init();

  }

  ngOnInit() {
    // this.emitSelectedTab.emit(this.tabs[0])
    this._get_Fleets();
    this._get_OutStandingValue();
    this.Connected_deviceDetails();
    this._get_healthList();
    this._getUpcomingParts();
    this._trackSingleTicket();
    this.abc = `translateX(0px)`

  }
  ngAfterViewInit() {
    const analytics = getAnalytics();

    logEvent(analytics, 'Front End Screen Views', {
      firebase_screen: 'Health Alert Detail Page',
      firebase_screen_class: 'Health Alert Detail Page'
    })
  }




  onChange(args: any) {
    console.log("changeEvent value (from control instance) :" + args.value);
  }
  onBlur() {
    console.log("BlurEvent Value :");
  }
  requestInovice() {
    console.log(this.dateValue, "date")
    this.fleetservice._mailtoincident(null, this.dateValue.toISOString()).subscribe((data: any) => {
      console.log(data)
      if (data.isSuccess == true) {
        this.toaster.showSuccess('Rescheduled SuccessFully')
      }
    })
  }

  selectTab(index: any) {
    this.selectedIndex = index
    this.emitSelectedTab.emit(this.upcomingParts[index])
    this.scrollTab(index - this.leftTabIdx - 1)
  }

  scrollTab(x: any) {
    if (this.atStart && x < 0 || this.atEnd && x > 0) {
      return
    }
    this.leftTabIdx = this.leftTabIdx + x
    this.abc = `translateX(${(this.leftTabIdx) * -(this.upcomingParts.length * 20)}px)`
    this.atStart = this.leftTabIdx === 0
    this.atEnd = this.leftTabIdx === this.upcomingParts.length - 1
  }

  _init() {
    let fleet = sessionStorage.getItem('fleet') || '';
    this.Fleet = JSON.parse(fleet);
    if (Object.keys(this.Fleet).length) {
      let obj = {
        "id": 101336,
        "filters": [{
          "name": "serial_number",
          "values": this.Fleet['serialNumber']
        }]
      }
      this.fleetservice._parts_upcoming(obj).subscribe((data: any) => {
        console.log(data)
      })
    }
  }

  _get_Fleets() {
    this.fleetservice._fleet_list(this.customerId).subscribe((data: any) => {
      console.log(data.response['equipmentlist'])

      this.FleetsList = data.response['equipmentlist'];
      let item = this.FleetsList.filter((item: any) => item.serialNumber == this.Fleet.serialNumber && item.modelOfAsset == this.Fleet.modelOfAsset && item.assetName == this.Fleet['assetName'])
      this.Fleet = { ...this.Fleet, ...item[0] }
    })
  }

  _get_OutStandingValue() {
    this.fleetservice._get_OutStandVal(this.customerId).subscribe((data: any) => {
      // console.log(data.response['outstandingBalance'])
      // this.OutStandingValue = data?.response['outstandingBalance'];
    })
  }

  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  Connected_deviceDetails() {
    let obj: any = {
      "id": environment.connected_device,
      "filters": [
        {
          "name": "serial_number",
          "values": this.Fleet['serialNumber']
        }
      ]

    }
    this.fleetservice._get_DeviceConnected(obj).subscribe((data: any) => {
      console.log(data)

      this.connectedDevice = data?.response
    })
  }


  _get_healthList() {
    let obj: any = {
      "id": environment.healthalert,
      "filters": [
        {
          "name": "CustomerCode",
          "values": this.fleetservice._get_id(this.customerId)
        }
      ]
    }

    this.fleetservice._get_healthAlerts(obj).subscribe((data: any) => {
      console.log(data)

      this.healthAlert = data.response.rows.filter((item: any) => { return item[0] == this.Fleet.serialNumber })
      // this.healthAlert = data.response;
      console.log(this.healthAlert)
    })
  }

  _getUpcomingParts() {
    this.fleetservice._getPartsUpcoming(this.Fleet.serialNumber).subscribe((data: any) => {
      if (data.response == null) {
        this.fleetservice._get_myFleetDetails(this.Fleet['serialNumber']).subscribe((resData: any) => {
          console.log(resData, 'from fleet')


          this.upcomingParts = resData.response.partsModelImages
          // this.partDetails = resData.response.equipmentModelImages[0];
          // console.log(this.partDetails, "from parts")
          // this.partCompatibleList = resData.response;
        })
      } else {
        this.upcomingParts = data.response
      }


      console.log(data)
    })
  }

  _trackSingleTicket() {
    this.fleetservice._getTrackSingleTicketDetails().subscribe((data: any) => {
      const oneDay: any = 24 * 60 * 60 * 1000;
      // console.log(data.response.rows[0][2])

      let date1: any = new Date('2021-09-28T01:00:00')
      console.log(date1, 'iiiii')
      let date2: any = new Date();
      // console.log(date2, date1)
      this.diffDays = Math.round((date2 - date1) / oneDay);
      console.log(this.diffDays)


      this.dateValue = new Date(data.response.rows[0][2])
      this.incidentId = data.response.rows[0][0]
      console.log(new Date(this.dateValue).toISOString(), "sinlge")

    })
  }

  splitdate(char: any) { let chars: any = char.replace(/["']/g, ""); return chars.split(" ") }

  reqAssistance(val: any) {
    console.log(new Date().toISOString())
    let obj: any = {
      "panNumber": sessionStorage.getItem('pan'),
      "mobile": sessionStorage.getItem('mob'),
      "customercode": parseInt(sessionStorage.getItem('id') || '0'),
      "mode": 2,
      "timeofrequest": new Date().toISOString(),
      "serialNo": this.Fleet['serialNumber'],
      "rescheduletime": null,
      "pmDate": this.dateValue,
      "incidentID": 0
    }

    //contract mode = 2 (no pmdate , no incident id , no rescheduletime)
    //pmschedule = no chasnges in obj but mode = 6
    this.fleetservice._needAssitance(obj).subscribe((data: any) => {
      console.log(data)
      this.toaster.showSuccess(val == 'reschedule' ? 'Rescheduled SuccessFully' : 'Successfully Sent Request')

    })
  }


  splitchar(char: any) {

    console.log(char.split(':')[1])
    return char.split(':')
  }

}
