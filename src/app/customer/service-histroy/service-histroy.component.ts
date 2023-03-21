import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { FleetService } from 'src/app/services/fleet.service';
import { getAnalytics, logEvent } from "firebase/analytics";


@Component({
  selector: 'app-service-histroy',
  templateUrl: './service-histroy.component.html',
  styleUrls: ['./service-histroy.component.scss']
})
export class ServiceHistroyComponent implements OnInit {

  closeResult: any;
  getDismissReason: any;
  serviceDetails: any;
  constructor(private modalService: NgbModal, private route: ActivatedRoute, private fleetservice: FleetService) { }

  ngOnInit() {
    let sno: any = this.route.snapshot.params.id;
    this._getServiceRecords(sno)
  }
  ngAfterViewInit() {
    const analytics = getAnalytics();

    logEvent(analytics, 'Front End Screen Views', {
      firebase_screen: 'Service Histroy Page',
      firebase_screen_class: 'Service Histroy Page'
    })
  }



  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


  _getServiceRecords(sno: any) {
    this.fleetservice._get_serviceHistory(sno).subscribe((datas: any) => {
      console.log(datas)
      this.serviceDetails = datas.response;
    })
  }

}
