import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { delay, finalize } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

@Injectable()
export class TokenAuthInterceptor implements HttpInterceptor {

  constructor(private spinner: NgxSpinnerService) {}

 
intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {

let env:any = environment.baseUrl;



  let s1:any = request.url.split('/')
  
  let s2:any =  s1[5]?.toString().split('?')[0];
  console.log("im interceptor",s1,s2)
console.log("base url", request.url);
 
if(s2 != 'GlobalSearch'){
  this.spinner.show();

}



  
  // console.log("condition ", request.url == 'https://uat-customer.gmmco.in/api/Parts/GlobalSearch?SearchKey=' );
  // if (!condition) {
  // this.spinner.show();
  // }
  debugger;
  const token = localStorage.getItem('token');
  if(token != null){
  request = request.clone({headers : request.headers.set('Authorization','bearer '+ token)})
  }
  
  // return next.handle(request);
  return next.handle(request).pipe(
  // delay(2000),
  finalize(() =>
  // console.log("hide spinner")
  this.spinner.hide()
  ))
  }
}
