import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FleetService } from 'src/app/services/fleet.service';
import { Observable } from 'rxjs';
import { NgbActiveModal, NgbModal, NgbModalRef, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { environment } from '../../../environments/environment';
import { getAnalytics, logEvent } from "firebase/analytics";

@Component({
  selector: 'app-orderparts-list',
  templateUrl: './orderparts-list.component.html',
  styleUrls: ['./orderparts-list.component.scss']
})
export class OrderpartsListComponent implements OnInit {
  // @Input() tabs: string | any | undefined;
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
  summaryDetails: any;
  defaultAdr: any;
  envVar: any;
  constructor(private modalRef: NgbActiveModal,
    private modalService: NgbModal, private route: Router, private router: ActivatedRoute, private fleetservice: FleetService) {
    this.envVar = environment;



  }

  ngOnInit() {



    // this.emitSelectedTab.emit(this.tabs[0])
    this.abc = `translateX(0px)`
    this.customerId = sessionStorage.getItem('id')
    this._get_Fleets();
    this._get_OutStandingValue();
    this._get_TicketSummary();
  }
  ngAfterViewInit() {
    const analytics = getAnalytics();

    logEvent(analytics, 'Front End Screen Views', {
      firebase_screen: 'Order Parts List Page',
      firebase_screen_class: 'Order Parts List Page'
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


  goOutstand() {
    this.modalRef.close();
    this.route.navigateByUrl('/customer/my-outstanding')
  }


  close() {
    this.modalRef.close();
  }

  open(content: any) {

    this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }



  _get_Fleets() {
    this.fleetservice._fleet_list(this.customerId).subscribe((data: any) => {
      console.log(data.response['equipmentlist'])

      this.FleetsList = data.response['equipmentlist'];
    })
  }
  gototabs() {
    window.open('http://3.109.30.40:8081/bugzilla/')

  }
  _get_OutStandingValue() {
    this.fleetservice._get_OutStandVal(this.customerId).subscribe((data: any) => {
      //  console.log(data.response['outstandingBalance'])
      this.OutStandingValue = data.response?.outstandingBalance;
    })
  }

  _goTo_FleetDetails(fleetObj: any) {
    sessionStorage.setItem('fleetDetails', JSON.stringify(fleetObj))
    this.route.navigateByUrl('/customer/my-fleet-details')
  }


  gotohealthalert(data: any) {

    let obj: any = {
      "serialNumber": data.serialNumber,
      "modelOfAsset": data.modelOfAsset,
      "invoiceDate": data.invoiceDate,
      "assetName": data.assetName
    }
    sessionStorage.setItem('fleet', JSON.stringify(obj))
    this.route.navigateByUrl('/customer/health-alert-detail');
  }

  _get_TicketSummary() {
    let ticketObj = {
      "id": Number(this.envVar.track_ticket_summary),
      "filters": [
        {
          "name": "customer_code",
          "values": this.fleetservice._get_id(this.customerId)
        }
      ]
    };
    this.fleetservice._assitant_TicketSummary(ticketObj).subscribe((resData: any) => {
      // this.summaryDetails = resData.response;
      let res: any = resData.response.rows.filter((item: any) => { return item[3] == 'Assigned' })
      this.summaryDetails = res[res.length - 1];
      //  this._calculate_tickets()
      console.log(this.summaryDetails, "   this.summaryDetails ")
    })
  }

  convertDate(updatedate: any) {
    let str: any = updatedate.replace(/\'/g, '').split(':');
    return str[0] + ':' + str[1]
    // console.log(str[0]+':'+str[1])
  }

  splitfunc(c: any) { let matId = c.split(':'); return matId }

}
