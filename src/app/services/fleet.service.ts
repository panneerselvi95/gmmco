import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})

export class FleetService {
  Get_FocPart() {
    throw new Error('Method not implemented.');
  }
  baseUrl!: string;

  constructor(private http: HttpClient) { this.baseUrl = environment.baseUrl; }

  _split_char(c: any) { let matId: any = c.split(':'); return matId };
  _fleet_list(id: number) { return this.http.post(this.baseUrl + 'CustomerAccount/Fleet?Customercode=' + id, {}) };
  _get_OutStandVal(id: number) { return this.http.get(this.baseUrl + 'CustomerAccount/CCustoutstandSet?Customercode=' + id) };
  _get_myFleetDetails(fleetImgId: any) { return this.http.get(this.baseUrl + 'Parts/PartsCategoryImages?serialNo=' + fleetImgId) };
  _get_FleetParts_details(materialId: any, customerid: any) { return this.http.get(this.baseUrl + 'Parts/OrderParts?MaterialNo=' + this._split_char(materialId)[0] + '&SourceSupply=' + this._split_char(materialId)[1] + '&CustId=' + customerid + '') };




  _get_EstimateFleetPriceValue(materialno: any, sourceofsupply: any, quantity: any, todaydate: any) {
    let ccode: any = sessionStorage.getItem('id')
    return this.http.get(this.baseUrl + 'Parts/PartsDetails?MaterialNo=' + materialno + '&Sourcesupply=' + sourceofsupply + '&PricingValidon=' + todaydate + '&Quantity=' + quantity + '&ShipTo=' + ccode + '&SoldTo=' + ccode + '&BillTo=' + ccode + '&Division=0&DistChannel=10')
  }

  _get_focPartsDetails(materialno: any, sourceofsupply: any, quantity: any, todaydate: any) {
    let ccode: any = sessionStorage.getItem('id')
    return this.http.get(this.baseUrl + 'Parts/focPartsDetails?MaterialNo=' + materialno + '&Sourcesupply=' + sourceofsupply + '&PricingValidon=' + todaydate + '&Quantity=' + quantity + '&ShipTo=' + ccode + '&SoldTo=' + ccode + '&BillTo=' + ccode + '&Division=0&DistChannel=10')
  }





  _pm_schedule_summary(obj: object) { return this.http.post(this.baseUrl + 'CRM/PMSheduleSummury', obj) };
  _assitant_TicketSummary(summaryobj: object) { return this.http.post(this.baseUrl + 'CRM/TrackTicketSummury', summaryobj) }
  _assitant_TicketDetails(id: any) { return this.http.get(this.baseUrl + 'CRM/GetTrackTicketDetails?reference_number=' + id) }
  _get_id(id: any) { if (id) id = id.padStart(10, '0'); console.log(id, "IDDDDDDDDDDD"); return id; }

  // get salutation & region dropdown
  _get_salutation_region(obj: any) { return this.http.post(`${this.baseUrl}CustomerAccount/RegionandTitle?Type=${obj}`, {}) }
  // add address
  _add_address(obj: any) { return this.http.post(this.baseUrl + 'CustomerAccount/AddCustomerAddress', obj) }
  // view address
  _getEnKey() { return this.http.post(this.baseUrl + 'CustomerAccount/Enckey', {}) }
  // https://uat-customer.gmmco.in/api/CustomerAccount/Enckey
  _view_address(obj: any) { return this.http.post(`${this.baseUrl}CustomerAccount/AllAddress?CustCode=${obj}`, {}) }
  //Ticket
  _create_ticket(ticketobj: any) { return this.http.post(this.baseUrl + 'CRM/CreateTicket?Custcode=' + sessionStorage.getItem('id'), ticketobj) }
  //dropdown
  _get_requestDropdowm() { return this.http.post(this.baseUrl + 'CRM/ServiceRequestType', {}) }
  //FOC
  _get_requestFoc(data: any) { return this.http.post(this.baseUrl + 'CustomerAccount/FOCDerivative?soldparty=' + sessionStorage.getItem('id') + '&orderreason=' + data.orderreason, {}) }
  //My Foc
  _get_myFOC(data: any) { return this.http.post(this.baseUrl + 'CustomerAccount/FOCListing?soldparty='+ sessionStorage.getItem('id') + '&orderreason=' + data.orderreason, {}) }
  // Valid FOC
  _get_validFOC(data: any) { return this.http.post(this.baseUrl +'CustomerAccount/FOCValid?soldparty='+sessionStorage.getItem('id') +'&orderreason='+data.orderreason +'&CCode='+data.CCode +'&CartValue='+data.CartValue, {}) }
  // foc get material update
  _get_foc_getmaterial_price(data: any) { return this.http.post(this.baseUrl + 'CustomerAccount/FOCGetmaterialUpdatedPrice?ccode= ' + sessionStorage.getItem('id'), {}) }
    // foc crete order
  _get_forCreateOrder(obj: object) { return this.http.post(this.baseUrl + 'CustomerAccount/FocCreateOrder', obj) };

