import { Component, OnInit } from '@angular/core';
import { FleetService } from 'src/app/services/fleet.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from 'src/app/services/toastr.service';
import { getAnalytics, logEvent } from "firebase/analytics";

@Component({
  selector: 'app-myfleet-detail',
  templateUrl: './myfleet-detail.component.html',
  styleUrls: ['./myfleet-detail.component.scss']
})
export class MyfleetDetailComponent implements OnInit {
  currentFleetDetail: any;
  partDetails: any;
  partCompatibleList: any;
  searchlist: any;
  FleetsList: any;
  customerId: any;
  constructor(private toastr: ToastService, private fleetService: FleetService, private route: Router) { }

  ngOnInit(): void {
    this.customerId = sessionStorage.getItem('id')
    this._get_Fleets();
    let currentPageDetails: any = sessionStorage.getItem('fleetDetails');
    this.currentFleetDetail = JSON.parse(currentPageDetails)
    console.log(this.currentFleetDetail, "from session")
    if (this.currentFleetDetail)
      this.fleetListDetail()
  }

  ngAfterViewInit() {
    const analytics = getAnalytics();

    logEvent(analytics, 'Front End Screen Views', {
      firebase_screen: 'My fleet Detail Page',
      firebase_screen_class: 'My fleet Detail Page'
    })
  }



  fleetListDetail() {

    this.fleetService._get_myFleetDetails(this.currentFleetDetail.serialNumber).subscribe((resData: any) => {
      console.log(resData, 'from fleet')
      this.partDetails = resData.response.equipmentModelImages[0];
      console.log(this.partDetails, "from parts")
      this.partCompatibleList = resData.response;
    })
  }
  _get_Fleets() {
    this.fleetService._fleet_list(this.customerId).subscribe((data: any) => {
      console.log(data.response['equipmentlist'])

      this.FleetsList = data.response['equipmentlist'];
    })
  }
  gotohealthalert() {
    let obj: any = {
      "serialNumber": this.currentFleetDetail.serialNumber,
      "modelOfAsset": this.currentFleetDetail.modelOfAsset,
      "invoiceDate": null,
      "assetName": this.currentFleetDetail.assetName
    }
    sessionStorage.setItem('fleet', JSON.stringify(obj))
    this.route.navigateByUrl('/customer/health-alert-detail');
  }

  search_data(searchkey: any) {
    let arr = [...searchkey]
    console.log(arr.length, arr)
    if (arr.length > 4) {
      console.log('if')
      this.fleetService._getSearch_Details(searchkey).subscribe((data: any) => {
        console.log(data.response)
        this.searchlist = data.response;
      })
    }
  }

  route_parts(data: any) {
    this.route.navigateByUrl('/customer/part-details/' + data.material_No + ':' + data.source_of_Supply + '/' + this.convertDate(data.part_Description))
  }

  convertDate(updatedate: any) {
    let str: any = updatedate.replace(/\\|\//g, ""); return str.replace(/\s/g, "");
    console.log(str)
    // console.log(str[0]+':'+str[1])
  }

  custDefault(modelOfAsset: any, assetName: any, serialNumber: any) {

    this.fleetService._getDefaultDatas().subscribe((data: any) => {
      if (data.response['defEmail'] == null || data.response['defEmail'] == "") {
        this.route.navigateByUrl('/customer/all-contacts')
        this.toastr.showError('Sorry! Since you dont have an E-Mail Id associated with your contact, we are redirecting you to Contacts Screen');
      } else {
        this.route.navigateByUrl('/customer/create-new-ticket/' + modelOfAsset + '/' + assetName + '/' + serialNumber)
      }
    })
    // routerLink="/customer/create-new-ticket/{{currentFleetDetail?.modelOfAsset}}/{{currentFleetDetail?.assetName}}/{{partDetails?.serialNumber}}"
  }
}
