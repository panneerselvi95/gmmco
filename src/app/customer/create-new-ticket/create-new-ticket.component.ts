import { Component, ViewEncapsulation, Inject, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FleetService } from 'src/app/services/fleet.service';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ToastService } from '../../services/toastr.service';
import { DatePickerComponent, IDatePickerConfig } from 'ng2-date-picker';
declare var $: any;
import { getAnalytics, logEvent } from "firebase/analytics";

import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-create-new-ticket',
  templateUrl: './create-new-ticket.component.html',
  styleUrls: ['./create-new-ticket.component.scss'],
  providers: [DatePipe],

  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CreateNewTicketComponent {

  // public minDate: Date = new Date ("05/07/2017 2:00 AM");

  // public maxDate: Date = new Date ("05/27/2017 11:00 AM");

  public dateValue: Date = new Date();
  config: IDatePickerConfig = {
    format: 'hh:mm',
    showTwentyFourHours: false,
    minutesInterval: 15,
  };
  closeResult: any;
  getDismissReason: any;
  createTicket!: FormGroup;
  datePickerConfig = { format: 'MM/DD/YYYY' };
  requestList: any;
  currentParams: any;
  fleet_detail: any = {};

  constructor(private datePipe: DatePipe, private modalService: NgbModal, private fleetService: FleetService, private formBuilder: FormBuilder, private router: Router, private activateroute: ActivatedRoute, private toaster: ToastService) {

    // this._get_Dropdownlist();
    // this.dateValue =  this.datePipe.transform(new Date(), 'dd/MM/yyyy')
    this.requestList = JSON.parse(sessionStorage.getItem('dropdown') || '')
  }

  ngOnInit(): void {
    this.currentParams = this.activateroute.snapshot.params;
    console.log(this.currentParams);
    this.fleet_detail = JSON.parse(sessionStorage.getItem('ticket_fleet') || '{}');
    this.fleet_detail['myfleets'] = JSON.parse(sessionStorage.getItem('fleetDetails') || '{}');

    // this._get_Dropdownlist();
    this.createForm();
    // $(document).ready(function(){
    //   var elem :any = document.getElementById("dateInput")
    //   var iso = new Date().toISOString();
    //   var minDate = iso.substring(0,iso.length-1);
    //   elem.value = minDate
    //   elem.min = minDate
    // });


  }
  ngAfterViewInit() {
    const analytics = getAnalytics();

    logEvent(analytics, 'Front End Screen Views', {
      firebase_screen: 'Create New Ticket Page',
      firebase_screen_class: 'Create New Ticket Page'
    })
  }
  cal() {
    $(function () {
      $('#datetimepicker1').datetime;
    });
  }
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  createForm() {
    this.createTicket = this.formBuilder.group({
      requestType: ['', [Validators.required]],
      description: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      reqDate: new FormControl(new Date()),
      reqTime: [this.dateValue, [Validators.required]]
    });
  }
  // _get_Dropdownlist() {
  //   this.fleetService._get_requestDropdowm().subscribe((data: any) => {
  //     this.requestList = data.response;
  //   })
  // }

  createTickets() {
    let ticketOBJ = {
      // "primaryContact": {
      //   "id": 5922
      // },
      // "category": {
      //   "lookupName": this.createTicket.value.requestType
      // },
      // "subject": this.createTicket.value.subject,
      // "statusWithType": {
      //   "status": { "id": 3 }
      // },
      // "customFields": {
      //   "c": {
      //     "customer_req_date_time":  new Date(this.createTicket.value.reqDate).toISOString(),
      //     "customer_call_date_time": new Date(),
      //     "asset_serial_number": this.currentParams['id3'],
      //     "description": this.createTicket.value.description
      //   }
      // },
      // "assignedTo": {
      //   "account": {
      //     "id": 20304
      //   }
      // }


      "primaryContact":
      {
        "id": 5922
      },
      "category": {

        "lookupName": this.createTicket.value.requestType
      },
      "subject": this.createTicket.value.subject,
      "statusWithType": {
        "status": {
          "id": 3
        }
      },
      "customFields": {
        "c": {
          "customer_req_date_time": new Date(this.createTicket.value.reqDate).toISOString(),
          "customer_call_date_time": new Date(),
          "asset_serial_number": this.currentParams['id3'],
          "description": this.createTicket.value.description

        }
      }

    }
    console.log(this.createTicket.value)
    this.fleetService._create_ticket(ticketOBJ).subscribe((data: any) => {
      console.log(data)
      if (data.isSuccess == true) {
        this.toaster.showSuccess(data.message + ' RefNo ' + data.response.referenceNumber)
        this.router.navigateByUrl('/customer/my-assistant')
      } else {
        this.toaster.showError('Ticket Creation failed')
      }
    })

  }

  restricts(e: any) {
    // alert(e.which)
    if (e.which <= 59) {
      e.preventDefault();
      $(this).trigger('myOwnEvent');
    }

  }

}
