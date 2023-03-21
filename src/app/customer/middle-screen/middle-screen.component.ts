import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FleetService } from 'src/app/services/fleet.service';
import { ToastService } from 'src/app/services/toastr.service';
import { getAnalytics, logEvent } from "firebase/analytics";
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-middle-screen',
  templateUrl: './middle-screen.component.html',
  styleUrls: ['./middle-screen.component.scss']
})
export class MiddleScreenComponent implements OnInit {
  user_list: any = [];
  setusers: any;

  constructor(private router: Router,
    private activateroute: ActivatedRoute, private toaster: ToastService, private auth: AuthService, private fleetservice: FleetService) { }

  ngOnInit(): void {
    let userlist: any = sessionStorage.getItem('userlist');
    this.user_list = JSON.parse(userlist);
  }

  ngAfterViewInit() {
    const analytics = getAnalytics();

    logEvent(analytics, 'Front End Screen Views', {
      firebase_screen: 'Organization Selection Page',
      firebase_screen_class: 'Organization Selection Page'
    })
  }



  setsession(data: any) {
   
    sessionStorage.setItem('id', data.custcode);
    // sessionStorage.setItem('id', data.response[0].custcode)
    sessionStorage.setItem('name', window.btoa(data.custName));
    debugger;
    localStorage.setItem('token' ,data.token);
    // console.log(  localStorage.setItem('token' ,data.token));
    
    // this.toaster.showSuccess('Login Successfully');
    console.log(data, "dddddddd");
    let setObj = {
      "ccode": Number(sessionStorage.getItem('id')),
      // "pannumber": sessionStorage.getItem('pan'),
      // "mobile": sessionStorage.getItem('mob') ,
      "pannumber": this.auth.encryptUsingAES256 (sessionStorage.getItem('pan')),
      "mobile": this.auth.encryptUsingAES256(sessionStorage.getItem('mob')),
      "mode": "Web",
      "version": "0" 
    }
    this.auth._SetUser(setObj).subscribe(
      (data:any)=>{
      
        this.setusers = data;
      
        
        if(data.isSuccess == true){
          this.router.navigateByUrl('/customer/home')
        }
        // else{
        //   this.router.navigateByUrl('/login')
        // }
      }
    )
    // this.router.navigateByUrl('/customer/home')
  }



  reqAssistance() {


    console.log(new Date().toISOString())
    let obj: any = {
      "panNumber": sessionStorage.getItem('pan'),
      "mobile": sessionStorage.getItem('mob'),
      "customercode": parseInt(this.user_list[0].custcode),
      "mode": 1,
      "timeofrequest": new Date().toISOString(),
      "rescheduletime": null,
      "incidentID": 0
    }
    this.fleetservice._needAssitance(obj).subscribe((data: any) => {
      console.log(data)
      this.toaster.showSuccess('Thank You For Your Request , Admin Will Contact You Soon')

    })
  }
}