  // cartExclusion
  _get_cartExclusion(data: any) { return this.http.post(this.baseUrl + 'CustomerAccount/cartExclusion?CustCode=' + sessionStorage.getItem('id'), {}) }


  
  // non foc get material update

  _get_nonfoc_getmaterial_price(data: any) { return this.http.post(this.baseUrl +'CustomerAccount/NonFOCGetmaterialUpdatedPrice?ccode='+sessionStorage.getItem('id'), {}) }
  // parts upcoming
  _parts_upcoming(obj: object) { return this.http.post(this.baseUrl + 'Parts/PartsUpcoming', obj) };
  // add to cart
  _add_to_cart(obj: any, data?:any) {

    /*   req['DefShipCode'] = inp['shipCode'];
    req['DefBillCode'] = inp['billCode']
    req['defCustName'] = inp['defCustName']
    req['defMobile'] = inp['phone']
    req['defEmail'] = inp['useremail']
    req['defEquipModel'] = inp['defEquipModel']
    req['defEquipSerial'] = inp['defEquipSerial']
    req['cartEquipModel'] = inp['cartEquipModel']
    req['cartEquipSerial'] = inp['cartEquipSerial'] */
    
    let reqPayload={
      "DefShipCode":data.shipCode,
      "DefBillCode":data.billCode,
      "defCustName":data.defCustName,
      "defMobile":data.phone,
      "defEmail":data.useremail,
      "defEquipModel":data.defEquipModel,
      "defEquipSerial":data.defEquipSerial,
      "cartEquipModel":data.cartEquipModel,
      "cartEquipSerial":data.cartEquipSerial,


    }
    obj.DefShipCode= reqPayload.DefShipCode
    obj.DefBillCode= reqPayload.DefBillCode
    obj.defCustName= reqPayload.defCustName
    obj.defMobile= reqPayload.defMobile
    obj.defEmail= reqPayload.defEmail
    obj.defEquipModel= reqPayload.defEquipModel
    obj.defEquipSerial= reqPayload.defEquipSerial
    obj.cartEquipModel= reqPayload.cartEquipModel
    obj.cartEquipSerial= reqPayload.cartEquipSerial

    
    return this.http.post(this.baseUrl + 'CustomerAccount/AddtoCart', obj) }
  // view cart
  _view_cart(obj: any) { return this.http.post(this.baseUrl + 'CustomerAccount/ViewCart?CustCode=' + obj, {}) }
  // delete item in cart
  _remove_cart(obj: any) { return this.http.post(`${this.baseUrl}CustomerAccount/RemoveFromCart?CustCode=${obj.customer_id}&MaterialNo=${obj.material_no}`, {}) }
  // get my orders
  _my_orders(obj: any) { return this.http.post(`${this.baseUrl}CustomerAccount/MyOrder?CustCode=${obj}`, {}) }
  // get order details
  _order_details(obj: any) { return this.http.get(`${this.baseUrl}CustomerAccount/OrderDetail?SalesOrderNumber=${obj}`) }
  // mail order receipt
  _mail_order_receipt(obj: any) { return this.http.post(this.baseUrl + 'CustomerAccount/Email?CCode=' + obj.id + '&Invoice=' + obj.invoice_no, {}) }

