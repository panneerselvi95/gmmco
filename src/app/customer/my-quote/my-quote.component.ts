import { Component, OnInit } from '@angular/core';
import { FleetService } from 'src/app/services/fleet.service';
import { ToastService } from 'src/app/services/toastr.service';
import { Router, ActivatedRoute } from '@angular/router';
import { getAnalytics, logEvent } from "firebase/analytics";

@Component({
  selector: 'app-my-quote',
  templateUrl: './my-quote.component.html',
  styleUrls: ['./my-quote.component.scss']
})
export class MyQuoteComponent implements OnInit {
  quotesList: any;

  constructor(private fleetsservice: FleetService, private toastr: ToastService, private router: Router) { }

  ngOnInit() {
    this.get_Quotes()
  }

  ngAfterViewInit() {
    const analytics = getAnalytics();

    logEvent(analytics, 'Front End Screen Views', {
      firebase_screen: 'My Quote Page',
      firebase_screen_class: 'My Quote Page'
    })
  }




  get_Quotes() {
    let id = sessionStorage.getItem('id')
    this.fleetsservice.getAll_Quotes(id).subscribe((resdata: any) => {
      this.quotesList = resdata.response;
      console.log("quote liust", this.quotesList)
    })
  }

  add_Quotes(obj: any) {
    console.log(obj)

    // console.log(new Date(obj.validTo).toDateString())
    // var date1:any = new Date(obj.validTo);
    // var date2:any = new Date();
    // var diffDays = parseInt((date2 - date1) / (1000 * 60 * 60 * 24), 10); 

    // alert(diffDays )

    // console.log(obj.validTo)
    // const date1 :any= new Date();
    // const date2 :any= new Date(obj.validTo+"");

    // console.log(date2)
    // const diffTime = Math.abs(date2 - date1);
    // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    // console.log(diffTime + "milliseconds");
    // console.log(diffDays + "days");

    // var parts:any = obj.validTo.split('-');
    // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
    // January - 0, February - 1, etc.
    // var mydate = new Date(parts[0], parts[1] - 1, parts[2]); 
    // console.log(typeof obj.validTo);

    if (obj.status == 1 || parseInt(obj.col1) < 0) {

      this.toastr.showInformation('You Have Already Processed The Quote')
    } else {
      obj['distributionChannel'] = Number(obj.distributionChannel);
      obj['soldtoParty'] = Number(obj.soldtoParty);
      obj['shiptoParty'] = Number(obj.shiptoParty);
      obj['billtoParty'] = Number(obj.billtoParty);
      obj['quantity'] = Number(obj.quantity);
      obj['unitPrice'] = Number(obj.unitPrice);
      obj['discount'] = Number(obj.discount);
      obj['extendedPrice'] = Number(obj.extendedPrice);
      obj['discountValue'] = Number(obj.discountValue);
      obj['surcharge'] = Number(obj.surcharge);
      obj['surchargeValue'] = Number(obj.surchargeValue);
      obj['cgst'] = Number(obj.cgst);
      obj['cgstValue'] = Number(obj.cgstValue);
      obj['sgst'] = Number(obj.sgst);
      obj['sgstValue'] = Number(obj.sgstValue);
      obj['igst'] = Number(obj.igst);
      obj['igstValue'] = Number(obj.igstValue);
      obj['tcs'] = Number(obj.tcs);
      obj['tcsValue'] = Number(obj.tcsValue);
      obj['totalValue'] = Number(obj.totalValue);
      obj['totalTax'] = Number(obj.totalTax);
      //  obj["soldtoParty"]= Number(obj["soldtoParty"]).toString();
      //  alert(obj['soldtoParty'])
      //  obj["shiptoParty"]=  Number(obj["soldtoParty"]).toString();
      //  obj["billtoParty"]=  Number(obj["soldtoParty"]).toString();
      //  obj['soldtoParty'] = this.fleetsservice._get_id(obj.soldtoParty);
      //  obj["shiptoParty"]=   this.fleetsservice._get_id(obj.shiptoParty);
      //  obj["billtoParty"] =  this.fleetsservice._get_id(obj.billtoParty);

      this.fleetsservice.addQuote(obj).subscribe((resData: any) => {
        console.log(resData)
        if (resData.isSuccess == true) {
          this.toastr.showSuccess('Added Cart Successfully')
          this.router.navigateByUrl('/customer/my-cart')
          this.get_Quotes()

        } else {
          this.toastr.showError(resData.message)

        }

      })

    }
  }
  addQtyVal(qid: any, type: any, price: any) {
    let totalValue: number = 0;


  }


  finddiffdays(validtill: any, i: any) {
    console.log(validtill)
    const oneDay: any = 24 * 60 * 60 * 1000;
    let date1: any = new Date(validtill)
    console.log(date1, 'iiiii')
    let date2: any = new Date();
    const diffDays = Math.round((date1 - date2) / oneDay);
    console.log(diffDays)
    // return diffDays
    if (diffDays >= -0) {
      return true;
    } else {
      return false;
    }

    // var today = new Date().toISOString();
    // var reqDateVar = new Date(validtill).toISOString();
    // console.log('fff', today == reqDateVar)
    // if(today <= reqDateVar){
    //   // alert(1)
    // return true
    // } else {
    //   // alert (2)
    //  return false
    // }


  }

  convertToIntegerValue(num: any) {
    return Number(num)
  }
}
