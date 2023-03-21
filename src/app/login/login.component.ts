import { Component, EventEmitter, OnInit, Output, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import * as CryptoJS from 'crypto-js';

import { AuthService } from '../services/auth.service';
declare var $: any;
import { ToastService } from '../services/toastr.service';
import { FleetService } from 'src/app/services/fleet.service';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';
import { FireAnalyticsService } from '../shared/fire-analytics.service';

import { getAnalytics, logEvent } from "firebase/analytics";
import { NgbActiveModal, NgbModal, NgbModalRef, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';

// const analytics = getAnalytics();
// logEvent(analytics, 'screen_view', {
//   firebase_screen: 'LoginComponent', 
//   firebase_screen_class: 'LoginComponent'
// });
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  @ViewChild('mymodal') mymodal!: ElementRef;
  @ViewChild('mymodal2') mymodal2!: ElementRef;

  loginForm!: FormGroup;
  otpSuccess: boolean = false;
  languageName: string;
  langname: any;
  @Output() valueChange = new EventEmitter();
  password: any = "password";
  show: boolean = false;
  envVar: any;
  value: any;
  revalue: boolean = false;
  Setvalue: boolean = false;
  currentCustomerId: any;
  setusers: any;
  constructor(
    private login: FireAnalyticsService,
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private router: Router,
    private activateroute: ActivatedRoute,
    private auth: AuthService,
    private toaster: ToastService,
    private fleetservice: FleetService,
    private translate: TranslateService,
    private modalRef: NgbActiveModal,
    private modalService: NgbModal
  ) {



    translate.addLangs(['en']);
    translate.setDefaultLang(sessionStorage.getItem('lang') || 'en');
    this.languageName = sessionStorage.getItem('langName') || 'English';
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    this.langname = sessionStorage.getItem('lang')
    this.useLanguage(this.languageName);
    this.envVar = environment;


  }
  useLanguage(language: string): void {
    this.translate.use(language);
    this.valueChange.emit(language)
  }
  ngOnInit(): void {

    this.currentCustomerId = sessionStorage.getItem('id');
    this._get_Dropdownlist()
    this.createForm()
    this._getEnKeys()

    // this.useLanguage('Tamil')
    $(document).ready(function () {
      $(".form-control input").keyup(function () {
        if (($('.form-control').val() != "")) {
          $('.form-control').addClass('typed');
        }
        else {
          $('.form-control').removeClass('typed');
        }
      });
    });

    if (sessionStorage.getItem('id')) {
      this.router.navigateByUrl('/customer/home')
    }
    // this.GAevent()

    // setTimeout(() => {
    //   this.open(this.mymodal);
    // }, 0); 
  }

  ngAfterViewInit() {
    const analytics = getAnalytics();

    logEvent(analytics, 'Front End Screen Views', {
      firebase_screen: 'Login Page',
      firebase_screen_class: 'Login Page'
    })
  }
  // GAevent(){
  //   this.login.logEvents('notification_received',window.location.pathname)

  // }
  clicktooglePassword() {
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }
  // new update req
  _getEnKeys() {
    this.fleetservice._getEnKey().subscribe((data) => {
      console.log("EnKey", data)
    })
  }
  panValidation(event: Event) {
    // const Eve = event.target as HTMLInputElement;
    // this.revalue = false;
    // if (Eve.value.length >= 6) {
    //   var regex = /([A-Z]){5}$/;
    //   this.revalue = regex.test(Eve.value)
    //   console.log(Eve.value.length, "IF")
    // }
    // else if (Eve.value.length >= 7) {

    //   var regex = /([A-Z]){5}([0-9]){4}$/;
    //   this.revalue = regex.test(Eve.value)
    //   console.log(Eve.value.length, "ELSE IF")
    // } else if (Eve.value.length >= 11) {
    //   var regex = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
    //   this.revalue = regex.test(Eve.value)
    //   console.log(Eve.value.length, "2ND if")
    // }
    // else {

    // }

    let pan = this.loginForm.value;
    const regexp = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
    let check = regexp.test(pan);
  }

  createForm() {
    this.loginForm = this.formBuilder.group({
      mobileNo: ['', [Validators.required, Validators.minLength(10)]],
      panNumber: ['', [Validators.required, Validators.minLength(10), Validators.pattern(/^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$/)]],
      // , Validators.pattern(/^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$/)
      password: new FormControl(''),
      otp: new FormControl(''),
      loginType: new FormControl('Password'),
      platform: new FormControl('Web'),
      version: new FormControl(''),

    });
  }
  get f() { return this.loginForm.controls; }

  loginFuncForOtp() {
    console.log(this.loginForm.value)
    let loginOBJ = {
      "userData": {
        "mobileNo": this.auth.encryptUsingAES256(this.loginForm.value.mobileNo),
        "panNumber": this.auth.encryptUsingAES256(this.loginForm.value.panNumber)
      },

      "password": this.auth.encryptUsingAES256(this.loginForm.value.Password),
      "loginType": 'OTP',
      "appDetails": {
        "platform": 'web',
        "version": ''
      },
    }
    // debugger
    if (loginOBJ.userData.mobileNo && loginOBJ.userData.panNumber) {
      this.auth._Login(loginOBJ).subscribe((data: any) => {

        if (data.isSuccess == true) {
          // debugger;

          this.otpSuccess = true;

          this.toaster.showSuccess('sent otp to your registered mobile number  ' + this.phoneNoMask(this.loginForm.value.mobileNo))
        } else {
          this.toaster.showError(data.message)
        }
      })
    } else {
      this.toaster.showError('please enter(*)required fields')
    }
  }
  modalClose() {
    this.modalRef.close()
    this.router.navigateByUrl("/reset");

  }
  loginFun() {
    console.log(this.loginForm.value, "ranjith")
    let loginOBJ = {
      "userData": {
        "mobileNo": this.auth.encryptUsingAES256(this.loginForm.value.mobileNo),
        "panNumber": this.auth.encryptUsingAES256(this.loginForm.value.panNumber),
        "deviceType": "string",
        "deviceModel": "string",
        "osVersion": "string",
        "deviceToken": "string"
      },
      "password": this.auth.encryptUsingAES256(this.loginForm.value.password),
      "loginType": this.loginForm.value.loginType,
      "appDetails": {
        "platform": 'web',
        "version": ''
      },

    }

    if (loginOBJ.userData.mobileNo && loginOBJ.userData.panNumber && loginOBJ.password) {

      this.auth._Login(loginOBJ).subscribe(((data: any) => {
        console.log(Number(sessionStorage.getItem('id')), "nums")
        if (data.isSuccess == true) {

          sessionStorage.setItem('pan', this.loginForm.value.panNumber);
          sessionStorage.setItem('mob', this.loginForm.value.mobileNo);
          // sessionStorage.setItem('token' , this.loginForm.value.panNumber) ;
          // console.log(sessionStorage.getItem('token'));

          // new req
          if (data.response[0].isComply == false) {
            this.open(this.mymodal);
            return;
          }
          else if (data.response[0].isexpired == true) {
            this.open(this.mymodal2);
            return;

          }
          if (data.response.length > 1) {
            sessionStorage.setItem('id', data.response[0].custcode)
            sessionStorage.setItem('name', window.btoa(data.response[0].custName))
            sessionStorage.setItem('userlist', JSON.stringify(data.response));
            sessionStorage.setItem('screens', data.response[0]['screens'])
            this.router.navigateByUrl('customer/user-list-screen');

          }

          //
          else {

            // console.log(setObj , "setObj")

            // console.log(sessionStorage.getItem('id') , "setset");
            sessionStorage.setItem('id', data.response[0].custcode)
            sessionStorage.setItem('name', window.btoa(data.response[0].custName))
            sessionStorage.setItem('userlist', JSON.stringify(data.response));
            sessionStorage.setItem('screens', data.response[0]['screens'])
            let setObj = {
              "ccode": Number(sessionStorage.getItem('id')),
              // "pannumber": sessionStorage.getItem('pan'),
              // "mobile": sessionStorage.getItem('mob') ,
              "pannumber": this.auth.encryptUsingAES256(sessionStorage.getItem('pan')),
              "mobile": this.auth.encryptUsingAES256(sessionStorage.getItem('mob')),
              "mode": "Web",
              "version": "0"
            }
            console.log(setObj, "setObj")
            localStorage.setItem('token', data.response[0]['token']);
            console.log(localStorage.getItem('token'), "token_token");
            this.toaster.showSuccess('Login Successfully');
            // this.Setvalue = true;
            this.auth._SetUser(setObj).subscribe(
              (data: any) => {
                this.setusers = data;

                if (data.isSuccess == true) {
                  this.router.navigateByUrl('/customer/home')
                }
                else {
                  this.router.navigateByUrl('/login')
                }
              }
            )


            /* 
            if(this.Setvalue){
              setTimeout(() => {
                this.auth._SetUser(setObj).subscribe(
                  (data:any)=>{
                    this.setusers = data;
    
                    if(data.isSuccess == true){
                      this.router.navigateByUrl('/customer/home')
                    }
                    else{
                      this.router.navigateByUrl('/login')
                    }
                  }
                )
              }, 2000);
            } */
            // this.SetUser();
            // this.router.navigateByUrl('/customer/home')
          }

        } else {
          this.toaster.showError(data.message)
        }

      }))
    } else {
      this.toaster.showError('please enter (*) required fields')
    }
  }

  // SetUser(){
  //   console.log("hifshdiu")
  //   let setObj = {
  //     "ccode": Number(sessionStorage.getItem('id')),
  //     "pannumber": sessionStorage.getItem('pan'),
  //     "mobile": sessionStorage.getItem('mob') ,
  //     "mode": "Web",
  //     "version": "1.5" 
  //   }
  //   console.log(setObj , "setObj")
  //   this.auth._SetUser(setObj).subscribe(
  //     (data:any)=>{
  //       this.setusers = data;
  //       console.log(this.setusers , "setusers")
  //     }
  //   )
  // }

  _get_Dropdownlist() {
    this.fleetservice._get_requestDropdowm().subscribe((data: any) => {

      sessionStorage.setItem('dropdown', JSON.stringify(data.response))
      // this.requestList = data.response;
    })
  }

  otpVerification() {

    console.log(this.loginForm.value)
    let otpObj = {
      "userData": {
        "mobileNo": this.auth.encryptUsingAES256(this.loginForm.value.mobileNo),
        "panNumber": this.auth.encryptUsingAES256(this.loginForm.value.panNumber),
        "deviceModel": "string",
        "osVersion": "string",
      },
      "otp": this.loginForm.value.otp
    }
    if (otpObj.userData.mobileNo && otpObj.userData.panNumber && otpObj.otp) {
      this.auth._Verify_Customer(otpObj).subscribe((data: any) => {
        // debugger
        let nullHandeling = (data.response[0]['screens'] == null) ? "" : data.response[0]['screens'] ;
        sessionStorage.setItem('screens', nullHandeling)
        sessionStorage.setItem('userlist', JSON.stringify(data.response));
        // if (data.isSuccess == true) {
        //   sessionStorage.setItem('id', data.response.custcode)
        //   sessionStorage.setItem('name', window.btoa(data.response.custName))
        //   this.toaster.showSuccess('Login Successfully');
        //   this.router.navigateByUrl('/customer/home')
        // } else {
        //   this.toaster.showError('Invalid credentials')
        // }

        debugger;

        if (data.isSuccess == true) {
          localStorage.setItem('token', data.response[0]['token']);
          console.log(data.response[0]['token'], "token_token2");
          sessionStorage.setItem('pan', this.loginForm.value.panNumber);
          sessionStorage.setItem('mob', this.loginForm.value.mobileNo);
          if (data.response.length > 1) {
            sessionStorage.setItem('id', data.response[0].custcode)
            sessionStorage.setItem('name', window.btoa(data.response[0].custName))
            sessionStorage.setItem('userlist', JSON.stringify(data.response));
            this.router.navigateByUrl('customer/user-list-screen')
            // this.router.navigateByUrl('/customer/home')
          }
          //
          else {
            sessionStorage.setItem('id', data.response[0].custcode)
            sessionStorage.setItem('name', window.btoa(data.response[0].custName))
            this.toaster.showSuccess('Login Successfully');
            this.router.navigateByUrl('/customer/home')
          }

        } else {
          this.toaster.showError(data.message)

        }
      })
    } else {
      this.toaster.showError('please enter(*) required field')
    }
  }

  sendOtp() {
    this.loginForm.controls.otp.patchValue('');
    let otpObj = {
      "userData": {
        "mobileNo": this.auth.encryptUsingAES256(this.loginForm.value.mobileNo),
        "panNumber": this.auth.encryptUsingAES256(this.loginForm.value.panNumber),
        "loginType": 'OTP',
      },
      "appDetails": {
        "platform": '',
        "version": ''
      },
    };
    if (otpObj.userData.mobileNo != "" && otpObj.userData.panNumber != "") {
      this.auth._Otp_Send(otpObj).subscribe((data: any) => {
        if (data.isSuccess == true) {
          this.toaster.showSuccess('OTP Sent Successfully')
        } else {
          this.toaster.showError('Invalid Details')
        }
      })
    } else {
      this.toaster.showError('please enter(*) required field')
    }
  }

  _route_reset() {
    if (this.loginForm.value.mobileNo && this.loginForm.value.panNumber) {
      sessionStorage.setItem('password_reset', JSON.stringify({
        phoneNo: this.loginForm.value.mobileNo,
        panNo: this.loginForm.value.panNumber,
        
      }))
     
      this.router.navigateByUrl("/reset");
    } else {
      this.toaster.showError('Please enter Phone Number & Pan Number fields')
    }
  }


  phoneNoMask(char: any) {
    let chars: any = char.slice(char.length - 4);
    return 'XXXX-XX-' + chars
  }

  close() {
    this.modalRef.close();
  }

  open(content: any) {

    this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true });
  }

  // encryptUsingAES256() {
  //   let _key = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
  //   let _iv = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
  //   let encrypted = CryptoJS.AES.encrypt(JSON.stringify(this.request), _key, {
  //     keySize: 16,
  //     iv: _iv,
  //     mode: CryptoJS.mode.ECB,
  //     padding: CryptoJS.pad.Pkcs7,
  //   });
  //   this.encrypted = encrypted.toString();
  // }
  // decryptUsingAES256() {
  //   let _key = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
  //   let _iv = CryptoJS.enc.Utf8.parse(this.tokenFromUI);

  //   this.decrypted = CryptoJS.AES.decrypt(this.encrypted, _key, {
  //     keySize: 16,
  //     iv: _iv,
  //     mode: CryptoJS.mode.ECB,
  //     padding: CryptoJS.pad.Pkcs7,
  //   }).toString(CryptoJS.enc.Utf8);
  // }




}
