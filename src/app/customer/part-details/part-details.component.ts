import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { NgxGalleryImage } from '@kolkov/ngx-gallery';
import { NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { FleetService } from 'src/app/services/fleet.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
// import { threadId } from 'worker_threads';
import { ToastService } from 'src/app/services/toastr.service';
import { NgbActiveModal, NgbModal, NgbModalRef, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { getAnalytics, logEvent } from "firebase/analytics";

@Component({
  selector: 'app-part-details',
  templateUrl: './part-details.component.html',
  styleUrls: ['./part-details.component.scss'],
  providers: [DatePipe]

})
export class PartDetailsComponent implements OnInit {
  @ViewChild('mymodal1') modal!: ElementRef;

  galleryOptions: NgxGalleryOptions[] | any;
  galleryImages: NgxGalleryImage[] | any;

  ShowCartDetails: boolean = false;
  ShowCartOffer: boolean = false;
  ButtonText = 'Get Price and Availability'
  materialId: any;
  currentCustomerId: any;
  currentPartDetails: any;
  selectedQuantity: any = "1";
  estimatedDetails: any;
  quantityList: any;
  counter = 0;
  selectedAddress: any = {
    name: 'testing',
    address: 'test address',
    city: 'test city',
    pincode: '23456',
    state: 'state test',
    phone: '7401075899',
    useremail: "",
    cartAccum: "",
    deafultdatas: {},
    shipCode: "",
    defCustName: "",
    billCode: ""


  }
  getFleetsdetails: any;
  addpayload: any;
  constructor(private modalRef: NgbActiveModal,
    private modalService: NgbModal, private toastr: ToastService, private fleetService: FleetService, private router: Router, private activateRoute: ActivatedRoute, private datepipe: DatePipe) { }

  ngOnInit() {
    this.galleryOptions = [
      {
        width: '100%',
        height: '500px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },

      {
        breakpoint: 400,
        preview: false
      }
    ];

    this.galleryImages = [
      // {
      //   small: '../../../assets/images/slidermain.png',
      //   medium: '../../../assets/images/slidermain.png',
      //   big: '../../../assets/images/slidermain.png'
      // },
      // {
      //   small: '../../../assets/images/slider1.png',
      //   medium: '../../../assets/images/slider1.png',
      //   big: '../../../assets/images/slider1.png'
      // },
      // {
      //   small:  '../../../assets/images/slider2.png',
      //   medium: '../../../assets/images/slider2.png',
      //   big: '../../../assets/images/slider2.png'
      // },
      // {
      //   small: '../../../assets/images/slider3.png',
      //   medium: '../../../assets/images/slider3.png',
      //   big: '../../../assets/images/slider3.png'
      // } ,
      // {
      //   small: '../../../assets/images/slider1.png',
      //   medium: '../../../assets/images/slider1.png',
      //   big: '../../../assets/images/slider1.png'
      // },
      // {
      //   small:  '../../../assets/images/slider2.png',
      //   medium: '../../../assets/images/slider2.png',
      //   big: '../../../assets/images/slider2.png'
      // },
    ];
    this.materialId = this.activateRoute.snapshot.params;
    this.currentCustomerId = sessionStorage.getItem('id');
    this._get_MaterialDetails();
    this.quantityList = Array(99).fill(1).map((x, i) => (i + 1));
    this._getDefaultAddress();

  }
  ngAfterViewInit() {
    const analytics = getAnalytics();

    logEvent(analytics, 'Front End Screen Views', {
      firebase_screen: 'Part Details Page',
      firebase_screen_class: 'Part Details Page'
    })
  }
  open(content: any) {

    this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', centered: true });
  }
  close() {
    this.modalRef.close();
  }

  OnAddCart() {
    this.ButtonText = "Add to Cart"
    this._get_EstimatedPrice();
  }

  _get_MaterialDetails() {
    console.log(this.materialId)
    this.fleetService._get_FleetParts_details(this.materialId.partId, this.currentCustomerId).subscribe((resData: any) => {
      console.log(resData)
      this.currentPartDetails = resData.response;

      // console.log("cccccccccccccccccccccccccccccc", this.currentPartDetails)
      // this.galleryImages = resData.response.partsImagesWeb;
      // resData.response.partsImagesWeb.reverse();
      resData.response?.partsImagesWeb.forEach((imgUrl: any) => {
        console.log(imgUrl.imagePath)
        this.galleryImages.push({
          small: imgUrl.imagePath,
          medium: imgUrl.imagePath,
          big: imgUrl.imagePath
        })
      });
    })
    console.log(this.galleryImages)
  }

  _get_EstimatedPrice() {
    let todayDate = this.datepipe.transform(new Date(), 'dd.MM.yyyy');

    // let divisionCode :any = JSON.parse(sessionStorage.getItem('fleetDetails') || '')
    console.log(todayDate, "todayDate")
    this.fleetService._get_EstimateFleetPriceValue(this.fleetService._split_char(this.materialId.partId)[0], this.fleetService._split_char(this.materialId.partId)[1], this.selectedQuantity, todayDate).subscribe((resData: any) => {
      if (resData['isSuccess'] == true) {
        this.estimatedDetails = resData.response.d.results[0];
        console.log(this.estimatedDetails, "estimatedDetails chk")
        console.log(resData, "resData chk")
        this.fleetService._load_add_to_cart_request(this.estimatedDetails, this.currentCustomerId);
        this.estimatedDetails.quantity = parseInt(this.estimatedDetails.quantity);
        this.estimatedDetails.stock = parseInt(this.estimatedDetails.stock);

        if (parseFloat(this.estimatedDetails.discount)) {
          this.ShowCartDetails = true;

          this.estimatedDetails.discount = this.estimatedDetails.discount;
          this.estimatedDetails.discount = this.estimatedDetails.discount.replace(".000", '');
          this.estimatedDetails.discount = this.estimatedDetails.discount.replace(".100", '.1');
          this.estimatedDetails.discount = this.estimatedDetails.discount.replace(".200", '.2');
          this.estimatedDetails.discount = this.estimatedDetails.discount.replace(".300", '.3');
          this.estimatedDetails.discount = this.estimatedDetails.discount.replace(".400", '.4');
          this.estimatedDetails.discount = this.estimatedDetails.discount.replace(".500", '.5');
          this.estimatedDetails.discount = this.estimatedDetails.discount.replace(".600", '.6');
          this.estimatedDetails.discount = this.estimatedDetails.discount.replace(".700", '.7');
          this.estimatedDetails.discount = this.estimatedDetails.discount.replace(".800", '.8');
          this.estimatedDetails.discount = this.estimatedDetails.discount.replace(".900", '.9');
        }


      } else {
        this.ButtonText = 'Get Price and Availability';
        console.log("error msg view")
        // console.log(this.estimatedDetails.discount , "vh")
        this.toastr.showError('You Are Not Authorised To Order This Part')

      }
    },
      err => {
        // this.ButtonText = 'Get Price and Availability';
        // console.log("error msg view 2")
        // this.toastr.showError('You Are Not Authorised To Order This Part')


      }
    )
  }
  // get_payload_cart(){

  //   this.fleetService._getDefaultDatas().subscribe(
  //     (data:any)=>{

  //    this.addpayload = data.response;
  //    this.addpayload.shipCode ;
  //    this.addpayload.defCustName;
  //    this.addpayload.defMobile;
  //    this.addpayload.defEmail;
  //    this.addpayload.defEquipModel;
  //    this.addpayload.defEquipSerial;
  //    this.addpayload.cartEquipModel;
  //    this.addpayload.cartEquipSerial;
  //    console.log(this.addpayload);

  //     console.log(this.addpayload , "reqPayload")

  //     console.log(this.addpayload.shipCode , "def")

  //     console.log(this.addpayload.defCustName , "def")

  //     }

  //   )

  // }
  _getDefaultAddress() {
    this.fleetService._getDefaultDatas().subscribe((datas: any) => {
      console.log(datas, "email def")
      this.selectedAddress['shipCode'] = datas.response['shipCode'];
      this.selectedAddress['billCode'] = datas.response['billCode'];
      this.selectedAddress['defCustName'] = datas.response['defCustName'];
      this.selectedAddress['phone'] = datas.response['defMobile'];
      this.selectedAddress['useremail'] = datas.response['defEmail'];

      this.selectedAddress['defEquipModel'] = datas.response['defEquipModel'];
      this.selectedAddress['defEquipSerial'] = datas.response['defEquipSerial'];
      this.selectedAddress['cartEquipModel'] = datas.response['cartEquipModel'];
      this.selectedAddress['cartEquipSerial'] = datas.response['cartEquipSerial']

    })
  }
  ItemAddedCart(modal?: boolean) {
    let obj = {
      "logMobile": sessionStorage.getItem('mob'),
      "logPAN": sessionStorage.getItem('pan'),
      "DefShipCode": this.selectedAddress['shipCode'],
      "DefBillCode": this.selectedAddress['billCode'],
      "defCustName": this.selectedAddress['defCustName'],
      "defMobile": this.selectedAddress['phone'],
      "defEmail": this.selectedAddress['useremail'],
      "defEquipModel": this.selectedAddress['defEquipModel'],
      "defEquipSerial": this.selectedAddress['defEquipSerial'],
      "cartEquipModel": this.selectedAddress['cartEquipModel'],
      "cartEquipSerial": this.selectedAddress['cartEquipSerial']
    }
    console.log(obj, "obj add cart")
    // this.counter += 1;
    // if (this.counter > 1) {
    //   this.router.navigate(['/customer/my-cart'])

    // } 
    if (this.ButtonText == 'Review Cart') {
      this.router.navigate(['/customer/my-cart'])
    }
    else {
      this.fleetService._getSerialNo().subscribe((data: any) => {
        console.log(this.fleetService._load_add_to_cart_request(this.estimatedDetails, this.currentCustomerId).serialNumber, "hi")
        this.getFleetsdetails = data.response;


        if (data.response == null) {

          this.fleetService._add_to_cart(this.fleetService._load_add_to_cart_request(this.estimatedDetails, this.currentCustomerId), this.selectedAddress).subscribe((response: any) => {
            console.log(response, "null res")

            if (response['isSuccess'] == true) {
              this.ButtonText = "Review Cart"
              this._get_cart_details();
              this.toastr.showSuccess('Part is added to the Cart successfully')
              this._getDefaultAddress();
            } else {



              this.toastr.showError(response.message)
            }
          })
        } else if (modal == false && (data.response != null || data.response == this.fleetService._load_add_to_cart_request(this.estimatedDetails, this.currentCustomerId).serialNumber || data.response != this.fleetService._load_add_to_cart_request(this.estimatedDetails, this.currentCustomerId).serialNumber)) {
          this.open(this.modal)


        } else if (modal == true && (data.response != null || data.response == this.fleetService._load_add_to_cart_request(this.estimatedDetails, this.currentCustomerId).serialNumber || data.response != this.fleetService._load_add_to_cart_request(this.estimatedDetails, this.currentCustomerId).serialNumber)) {
          this.fleetService._add_to_cart(this.fleetService._load_add_to_cart_request(this.estimatedDetails, this.currentCustomerId), this.selectedAddress).subscribe((response: any) => {
            console.log(response)

            if (response['isSuccess'] == true) {
              this.ButtonText = "Review Cart"
              this._get_cart_details();
              this.toastr.showSuccess('Part is added to the Cart successfully')

              this.close()
            } else {



              this.toastr.showError(response.message)
            }
          })
        }




      })
    }





    // if(this.counter>1){
    //   this.fleetService._add_to_cart(this.fleetService._load_add_to_cart_request(this.estimatedDetails, this.currentCustomerId)).subscribe((response: any) => {
    //     console.log(response)
    //     if(response['isSuccess']){
    //       this.ButtonText = "Review Cart"
    //       this._get_cart_details();
    //     }
    //   })
    // }

  }
  splitchars(char?: any) {
    return this.fleetService._split_char(char)[0]
  }
  // getSerialNumber(){
  // let sno:any ;


  // return sno
  // }
  _get_cart_details() {
    this.fleetService._view_cart(this.currentCustomerId).subscribe((response: any) => {
      if (response['isSuccess']) {
        document.querySelector('#cart-img')?.setAttribute('data-value', response.response.length)
      } else {
        document.querySelector('#cart-img')?.setAttribute('data-value', '')
      }
    })
  }




  clearAllcart() {
    let obj: any = {
      "customer_id": this.currentCustomerId,
      "material_no": ''
    }
    this.fleetService._remove_cart(obj).subscribe((datas: any) => {
      console.log(datas)
      if (datas.isSuccess == true) {
        this.close()
        console.log(this.fleetService._load_add_to_cart_request(this.estimatedDetails, this.currentCustomerId).serialNumber, "hi")

        if (this.fleetService._load_add_to_cart_request(this.estimatedDetails, this.currentCustomerId).serialNumber) {
          this.fleetService._add_to_cart(this.fleetService._load_add_to_cart_request(this.estimatedDetails, this.currentCustomerId)).subscribe((response: any) => {
            console.log(response)

            if (response['isSuccess'] == true) {
              // debugger
              this.close()
              this.ButtonText = "Review Cart"
              this._get_cart_details();
            } else {



              this.toastr.showError(response.message)
            }
          })
        }


      }

    })
  }
}
