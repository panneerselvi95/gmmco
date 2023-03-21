import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { getAnalytics, logEvent } from "firebase/analytics";

@Component({
  selector: 'app-frame12',
  templateUrl: './frame12.component.html',
  styleUrls: ['./frame12.component.scss']
})
export class Frame12Component implements OnInit {

  closeResult: any;
  getDismissReason: any;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    const analytics = getAnalytics();

    logEvent(analytics, 'Front Screen Views', {
      firebase_screen: 'Frame12 Component',
      firebase_screen_class: 'Frame12 Component'
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