  _load_add_to_cart_request(inp: any, customer_id: any) {
    console.log(inp, "inp")
    let sno: any = JSON.parse(sessionStorage.getItem('fleetDetails') || '')
    // this._getDefaultAddress()
    let req: any = {};
    req['cartId'] = 0;
    req['partDesc'] = inp['description'];
    req['partNumber'] = inp['materialNo'];
    req['price'] = 0;
    req['custId'] = Number(customer_id);
    req['qty'] = Number(inp['quantity']);
    req['hsnCode'] = inp['hsnCode'];
    req['date'] = new Date().toISOString()
    req['unitPrice'] = Number(inp['unitPrice']);
    req['extendedPrice'] = Number(inp['extendedPrice']);
    req['discount'] = (Number(inp['discount'].replace("%", "")) == null) ? 0 : Number(inp['discount'].replace("%", ""));
    req['discountValue'] = Number(inp['discountValue']);
    req['surcharge'] = Number(inp['surcharge']);
    req['surchargeValue'] = Number(inp['surchargeValue']);
    req['taxableValue'] = Number(inp['taxableValue']);
    req['cgst'] = Number(inp['cgst'].replace(/%/, ''));
    req['cgstValue'] = Number(inp['cgstValue']);
    req['sgst'] = Number(inp['sgst'].replace(/%/, ''));
    req['sgstValue'] = Number(inp['sgstValue']);
    req['igst'] = Number(inp['igst'].replace(/%/, ''));
    req['igstValue'] = Number(inp['igstValue']);
    req['subTotal'] = Number(inp['subTotal']);
    req['tcs'] = Number(inp['tcs'].replace(/%/, ''));
    req['tcsValue'] = Number(inp['tcsValue']);
    req['totalValue'] = Number(inp['totalValue']);
    req['currency'] = inp['currency'];
    req['tatStockpartsDays'] = inp['tatStockpartsDays'];
    req['tatStockpartsDesc'] = inp['tatStockpartsDesc'];
    req['tatNonstockpartsDays'] = inp['tatNonstockpartsDays'];
    req['tatNonstockpartsDesc'] = inp['tatNonstockpartsDesc'];
    req['deliveryPlant'] = inp['deliveryPlant'];
    req['stock'] = Number(inp['stock']);
    req['division'] = Number(inp['division']);
    req['sourcesupply'] = inp['sourcesupply'];
    req['soldTo'] = Number(inp['soldTo']);
    req['shipTo'] = Number(inp['shipTo']);
    // req['billTo'] = Number(inp['billTo']);
    // qty change
    req['billTo'] = Number(inp['shipTo']);

    req['salesorg'] = inp['salesorg'];
    req['distChannel'] = Number(inp['distChannel']);
    req['orderType'] = inp['orderType'];
    req['valuationType'] = inp['valuationType'];
    req['country'] = inp['country'];
    req['companyCode'] = inp['companyCode'];
    req['pricingValidon'] = inp['pricingValidon'];
    req['material'] = inp['material'];
    req['description'] = inp['description'];
    req['uom'] = inp['uom'];
    req['length'] = Number(inp['length']);
    req['width'] = Number(inp['width']);
    req['height'] = Number(inp['height']);
    req['unitOfDim'] = inp['unitOfDim'];
    req['grossWeight'] = Number(inp['grossWeight']);
    req['netWeight'] = Number(inp['netWeight']);
    req['unitWeight'] = inp['unitWeight'];
    req['obsoleteStatus'] = inp['obsoleteStatus'];
    req['matStatus'] = inp['matStatus'];
    req['serialNumber'] = sno.serialNumber;


    req['logMobile'] =  sessionStorage.getItem('mob');
    req['logPAN'] = sessionStorage.getItem('pan');

    //custdefault
  


    return req;
  }

  _getAll_Contacts(id: any) { return this.http.post(this.baseUrl + 'CustomerAccount/GetAllContact?CustCode=' + id, {}) }

  getAll_Quotes(id: any) { return this.http.post(this.baseUrl + 'CRM/QuoteList?CustId=' + id, {}) }

  addQuote(obj: any) { return this.http.post(this.baseUrl + 'CRM/AddQuotetocart', obj) }

  _get_ShippingDetails(invno: any) { return this.http.get(this.baseUrl + 'Shipment/GetAllShipments?InvoiceNumber=' + invno) };

