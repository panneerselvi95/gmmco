import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FleetService } from 'src/app/services/fleet.service';

declare var $: any;
import { ToastService } from '../../../services/toastr.service';
import { AuthService } from 'src/app/services/auth.service';
import { inputs } from '@syncfusion/ej2-angular-calendars/src/calendar/calendar.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() parentCount!: any;
  @Input() lengthcart:any;
   @Output() valueChange = new EventEmitter();
  [x: string]: any;
  currentUrl: string | undefined;
  pathhome: boolean = false;
  addresses: any
  currentCustomerId: any;
  currentCustomerName: any;
  searchlist: any;
  languageName: any;
  DefaultAddr: any;
  defaultBillAdr: any;
  defaultShipAdr: any;
  langname: any;
  defaultEquip: any;
  @Input()screens: any = {};
  constructor(
    private modalService: NgbModal,
    public router: ActivatedRoute,
    public _router: Router,
    private fleetService: FleetService,
    public translate: TranslateService,
    private toaster: ToastService,
    private _auth: AuthService,
    private cdr:ChangeDetectorRef
  ) {

    translate.addLangs(['en', 'tamil', 'hindhi']);
    translate.setDefaultLang(sessionStorage.getItem('lang') || 'en');
    this.languageName = sessionStorage.getItem('langName') || 'English';
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');
    this.langname = sessionStorage.getItem('lang')
    this.screenValidations();
  }




  translate_change(lang: any, name: any) {
    // alert()
    this.langname = lang  // parentCount
    sessionStorage.removeItem('lang')
    sessionStorage.removeItem('langName')
    sessionStorage.setItem('lang', lang)
    sessionStorage.setItem('langName', name);
    this.languageName = sessionStorage.getItem('langName');
    this.valueChange.emit(lang);
    location.reload()

  }
  ngOnInit() {

    this.filterDefaultAddr()

    $(document).ready(function () {
      $(".dropdown-toggle").click(function () {
        if ($(this).next(".dropdown-menu").hasClass("show")) {
          $(this).next(".dropdown-menu").removeClass("show");
        }
        else {
          $(this).next(".dropdown-menu").removeClass("show");
          $(this).next(".dropdown-menu").addClass("show");
        }
      });
      $("button.navbar-toggler").click(function () {
        $(".navbar.navbar-expand-lg").toggleClass('resp-menu');
      });
    });

    $(document).ready(function () {
      $(".dropdown-toggle").click(function () {
        if ($(this).next(".dropdown-menu").hasClass("show")) {
          $(this).next(".dropdown-menu").removeClass("show");
        }
        else {
          $(this).next(".dropdown-menu").addClass("show");
        }
      });

    });

    $(document).bind('click', function (e: { target: any; }) {
      if (!($(e.target).hasClass("dropdown-menu")) &&
        !($(e.target).parent().hasClass("dropdown-menu")) &&
        !($(e.target).parent().parent().hasClass("dropdown-menu")) &&
        !($(e.target).parent().parent().parent().hasClass("dropdown-menu")) &&
        !($(e.target).parent().parent().parent().parent().hasClass("dropdown-menu"))) {
        $(".dropdown-menu").removeClass("show");
      }
    });


    this.router.url.subscribe((data: any) => {
      console.log(data)
      this.currentUrl = data[0]['path'];
      if (data[0].path == "home") {
        this.pathhome = true;

      }
    })
    this.currentCustomerId = sessionStorage.getItem('id');
    this.currentCustomerName = window.atob(sessionStorage.getItem('name') || '');
    if (this.currentCustomerId) {
      this._get_cart_details();
      // debugger
    } else {
      this._router.navigateByUrl('/login')
    }

  }
  // modal
  triggerModal(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }

  triggerModal1(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
    });
  }
  open(content: any) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  _get_cart_details() {
    this.fleetService._view_cart(this.currentCustomerId).subscribe((response: any) => {
      if (response['isSuccess']) {
        // this.lengthcart=response.response.length;
        console.log(response.response.length , "chk res")
        document.querySelector('#cart-img')?.setAttribute('data-value', response.response.length);
        // this.cdr.detectChanges()
      } else {
        document.querySelector('#cart-img')?.setAttribute('data-value', '');
        // this.cdr.detectChanges()
      }
    })
  }
  // _get_cart_details() {
  //   this.fleetService._view_cart(this.currentCustomerId).subscribe((response: any) => {
  //     if (response['isSuccess']) {
  //       this.lengthcart=response.response.length;
  //       if(this.lengthcart){
  //         console.log(response.response.length , "chk res")
  //         document.querySelector('#cart-img')?.setAttribute('data-value', response.response.length);
  //       }
        
  //       this.cdr.detectChanges()
  //     } else {
  //       document.querySelector('#cart-img')?.setAttribute('data-value', '');
  //       this.cdr.detectChanges()
  //     }
  //   })
  // }

  search_data(searchkey: any) {
    let arr = [...searchkey]
    console.log(arr.length, arr)
    if (arr.length >= 4) {
      console.log('if')
      this.fleetService._getSearch_Details(searchkey).subscribe((data: any) => {
        console.log(data.response)
        if (data.response) {
          this.searchlist = data.response;
        }
        else {
          this.searchlist = []
        }




      })
    }
  }

  filterDefaultAddr() {
    let id: any = sessionStorage.getItem('id')
    this.fleetService._view_address(id).subscribe((data: any) => {
      this.addresses = data.response;
      this.defaultBillAdr = data.response.billto?.filter((item: any) => { return item.defaultbillto == true })
      this.defaultShipAdr = data.response.shipTo?.filter((item: any) => { return item.defaultshipto == true })

      console.log(this.defaultShipAdr)
    })


    this.fleetService._getDefaultDatas().subscribe((data: any) => {
      this.defaultContacts = data.response?.defMobile + ':' + data.response?.defEmail;
      this.defaultEquip = data.response?.defEquipModel + ',' + data.response?.defEquipSerial;

    })
  }

  gototabs() {
    window.open('http://3.109.30.40:8081/bugzilla/')

  }
  route_parts(data: any) {
    console.log(data, "searchdata")

    sessionStorage.setItem('fleetDetails', JSON.stringify(data))
    this._router.navigateByUrl('/customer/part-details/' + data.material_No + ':' + data.source_of_Supply + '/' + this.convertDate(data.part_Description))
  }

  convertDate(updatedate: any) {
    let str: any = updatedate.replace(/\\|\//g, ""); return str.replace(/\s/g, "");
    console.log(str)
    // console.log(str[0]+':'+str[1])
  }

  _log_out() {
    this._auth._LogOut(sessionStorage.getItem('mob'), sessionStorage.getItem('pan')).subscribe((data: any) => {
      sessionStorage.removeItem('dropdown');
      sessionStorage.removeItem('mob');

      sessionStorage.removeItem('userlist');
      sessionStorage.removeItem('id');
      sessionStorage.removeItem('name');
      sessionStorage.removeItem('pan');
      sessionStorage.removeItem('order_detail')
      sessionStorage.removeItem('fleetDetails')
      sessionStorage.removeItem('total')
      sessionStorage.removeItem('langName')
      sessionStorage.removeItem('lang')
      sessionStorage.removeItem('orderid')

      this._router.navigateByUrl('/login');
    })
  }

  _splitChar(char: any): any {
    let chars: any = this.fleetService._split_char(char)
    return chars
  }

  screenValidations() {
    let screens: any = sessionStorage.getItem('screens')?.split('|');
    this.screens['isAdmin'] = JSON.parse(sessionStorage.getItem('userlist') || '');
    console.log(this.screens['isAdmin'],"254");
    for (let items of screens) {
      if (items == 1) { this.screens['myplan'] = false }
      else if (items == 2) { this.screens['assisstance'] = false }
      else if (items == 3) { this.screens['home'] = false }
      else if (items == 4) { this.screens['orderlist'] = false }
      else if (items == 5) { this.screens['myfleet'] = false }
      else if (items == 6) { this.screens['cart'] = false }
      else if (items == 7) { this.screens['myorder'] = false }
      else if (items == 8) { this.screens['quote'] = false }
      // else if (items == 9) { this.screens['my-foc'] = false }

    }
  }
}
