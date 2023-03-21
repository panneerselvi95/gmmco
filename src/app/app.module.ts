import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule,ReactiveFormsModule  } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { LoginVerificationComponent } from './login-verification/login-verification.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RegistrationComponent } from './registration/registration.component';


import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from "ngx-spinner";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenAuthInterceptor } from './customer/_middleware/token-auth.interceptor';
import { HttpErrorInterceptor } from './customer/_middleware/http-error.interceptor';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { CustomerModule } from './customer/customer.module';
import { initializeApp } from 'firebase/app';
// import { getAnalytics } from "firebase/analytics";
import {FireAnalyticsService} from './shared/fire-analytics.service'
import * as firebase from 'firebase/app';
import 'firebase/analytics';
import { getAnalytics, logEvent } from "firebase/analytics";
import { environment } from 'src/environments/environment';

// const firebaseConfig = {
//   apiKey: "AIzaSyA2cSHT87PjISQBDuWeDFL4TLyxDLQmInY",
//   authDomain: "gmmco-assist.firebaseapp.com",
//   projectId: "gmmco-assist",
//   storageBucket: "gmmco-assist.appspot.com",
//   messagingSenderId: "692044357098",
//   appId: "1:692044357098:web:43cbaf0188ee50d7106693",
//   measurementId: "G-X9XL0NP2RS"
// };
const firebaseConfig = {
  apiKey: "AIzaSyA2cSHT87PjISQBDuWeDFL4TLyxDLQmInY",
  authDomain: "gmmco-assist.firebaseapp.com",
  projectId: "gmmco-assist",
  storageBucket: "gmmco-assist.appspot.com",
  messagingSenderId: "692044357098",
  appId: "1:692044357098:web:43cbaf0188ee50d7106693",
  measurementId: "G-X9XL0NP2RS"
};
//** Firebase init  */
// const app = initializeApp(environment.firebase);
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NoPageFoundComponent,
    LoginVerificationComponent,
    ResetPasswordComponent, 
    RegistrationComponent,
 
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
  FormsModule,
  ReactiveFormsModule,
  BrowserAnimationsModule,
  HttpClientModule,
  ToastrModule.forRoot(),
  NgxSpinnerModule,
  CustomerModule,
  // AccordionModule,
  
   TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
   
  ],
  exports:[
    
    FormsModule,
    ReactiveFormsModule,
    // AccordionModule,
    ToastrModule,
    // TranslateModule

  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenAuthInterceptor,
    multi: true
  }, {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpErrorInterceptor,
    multi: true
  },
  FireAnalyticsService
  
],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  
})
export class AppModule { }

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}