  _getPayment_Details(payobj: any) { return this.http.post(this.baseUrl + 'CRM/CCAvenueEncrypt', { "ccaRequest": payobj }) }
  _get_Equipment(id: any) { return this.http.post(this.baseUrl + 'CustomerAccount/Equipment?Customercode=' + id, {}) }
  _add_Contact(cusid: any, email: any, mobile: any, name: any) { return this.http.get(this.baseUrl + 'CustomerAccount/AddContact?Customercode=' + cusid + '&IPavip=X&Name=' + name + '&Mobile=' + mobile + '&Email=' + email) }
  _get_ReqAdminAccess(obj: any) { return this.http.post(this.baseUrl + 'CustomerAccount/CustomerAdminAccess', obj) }
  _getSearch_Details(searchKey: any) {
    return this.http.get(this.baseUrl + 'Parts/GlobalSearch?SearchKey=' + searchKey)
  }
  credit_check() {
    let id = sessionStorage.getItem('id')
    return this.http.get(this.baseUrl + 'CustomerAccount/Creditcheck?SoldTo=' + id + '&BillTo=' + id + '&ShipTo=' + id)

  }
  
//   get_focPartsDetails(MaterialNo: any, Sourcesupply: any, PricingValidon: any, Quantity: any , ShipTo:any , SoldTo:any , BillTo:any , Division:any , DistChannel:any ){
//     let id = sessionStorage.getItem('id')
//    return this.http.get(this.baseUrl + 'Parts/focPartsDetails?MaterialNo='+ MaterialNo + '&Sourcesupply= ' + Sourcesupply + '&PricingValidon=' + PricingValidon +' &Quantity=' + Quantity +'&ShipTo=' + id +'&SoldTo=' + id +'&BillTo=' + id +'&Division=' + Division +'&DistChannel= ' + DistChannel ) 
// }
  

  create_order(obj: any) {
    return this.http.post(this.baseUrl + 'CustomerAccount/CreateOrder', obj)
  }

  _set_isDefault(obj: any) {
    return this.http.post(this.baseUrl + 'CustomerAccount/SetDefault', obj)
  }

  _set_Default_Contact(obj: any) {
    return this.http.post(this.baseUrl + 'CustomerAccount/SetDefault', obj)
  }

  _get_DeviceConnected(obj: any) {
    return this.http.post(this.baseUrl + 'CRM/ConnectedDevice', obj)
  }


  _get_serviceHistory(sno: any) {
    return this.http.post(this.baseUrl + 'CustomerAccount/ServiceRecord?SerialNumber=' + sno, {})
  }

  _get_ccav() {
    return this.http.get('https://gmmco.colanonline.net/api/CRM/CCAvenueDecrypt?encResp=')
  }

  _get_healthAlerts(obj: any) {
    return this.http.post(this.baseUrl + 'CRM/HealthAlertsCustomerCode', obj)
  }
  _get_outstanding(ccde: any) {
    return this.http.get(this.baseUrl + 'CustomerAccount/Outstanding?Customercode=' + ccde)
  }
  _mailtoincident(inceidentId?: any, datetime?: any) {
    return this.http.get(this.baseUrl + 'CRM/PMReschedule?incedentID=' + inceidentId + '&dateTime=' + datetime)
  }

  _category_parts(sno: any, catname: any) {
    // alert(sno +'------'+ catname )
    return this.http.get(this.baseUrl + 'Parts/CategoryParts?Catname=' + catname + '&Serialnumber=' + sno)
  }
  _mailtoServiceHistory(inId: any, cuscode: any) {
    return this.http.get(this.baseUrl + 'CRM/ServiceReportTicket?incedentID=' + inId + '&custCode=' + cuscode)
  }
  _getPartsUpcoming(sno: any) {
    let obj: any = {
      "id": environment.jobcode_id,
      "filters": [{
        "name": "serial_number",
        "values": sno
      }]
    }
    return this.http.post(this.baseUrl + 'CRM/GetJobCode', obj)
  }

  _getTrackSingleTicketDetails() {

    let obj: any = {
      "id": 101295,
      "filters": [{
        "name": "customer_code",
        "values": this._get_id(sessionStorage.getItem('id'))
      }]
    }
    return this.http.post(this.baseUrl + 'CRM/TrackTicketsingle', obj)

  }

