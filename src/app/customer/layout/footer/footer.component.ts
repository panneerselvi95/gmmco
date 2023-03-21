import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd   } from '@angular/router';
import { environment } from 'src/environments/environment';
import { filter } from 'rxjs/operators';
import { getAnalytics, logEvent } from 'firebase/analytics';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  envVar:any;
  currentRoute: string = '';
  constructor(private router:Router) {  this.envVar = environment
    
    router.events.pipe(filter((event: any) => event instanceof NavigationEnd)
    ).subscribe((event: any) => 
           {
              this.currentRoute = event.url;          
              console.log(' this.currentRoute',  this.currentRoute);
           });
  }
  ngOnInit(): void {
    this.add_chatinline();
  }
  add_chatinline(){
    // debugger;
    var hccid=23609840;
    var nt=document.createElement("script");
    nt.async=true;
    nt.src="https://mylivechat.com/chatinline.aspx?hccid="+hccid;var ct=document.getElementsByTagName("script")[0];
    ct.parentElement?.insertBefore(nt,ct)
    // ct.parentNode.insertBefore(nt,ct);
    let pageName = '';
    if (this.currentRoute == '/customer/my-fleet-details') {
      pageName = 'My Fleet Details Page';
    } else if(this.currentRoute == '/customer/home'){
      pageName = 'Home Page';
    }
    else if(this.currentRoute == '/customer/address-change'){
      pageName = 'Address Change Page'
    }
    else if(this.currentRoute == '/customer/address-form-popup'){
      pageName = 'Address Form Popup Page'
    }
    else if(this.currentRoute == '/customer/all-contacts'){
      pageName ='All Contacts page'
    }
    else if(this.currentRoute == '/customer/category-list-attachment/:id1/:id2')
    {
      pageName = 'Category List Attachment Page';
    }
    else if(this.currentRoute == '/customer/category-part-detail1'){
      pageName = 'Category Part Detail_1'
    }
    else if(this.currentRoute == '/customer/category-part-detail2'){
      pageName = 'Category Part Detail_2'
    }
    else if(this.currentRoute == '/customer/create-new-ticket/:id1/:id2/:id3'){
      pageName = 'Create New Ticket'
    }
    else if(this.currentRoute == '/customer/dashboard'){
      pageName = 'Dashboard';
    }
    else if(this.currentRoute == '/customer/my-equipment'){
      pageName = 'Equipment List Page'
    }
    else if(this.currentRoute == '/customer/failure'){
      pageName = 'Payment Failure Page'
    }
    else if(this.currentRoute == '/customer/frame10'){
      pageName = 'Frame10 Page'
    }
    else if(this.currentRoute == '/customer/frame12'){
      pageName = 'Frame12 Component Page'
    }
    else if(this.currentRoute == '/customer/frame13'){
      pageName = 'Frame13 Component Page'
    }
    // d
    else if(this.currentRoute == '/customer/health-alert-detail'){
      pageName = 'Health Alert Detail Page'
    }
    else if(this.currentRoute == '/customer/initial-orders/:id'){
      pageName = 'Initial Order Page'
    }
    else if(this.currentRoute == '/customer/language-popup'){
      pageName = 'Language Page'
    }
    else if(this.currentRoute == '/customer/manage-rights'){
      pageName = 'Manage Users Page'
    }
    else if(this.currentRoute == '/customer/user-list-screen'){
      pageName = 'Organization Selection Page'
    }
    else if(this.currentRoute == '/customer/my-assistant'){
      pageName = 'MyAssistant Page'
    }
    else if(this.currentRoute == '/customer/my-cart'){
      pageName = 'MyCart Page'
    }
    else if(this.currentRoute == '/customer/valid-foc'){
      pageName = 'MyFoc Page'
    }
    else if(this.currentRoute == '/customer/my-order-details'){
      pageName = 'MyOrder Details Page'
    }
    else if(this.currentRoute == '/customer/my-orders'){
      pageName = 'MyOrders Page'
    }
    else if(this.currentRoute == '/customer/my-outstanding'){
      pageName = 'My Outstanding Page'
    }
    else if(this.currentRoute == '/customer/my-plan-health'){
      pageName = 'My Plan Health Page'
    }
    else if(this.currentRoute == '/customer/my-plan-upcoming'){
      pageName = 'My Plan Upcoming Page'
    }
    else if(this.currentRoute == '/customer/my-profile'){
      pageName = 'My Profile Page'
    }
    else if(this.currentRoute == '/customer/my-quote'){
      pageName = 'My Quote Page'
    }
    else if(this.currentRoute == '/customer/myfleets-listings'){
      pageName = 'My fleets List Page'
    }
    else if(this.currentRoute == '/customer/order-confirmation'){
      pageName = 'Order Confirmation Page'
    }

    else if(this.currentRoute == '/customer/order-listings'){
      pageName = 'Order Parts List Page'
    }
    else if(this.currentRoute == '/customer/part-details/:partId/:partName'){
      pageName = 'Part Details Page'
    }
    else if(this.currentRoute == '/customer/payment-gateway'){
      pageName = 'Payment Gateway'
    }
    else if(this.currentRoute == '/customer/payment-gateway-two'){
      pageName = 'Payment Gateway Two'
    }
    else if(this.currentRoute == '/customer/payment-section'){
      pageName = 'Payment Section'
    }
    else if(this.currentRoute == '/customer/quote-details/:id'){
      pageName = 'Quote Details'
    }
    else if(this.currentRoute == '/customer/registration'){
      pageName = 'Registration'
    }
    else if(this.currentRoute == '/customer/reshedule-popup'){
      pageName = 'Reshedule Popup'
    }
    else if(this.currentRoute == '/customer/service-histroy/:id'){
      pageName = 'Service Histroy'
    }
    else if(this.currentRoute == '/customer/shipping-address'){
      pageName = 'Shipping Address'
    }
    else if(this.currentRoute == '/customer/shipping-address-quote'){
      pageName = 'Shipping Address'
    }
    else if(this.currentRoute == '/customer/success'){
      pageName = 'Payment Success'
    }
    else if(this.currentRoute == '/customer/ticket-details/:id'){
      pageName = 'Ticket Details'
    }
    else if(this.currentRoute == '/customer/ticket-details-popup'){
      pageName = 'Ticket Details Popup'
    }
    else if(this.currentRoute == '/login'){
      pageName = 'Login'
    }
    else if(this.currentRoute == '/login-verify'){
      pageName = 'Login Verification'
    }
    else if(this.currentRoute == '/**'){
      pageName = 'No Page Found'
    }
    else if(this.currentRoute == '/register'){
      pageName = 'Registration'
    }
    else if(this.currentRoute == '/reset'){
      pageName = 'Reset Password'
    }
    // else if(this.currentRoute == '')

    const analytics = getAnalytics();
      logEvent(analytics,'Front End Screen Views',{
        firebase_screen: `${pageName} To Chat Screen`, 
      firebase_screen_class: `${pageName} To Chat Screen`
      })
    
    }
}
