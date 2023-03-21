import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { getAnalytics, logEvent } from "firebase/analytics";

@Component({
  selector: 'app-frame10',
  templateUrl: './frame10.component.html',
  styleUrls: ['./frame10.component.scss']
})
export class Frame10Component implements OnInit {


  closeResult: any;
  getDismissReason: any;
  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    const analytics = getAnalytics();

    logEvent(analytics, 'Front End Screen Views', {
      firebase_screen: 'Frame10 Page',
      firebase_screen_class: 'Frame10 Page'
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