  encryptdata(request: any) {
    console.log("request encryptdata", request);
    //  alert()
    let url = `http://localhost:3000/api/orders/encryptFormData`;
    let data = {
      request: request
    }
    return this.http.get(url, { params: data })
  }

  customer_records(ccode: any) { return this.http.get(this.baseUrl + 'CustomerAccount/CustomerRecordByCode?customerCode=' + ccode) };

  _CA012(obj: any) {
    let id: any = sessionStorage.getItem('id')
    let todaydate: any = new Date().toISOString().split('Z')[0];
    // alert(todaydate)
    return this.http.get(this.baseUrl + 'CustomerAccount/PAYMENTINVOICE?IPaymentType=1&CustCode=' + id + '&CustName=' + obj.customerName + '&PaymentDate=' + todaydate + '&PaymentAmount=' + parseInt(obj.balance) + '&ICcAvenueRefId=CC12345&InvoiceNumber=' + obj.fiDocNo + '&InvoiceReference=' + obj.invoiceReference + '&InvoiceDate=' + obj.documentDate.split('Z')[0] + '&InvoiceBalanceAmount=' + parseInt(obj.balance) + '&SapFiDocNo=' + obj.fiDocNo + '&CustomerPoNo=' + obj.fiDocNo + '&OrderAmount=' + parseInt(obj.totalAmount))
    // return this.http.get(this.baseUrl+'https://gmmco.colanonline.net/api/CustomerAccount/PAYMENTINVOICE?IPaymentType=1&CustCode=5647&CustName=Testing&PaymentDate=2020-03-29T13%3A34%3A00&PaymentAmount=10&ICcAvenueRefId=CC12345&InvoiceNumber=9002343&InvoiceReference=XB12343234&InvoiceDate=2020-03-29T13%3A34%3A00&InvoiceBalanceAmount=20&SapFiDocNo=8032303&CustomerPoNo=6302340&OrderAmount=30')
  }

  _deductFromCredit() {

    let id: any = sessionStorage.getItem('id');
    let mob: any = sessionStorage.getItem('mob');
    return this.http.post(this.baseUrl + 'CRM/CreditCA009?Custcode=' + id + '&PaymentMode=Credit&Mobile=' + mob, {})
  }

  _QuoteList(qid: any) { return this.http.post(this.baseUrl + 'CRM/QuoteDetailList?QuotationNumber=' + qid, {}) }
  _getRefNo_ccav() { return this.http.get(this.baseUrl + 'CustomerAccount/GetPayTrackingNo') }

  _QuoteCalcCart(obj: any, qty: any) { return this.http.post(this.baseUrl + 'CustomerAccount/SetQuotePrice?QuotationMo=' + obj.qid + '&MaterialNo=' + obj.matNo + '&Sourceofsupply=' + obj.sos + '&Qty=' + qty, {}) }

  _QuoteCalcUpdate() { return this.http.post(this.baseUrl + 'CustomerAccount/NonFOCGetmaterialUpdatedPrice?ccode=' + sessionStorage.getItem('id'), {}) }
  // _QuoteCalcUpdate() { return this.http.get(this.baseUrl + 'Parts/GetmaterialUpdatedPrice?ccode='+sessionStorage.getItem('id')) }

  _needAssitance(obj: any) { return this.http.post(this.baseUrl+'CustomerAccount/RequestAdmin', obj) }

  _get_ReturnOrderDetails(saleorderno: any) { return this.http.get(this.baseUrl + 'CRM/OrderdetailsLocal?SalesOrderNo=' + saleorderno) }

  _returnInformation(retInfo: any) { return this.http.post(this.baseUrl + 'CRM/Returnreason', retInfo) }

  _getSerialNo() { let id: any = sessionStorage.getItem('id'); return this.http.get(this.baseUrl + 'CustomerAccount/cartserialnumber?ccode=' + id) }

  _getDefaultDatas() {
    let id: any = sessionStorage.getItem('id');

    return this.http.post(this.baseUrl + 'CustomerAccount/CustDefault?CustCode=' + id, {})
  }


