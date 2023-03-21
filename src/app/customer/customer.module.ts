import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import {DpDatePickerModule} from 'ng2-date-picker';

import { RegistrationComponent } from './registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ShippingAddressComponent } from './shipping-address/shipping-address.component';
import { InitialOrderComponent } from './initial-order/initial-order.component';

import { NgxGalleryModule } from '@kolkov/ngx-gallery';
// import {AccordionModule} from '@andreagrossetti/ngx-accordion';
import { AccordionModule } from "ngx-accordion";

import { AngularFileUploaderModule } from "angular-file-uploader";
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { MyOrderDetailsComponent } from './my-order-details/my-order-details.component';
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
import { PaymentGatewayComponent } from './payment-gateway/payment-gateway.component';
import { CategoryPartDetail1Component } from './category-part-detail1/category-part-detail1.component';
import { CategoryPartDetail2Component } from './category-part-detail2/category-part-detail2.component';
import { CategoryListAttachmentComponent } from './category-list-attachment/category-list-attachment.component';
import { MyPlanUpcomingComponent } from './my-plan-upcoming/my-plan-upcoming.component';
import { MyPlanHealthComponent } from './my-plan-health/my-plan-health.component';
import { ServiceHistroyComponent } from './service-histroy/service-histroy.component';
import { Frame10Component } from './frame10/frame10.component';
import { ReshedulePopupComponent } from './reshedule-popup/reshedule-popup.component';
import { HealthAlertDetailComponent } from './health-alert-detail/health-alert-detail.component';
import { AllContactsComponent } from './all-contacts/all-contacts.component';
import { EquipmentListComponent } from './equipment-list/equipment-list.component';
import { QuoteDetailsComponent } from './quote-details/quote-details.component';
import { MiddleScreenComponent } from './middle-screen/middle-screen.component';
import { SuccessComponent } from './success/success.component';
//new BY Seeni
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { FailureComponent } from './failure/failure.component';
import { OrderConfirmationComponent } from './order-confirmation/order-confirmation.component';
import { MyfleetsListComponent } from './myfleets-list/myfleets-list.component';
import { OrderpartsListComponent } from './orderparts-list/orderparts-list.component';

import { DateTimePickerModule } from '@syncfusion/ej2-angular-calendars';
import { SharedModuleModule } from '../shared/shared-module/shared-module.module';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { MyFocComponent } from './my-foc/my-foc.component';
import { PaymentGatewayTwoComponent } from './payment-gateway-two/payment-gateway-two.component';
//new BY Seeni
// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    CustomerComponent,
    DashboardComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ShippingAddressComponent,
    InitialOrderComponent,
    MyOrdersComponent,
    MyOrderDetailsComponent,
    MyOutstandingComponent,
    PartDetailsComponent,
    ShippingAddressQuoteComponent,
    MyfleetDetailComponent,
    MyAssistantComponent,
    LanguagePopupComponent,
    AddressChangeComponent,
    MyCartComponent,
    PaymentSectionComponent,
    MyProfileComponent,
    TicketDetailsComponent,
    Frame13Component,
    Frame12Component,
    TicketDetailsPopupComponent,
    MyQuoteComponent,
    AddressFormPopupComponent,
    CreateNewTicketComponent,
    PaymentGatewayComponent,
    CategoryPartDetail1Component,
    CategoryPartDetail2Component,
    CategoryListAttachmentComponent,
    MyPlanUpcomingComponent,
    MyPlanHealthComponent,
    ServiceHistroyComponent,
    Frame10Component,
    ReshedulePopupComponent,
    HealthAlertDetailComponent,
    AllContactsComponent,
    EquipmentListComponent,
    QuoteDetailsComponent,
    MiddleScreenComponent,
    SuccessComponent,
    FailureComponent,
    OrderConfirmationComponent,
    MyfleetsListComponent,
    OrderpartsListComponent,
    ManageUsersComponent,
    MyFocComponent,
    PaymentGatewayTwoComponent
  ],
  imports: [
    SharedModuleModule,
    CommonModule,
    NgbModule,
    CustomerRoutingModule,
    NgxGalleryModule ,
    AccordionModule,
    AngularFileUploaderModule,
    ReactiveFormsModule,
    FormsModule,
    DpDatePickerModule,
    DateTimePickerModule ,
    //new BY Seeni
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers:[
    NgbActiveModal
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class CustomerModule { }
