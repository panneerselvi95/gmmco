import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { getAnalytics, logEvent } from "firebase/analytics";

@Component({
  selector: 'app-frame13',
  templateUrl: './frame13.component.html',
  styleUrls: ['./frame13.component.scss']
})
export class Frame13Component implements OnInit {

  closeResult: any;
  getDismissReason: any;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  ngAfterViewInit() {
    const analytics = getAnalytics();

    logEvent(analytics, 'Front Screen Views', {
      firebase_screen: 'Frame13 Component',
      firebase_screen_class: 'Frame13 Component'
    })
  }





}
