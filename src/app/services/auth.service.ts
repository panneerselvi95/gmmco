import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl: string;
  tokenFromUI: string = 'GnxUFjKw9(bk7Ay$';
  encrypted: any = '';
  decrypted: any;

  request: any;
  responce: any;


  constructor(private http:HttpClient) {

    this.baseUrl = environment.baseUrl;


  }
  // getAuthStatus(){
  //   if(sessionStorage.getItem('token')){
  //     return true
  //   }else{
  //     return false
  //   }
  // }

  isLoggedIn(){
    if(sessionStorage.getItem('token')){
      return true
    }else{
      return false
    }
  }


  _Login(loginObj:any){
    return this.http.post(this.baseUrl+'CustomerAccount/CustomerLogin',loginObj);
  }
  _Register(regObj:any){
    return this.http.post(this.baseUrl+'CustomerAccount/RegisterUser',regObj);
  }

  _SetUser(setObj:any){
    return this.http.post(this.baseUrl+'CustomerAccount/SetUserCustomercode',setObj);
  }


  // _SetUser(data:any){
  //   return this.http.post(this.baseUrl+'CustomerAccount/SetUserCustomercode',data);
  // }
  _Verify_Customer(verifyObj:any){
    return this.http.post(this.baseUrl+'CustomerAccount/VerifyCustomer',verifyObj)

  }
  _Otp_Send(otpObj:any){
    return this.http.post(this.baseUrl+'CustomerAccount/ResendOTP',otpObj)
  }
  _Forgot_Password(resetObj:any){
    return this.http.post(this.baseUrl+'CustomerAccount/ForgetPassword',resetObj)
  }



_LogOut(mobile:any,pan:any){

  let obj:any = {
    "mobile": this.encryptUsingAES256(mobile),
    "pannumber": this.encryptUsingAES256(pan)
  }
  return this.http.post(this.baseUrl+'CustomerAccount/Logout',obj)
}

  encryptUsingAES256(request:any) {

let encryptesText:any;

    let _key = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    let _iv = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    let encrypted = CryptoJS.AES.encrypt(JSON.stringify(request), _key, {
      keySize: 16,
      iv: _iv,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    });
          encryptesText= encrypted.toString();
          return encryptesText;
  }
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
