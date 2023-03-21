import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { getAnalytics, logEvent } from "firebase/analytics";

@Component({
  selector: 'app-ticket-details-popup',
  templateUrl: './ticket-details-popup.component.html',
  styleUrls: ['./ticket-details-popup.component.scss']
})
export class TicketDetailsPopupComponent implements OnInit {

  closeResult: any;
  getDismissReason: any;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    const analytics = getAnalytics();

    logEvent(analytics, 'Front End Screen Views', {
      firebase_screen: 'Ticket Details Popup Page',
      firebase_screen_class: 'Ticket Details Popup Page'
    })
  }


  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

}
