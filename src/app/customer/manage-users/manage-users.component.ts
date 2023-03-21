import { Component, OnInit } from '@angular/core';
import { FleetService } from 'src/app/services/fleet.service';
import { ToastService } from 'src/app/services/toastr.service';
import { getAnalytics, logEvent } from "firebase/analytics";

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
  userList: any = {}
  constructor(private fleetservice: FleetService, private toastr: ToastService) {
    this.getGroupList();
  }

  ngOnInit(): void {
    this.getUserlist();
  }

  ngAfterViewInit() {
    const analytics = getAnalytics();

    logEvent(analytics, 'Front End Screen Views', {
      firebase_screen: 'Manage Users Page',
      firebase_screen_class: 'Manage Users Page'
    })
  }



  getUserlist() {
    this.fleetservice._getUserListForRights().subscribe((data: any) => {
      this.userList['userlist'] = data.response;
    })
  }

  getGroupList() {
    this.fleetservice._getGroupsList().subscribe((data: any) => {
      this.userList['grouplist'] = data.response['userGroup']
    })
  }

  setRights(obj: any, e: any) {
    console.log(obj, e.target.value);
    this.fleetservice._setRightsForCustomer(obj, e.target.value).subscribe((data: any) => {

      if (data.isSuccess) {
        this.getUserlist()
        this.toastr.showSuccess(data.message)

      } else {
        this.toastr.showError(data.message)

      }
    })
  }
}
