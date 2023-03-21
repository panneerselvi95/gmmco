import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { ShippingAddressComponent } from './shipping-address/shipping-address.component';
import { InitialOrderComponent } from './initial-order/initial-order.component';
import { MyOrderDetailsComponent } from './my-order-details/my-order-details.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { MyOutstandingComponent } from './my-outstanding/my-outstanding.component';
import { PartDetailsComponent } from './part-details/part-details.component';
import { ShippingAddressQuoteComponent } from './shipping-address-quote/shipping-address-quote.component';
import { MyfleetDetailComponent } from './myfleet-detail/myfleet-detail.component';
import { MyAssistantComponent } from './my-assistant/my-assistant.component';

import { LanguagePopupComponent } from './language-popup/language-popup.component';
import { AddressChangeComponent } from './address-change/address-change.component';
import { MyCartComponent } from './my-cart/my-cart.component';
import { PaymentSectionComponent } from './payment-section/payment-section.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { TicketDetailsComponent } from './ticket-details/ticket-details.component';
import { Frame13Component } from './frame13/frame13.component';
import { Frame12Component } from './frame12/frame12.component';
import { TicketDetailsPopupComponent } from './ticket-details-popup/ticket-details-popup.component';
import { MyQuoteComponent } from './my-quote/my-quote.component';
import { AddressFormPopupComponent } from './address-form-popup/address-form-popup.component';
import { CreateNewTicketComponent } from './create-new-ticket/create-new-ticket.component';
import {EquipmentListComponent} from './equipment-list/equipment-list.component';
import { PaymentGatewayComponent } from './payment-gateway/payment-gateway.component';
import { CategoryPartDetail1Component } from './category-part-detail1/category-part-detail1.component';
import { CategoryPartDetail2Component } from './category-part-detail2/category-part-detail2.component';
import { CategoryListAttachmentComponent } from './category-list-attachment/category-list-attachment.component';
import { AuthGuard } from '../services/auth.guard';
import { MyPlanUpcomingComponent } from './my-plan-upcoming/my-plan-upcoming.component';
import { MyPlanHealthComponent } from './my-plan-health/my-plan-health.component';
import {AllContactsComponent} from '../customer/all-contacts/all-contacts.component';
import { ServiceHistroyComponent } from './service-histroy/service-histroy.component';
import { Frame10Component } from './frame10/frame10.component';
import { ReshedulePopupComponent } from './reshedule-popup/reshedule-popup.component';
import { HealthAlertDetailComponent } from './health-alert-detail/health-alert-detail.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { QuoteDetailsComponent } from './quote-details/quote-details.component';
import {MiddleScreenComponent } from './middle-screen/middle-screen.component';
import { SuccessComponent } from './success/success.component';
import { FailureComponent } from './failure/failure.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { OrderpartsListComponent } from './orderparts-list/orderparts-list.component';
import { MyfleetsListComponent } from './myfleets-list/myfleets-list.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { MyFocComponent } from './my-foc/my-foc.component';
import { PaymentGatewayTwoComponent } from './payment-gateway-two/payment-gateway-two.component';
const routes: Routes = [

  { path: '', component: CustomerComponent ,

children:[
  {path:'', redirectTo:'/home', pathMatch:'full'},

  {path:'dashboard',component:DashboardComponent},
  // {path:'shipping-address',component:ShippingAddressComponent},
  {path:'home',component:HomeComponent},

  {path:'initial-orders/:id',component:InitialOrderComponent},
  {path:'my-order-details',component:MyOrderDetailsComponent},
  {path:'my-outstanding',component:MyOutstandingComponent},
  {path:'my-orders',component:MyOrdersComponent},
  {path:'part-details/:partId/:partName',component:PartDetailsComponent},
  {path:'shipping-address-quote',component: ShippingAddressQuoteComponent},
  {path:'my-fleet-details',component: MyfleetDetailComponent},
  {path:'my-assistant',component: MyAssistantComponent},

  {path:'language-popup',component: LanguagePopupComponent},
  {path:'address-change',component: AddressChangeComponent},
  {path:'my-cart',component: MyCartComponent},
  {path:'payment-section',component: PaymentSectionComponent},
  {path:'my-profile',component: MyProfileComponent},
  {path:'ticket-details/:id',component: TicketDetailsComponent},
  {path:'frame13',component: Frame13Component},
  {path:'frame12',component: Frame12Component},
  {path:'ticket-details-popup',component: TicketDetailsPopupComponent},
  {path:'my-quote',component: MyQuoteComponent},
  {path:'address-form-popup',component: AddressFormPopupComponent},
  {path:'create-new-ticket/:id1/:id2/:id3',component: CreateNewTicketComponent},

  {path:'payment-gateway',component: PaymentGatewayComponent},
  {path:'category-part-detail1',component: CategoryPartDetail1Component},
  {path:'category-part-detail2',component: CategoryPartDetail2Component},
  {path:'category-list-attachment/:id1/:id2',component: CategoryListAttachmentComponent},

  {path:'my-plan-upcoming',component: MyPlanUpcomingComponent},
  {path:'my-plan-health',component: MyPlanHealthComponent},
  {path: 'my-equipment' , component: EquipmentListComponent},

  {path:'service-histroy/:id',component: ServiceHistroyComponent},
  {path:'frame10',component: Frame10Component},
  {path:'reshedule-popup',component: ReshedulePopupComponent},
  {path:'health-alert-detail',component: HealthAlertDetailComponent},
  {path:'all-contacts',component:AllContactsComponent},
  {path:'quote-details/:id', component: QuoteDetailsComponent},
  {path:'user-list-screen', component: MiddleScreenComponent},
  {path:'success', component:SuccessComponent},
  {path:'failure', component:FailureComponent},
  {path:'order-confirmation', component:OrderConfirmationComponent},
  {path:'order-listings',component:OrderpartsListComponent},
  {path:'myfleets-listings',component:MyfleetsListComponent},
  {path:'manage-rights', component:ManageUsersComponent},
  {path:'valid-foc', component:MyFocComponent},
  {path:'payment-gateway-two', component:PaymentGatewayTwoComponent},
  {path:'registration' , component:RegistrationComponent},
],

},
];

@NgModule({
  imports: [RouterModule.forChild(routes), NgxMaskModule.forRoot(),
  ],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
