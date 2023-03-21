import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { getAnalytics, logEvent } from "firebase/analytics";

@Component({
  selector: 'app-reshedule-popup',
  templateUrl: './reshedule-popup.component.html',
  styleUrls: ['./reshedule-popup.component.scss']
})
export class ReshedulePopupComponent implements OnInit {

  closeResult: any;
  getDismissReason: any;
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    const analytics = getAnalytics();

    logEvent(analytics, 'Front End Screen Views', {
      firebase_screen: 'Reshedule Popup Page',
      firebase_screen_class: 'Reshedule Popup Page'
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
