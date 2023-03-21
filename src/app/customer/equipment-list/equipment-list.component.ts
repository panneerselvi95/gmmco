import { Component, OnInit } from '@angular/core';
import { FleetService } from 'src/app/services/fleet.service';
import { ToastService } from 'src/app/services/toastr.service';
import { getAnalytics, logEvent } from "firebase/analytics";

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.scss']
})
export class EquipmentListComponent implements OnInit {
  equipmentList: any;
  primaryaddress: any;
  constructor(private equipmentlist: FleetService, private toastr: ToastService) { }

  ngOnInit(): void {
    this._getEquipment_List();

  }

  ngAfterViewInit() {
    const analytics = getAnalytics();

    logEvent(analytics, 'Front End Screen Views', {
      firebase_screen: 'Equipment List Page',
      firebase_screen_class: 'Equipment List Page'
    })
  }


  _getEquipment_List() {
    let id = sessionStorage.getItem('id');
    this.equipmentlist._get_Equipment(id).subscribe((data: any) => {
      this.equipmentList = data.response;
    })

  }

  _Set_isDefault(cusid: any, equip: any, iEqtyp: any) {
    let obj: any = {

      "name": "equipment",
      "ccOde": parseInt(cusid),
      "id": parseInt(iEqtyp),

      "serialNumber": equip

    }
    this.equipmentlist._set_isDefault(obj).subscribe((data: any) => {
      console.log(data)
      if (data.isSuccess == true) {
        this.toastr.showSuccess(data.response)
        this._getEquipment_List()
      } else {
        this.toastr.showError('Something went Wrong')
      }
    })
  }

}


