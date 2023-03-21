import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ConfirmPasswordValidator } from '../shared/validator';
import { ToastService } from '../services/toastr.service';
import { Router, ActivatedRoute } from '@angular/router';
import { getAnalytics, logEvent } from "firebase/analytics";


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordGrp!: FormGroup;
  otpScreen: boolean = false;
  currentData: any;
  constructor(private auth: AuthService,
    private formBuilder: FormBuilder,
    private toaster: ToastService,
    private router: Router, private activateroute: ActivatedRoute,
  ) {
    this.createForm()
  }

  ngOnInit(): void {
    this.currentData = JSON.parse(sessionStorage.getItem('password_reset') || '');
    console.log(this.currentData)
    if (!this.currentData || !this.currentData.phoneNo || !this.currentData.panNo)
      this.router.navigateByUrl('/login');
  }
  ngAfterViewInit() {

    const analytics = getAnalytics();

    logEvent(analytics, 'Front End Screen Views', {
      firebase_screen: 'Reset Password Page',
      firebase_screen_class: 'Reset Password Page'
    })

  }


  createForm() {
    this.resetPasswordGrp = this.formBuilder.group({
      mobileNo: [""],
      password: ["", [Validators.required , Validators.minLength(7),Validators.maxLength(16) ,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]],
      // password: ["", Validators.required ],
      conPassword: ["", Validators.required],
      loginType: new FormControl('OTP'),
      otp: new FormControl(''),
    }, {
      validator: ConfirmPasswordValidator("password", "conPassword")
    });
  }
  get f() { return this.resetPasswordGrp.controls; }

  requestOTP() {
    if (this.resetPasswordGrp.valid) {
      let json = {
        "mobileNo": this.auth.encryptUsingAES256(this.currentData.phoneNo),
        "panNumber": this.auth.encryptUsingAES256(this.currentData.panNo),
        "deviceType": "",
        "deviceModel": "",
        "osVersion": "",
        "deviceToken": ""
      }
      this.auth._Otp_Send(json).subscribe((resData: any) => {
        if (resData.isSuccess == true) {
          this.toaster.showSuccess(resData.message);
          this.otpScreen = true;
        } else {
          this.toaster.showError(resData.message);
        }
      }, err => {
        this.toaster.showError('Invalid Data');
      })
    } else {
      if (!this.resetPasswordGrp.value.password || !this.resetPasswordGrp.value.conPassword) {
        this.toaster.showError('Please Enter(*) Required field');
      } else {
        this.toaster.showError(`Passsword and Confirm Password didn't match.`);
      }
    }
  }



  verifyOTP() {
    if (this.resetPasswordGrp.status == 'VALID' && this.resetPasswordGrp.value.otp != "") {


      let json = this.resetPasswordGrp.value;
      json['mobileNo'] = this.auth.encryptUsingAES256(this.currentData.phoneNo);
      json['panNumber'] = this.auth.encryptUsingAES256(this.currentData.panNo);
      json['otp'] = this.auth.encryptUsingAES256(json['otp']);
      json['password'] = this.auth.encryptUsingAES256(json['password']);


      this.auth._Forgot_Password(json).subscribe((resData: any) => {
        console.log(resData)
        if (resData.isSuccess == true) {
          this.toaster.showSuccess(resData.message)
          this.router.navigateByUrl('/login')
        } else {
          this.toaster.showError(resData.message)
        }
      }, err => {
        this.toaster.showError('Invalid Data')
      })
    } else {
      this.toaster.showError('please Enter(*) Required field')
    }
  }

}