  _tcsCreditCheck() {
    let id: any = sessionStorage.getItem('id');

    return this.http.get(this.baseUrl + 'CustomerAccount/TCSCreditcheck?SoldTo=' + id + '&BillTo=' + id + '&ShipTo=' + id)
  }
  //* outstanding  *//
  _paymentTrackId() {
    return this.http.get(this.baseUrl + 'CustomerAccount/PaymentTrackingId')
  }

  _getOrderDetails_(id: any, orderid: any, tempid: any) {
    return this.http.get(this.baseUrl + 'CustomerAccount/Landingpage?CustCode=' + id + '&orderid=' + orderid + '&tempid=' + tempid)
  }


  _getOutstanding_payments() {
    let id: any = sessionStorage.getItem('id');

    return this.http.get(this.baseUrl + 'Admin/OustandingList?customerCode=' + id)
  }

  //**STATE */
  _getStatesList(name: any, serach: any) {
    return this.http.get(this.baseUrl + 'CustomerAccount/Cascadingddl?name=' + name + '&serach=' + serach)
  }

  //**CUSTADMIN  */

  _getUserListForRights() {

    return this.http.get(this.baseUrl + 'CustomerAccount/GetCustomerSet?Ccode=' + sessionStorage.getItem('id'))

  }
  _getGroupsList() {
    return this.http.get(this.baseUrl + 'CustomerAccount/GetGroupandScreens')
  }
  _setRightsForCustomer(currentobj: any, grpid: any) {
    // https://uat-customer.gmmco.in/api/CustomerAccount/SetUserScreens?Mobile=9010203067&Panumber=AAICR2011F&Ccode=5647&GroupId=2

    return this.http.post(this.baseUrl + 'CustomerAccount/SetUserScreens?Mobile=' + currentobj.mobile + '&Panumber=' + sessionStorage.getItem('pan') + '&Ccode=' + sessionStorage.getItem('id') + '&GroupId=' + grpid, {})
  }
}
// export interface IcoindDetail {
//   response?: { minofBalanceValue: number },
//  }

  export interface Metadata {
      id: string;
      uri: string;
      type: string;
  }

  export interface Foclisting {
      csalesOffice: string;
      cplant: string;
      valueContract: string;
      
      cvalidTo: string;
      csalesOrg: string;
      cdistriChannel: string;
      cdivision: string;
      csalesGroup: string;
      
      balanceValue: string;
      serialNumber: string;
      refInvoiceNo: string;
  }

  export interface D {
      // results: Result[];
  }

  export interface Response {
      d: D;
  }

  export interface RootObject {
      isSuccess: boolean;
      message: string;
      response: Response;
  }

  export interface Responses {
    cartId: number;
    partDesc: string;
    partNumber: string;
    price: number;
    custId: number;
    qty: number;
    hsnCode: string;
    date: Date;
    unitPrice: number;
    extendedPrice: number;
    discount: number;
    discountValue: number;
    surcharge: number;
    surchargeValue: number;
    taxableValue: number;
    cgst: number;
    cgstValue: number;
    sgst: number;
    sgstValue: number;
    igst: number;
    igstValue: number;
    subTotal: number;
    tcs: number;
    tcsValue: number;
    totalValue: number;
    currency: string;
    tatStockpartsDays: string;
    tatStockpartsDesc: string;
    tatNonstockpartsDays: string;
    tatNonstockpartsDesc: string;
    deliveryPlant: string;
    stock: number;
    division: number;
    sourcesupply: string;
    soldTo: number;
    shipTo: number;
    billTo: number;
    salesorg: string;
    distChannel: number;
    orderType: string;
    valuationType: string;
    country: string;
    companyCode: string;
    pricingValidon: string;
    material: string;
    description: string;
    uom: string;
    length: number;
    width: number;
    height: number;
    unitOfDim: string;
    grossWeight: number;
    netWeight: number;
    unitWeight: string;
    obsoleteStatus: string;
    matStatus: string;
    mode: string;
    serialNumber?: any;
    partsImageWindow: string;
    partsImageMobile: string;
    logMobile?: any;
    logPAN?: any;
    defShipCode?: any;
    defBillCode?: any;
    defCustName?: any;
    defMobile?: any;
    defEmail?: any;
    defEquipModel?: any;
    defEquipSerial?: any;
    cartEquipModel?: any;
    cartEquipSerial?: any;
    version?: any;
    isExclude?: boolean;
}

