import { FleetService } from 'src/app/services/fleet.service';
import { ToastService } from 'src/app/services/toastr.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { getAnalytics, logEvent } from "firebase/analytics";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent implements OnInit {
  profileform !: FormGroup;
  userObj: any = {};
  constructor(private fleetService: FleetService, private formBuilder: FormBuilder,

    private toaster: ToastService,
    private router: Router) { }

  ngOnInit() {
    this.userObj['pan'] = sessionStorage.getItem('pan');
    this.userObj['mobile'] = sessionStorage.getItem('mob');
    this.userObj['custCode'] = sessionStorage.getItem('id');
    this.userObj['userlist'] = JSON.parse(sessionStorage.getItem('userlist') || '').filter((item: any) => { return item.custcode == this.userObj['custCode'] })
    this.createForm();
    this.filterCurrentUser();
  }

  ngAfterViewInit() {
    const analytics = getAnalytics();

    logEvent(analytics, 'Front End Screen Views', {
      firebase_screen: 'My Profile Page',
      firebase_screen_class: 'My Profile Page'
    })
  }



  createForm() {
    console.log(this.userObj, "useRLid")
    this.profileform = this.formBuilder.group({
      mobileNo: [this.userObj['mobile'], [Validators.required, Validators.minLength(10)]],
      panNumber: [this.userObj['pan']],
      address: [this.userObj['userlist'][0]['address']],
      emailid: ['', [Validators.required, Validators.email]],
      custName: [this.userObj['userlist'][0]['custName']],
      companyName: [],
      cusId: [this.userObj['custCode']],
      pincode: [this.userObj['userlist'][0]['pincode']]

    });

    // console.log(this.userObj)
  }
  _give_AdminAccess() {

    let obj: any = {
      "panNumber": sessionStorage.getItem('pan'),
      "mobile": sessionStorage.getItem('mob'),
      "customercode": parseInt(sessionStorage.getItem('id') || '0'),
      "mode": 4,
      "timeofrequest": new Date().toISOString(),
      "rescheduletime": null,
      "incidentID": 0
    }



    this.fleetService._needAssitance(obj).subscribe((data: any) => {
      if (data.isSuccess == true) {
        this.toaster.showSuccess('Thank You For Your Request , Admin Will Contact You Soon')
      }
    })

  }


  filterCurrentUser() {
    let filterEmail: any;
    this.fleetService._getAll_Contacts(this.userObj['custCode']).subscribe((data: any) => {


      this.userObj['curremail'] = data.response.filter((item: any) => { return item.telephone == this.userObj['mobile'] && item.email });

      console.log(this.userObj)
      this.profileform.controls.custName.patchValue(this.userObj['curremail'][0].name);
      this.profileform.controls.companyName.patchValue(this.userObj['userlist'][0].custName);

      this.profileform.controls.emailid.patchValue(this.userObj['curremail'][0].email);
    })

  }

  updateProfile() {
    this.fleetService._add_Contact(this.userObj['custCode'], this.userObj['curremail'][0].email, this.userObj['mobile'], this.userObj['userlist'][0]['custName']).subscribe((data: any) => {
      console.log(data);
      this.toaster.showSuccess('Contact Updated Successfully')
    })
  }

}
