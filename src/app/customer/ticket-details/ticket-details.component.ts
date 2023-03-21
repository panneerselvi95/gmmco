// import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FleetService } from 'src/app/services/fleet.service';
import { ToastService } from '../../services/toastr.service';
import { environment } from '../../../environments/environment';
import { getAnalytics, logEvent } from "firebase/analytics";

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.scss']
})
export class TicketDetailsComponent implements OnInit {
  closeResult: any;
  getDismissReason: any;

  // constructor(private modalService: NgbModal) { }
  currentParams: any;
  ticketDetails: any;
  parentCount: any;

  constructor(private toastr: ToastService, private router: ActivatedRoute, private fleetservice: FleetService, private modalService: NgbModal) {
    this.parentCount = sessionStorage.getItem('lang');
  }

  ngOnInit(): void {
    this.currentParams = this.router.snapshot.params;
    this._get_ticketDetails();
  }
  ngAfterViewInit() {
    const analytics = getAnalytics();

    logEvent(analytics, 'Front End Screen Views', {
      firebase_screen: 'Ticket Details Page',
      firebase_screen_class: 'Ticket Details Page'
    })
  }




  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  _get_ticketDetails() {
    let ticketObj: object = {
      "id": environment.track_ticket_detail,
      "filters": [{
        "name": "ticket_number",
        "values": this.currentParams['id']
      }]
    }

    this.fleetservice._assitant_TicketDetails(this.currentParams['id']).subscribe((resData: any) => {

      this.ticketDetails = resData.response[0];
      // if(resData.response.rows[0][10] == null){
      //   let items:any = resData.response.rows.filters((item:any)=>{console.log(item)})
      //   console.log(items)
      // }
      // console.log(this.ticketDetails)
    })
  }
  displayCounter(count: any) {
    console.log(count, "hidsxgvxcvgx")
    this.parentCount = count;
  }

  mailtoservice(inid: any) {
    let id: any = sessionStorage.getItem('id');
    this.fleetservice._mailtoServiceHistory(inid, id).subscribe((data: any) => {
      console.log(data)
      if (data.isSuccess == true) {
        this.toastr.showSuccess('Email Sent SuccessFully')
      } else {
        this.toastr.showError('Failed')

      }
    })
  }
  splitdate(char: any) { let chars: any = char.replace(/["']/g, ""); return chars.split(" ") }

  convertDate(updatedate: any) {

    if (updatedate) {
      let str: any = updatedate.split("");
      return str[0]
    }

    // console.log(str[0]+':'+str[1])
  }
}
