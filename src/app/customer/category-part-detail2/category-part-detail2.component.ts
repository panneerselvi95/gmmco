import { Component, OnInit } from '@angular/core';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';
import { getAnalytics, logEvent } from 'firebase/analytics';

@Component({
  selector: 'app-category-part-detail2',
  templateUrl: './category-part-detail2.component.html',
  styleUrls: ['./category-part-detail2.component.scss']
})
export class CategoryPartDetail2Component implements OnInit {

  galleryOptions: NgxGalleryOptions[] | any;
  galleryImages: NgxGalleryImage[] | any;
  galleryOptions_2:any;
  galleryImages_2:any;
  ShowCartDetails:boolean=false;
  constructor() { }
  ngAfterViewInit(){
    const analytics = getAnalytics();
  
  logEvent(analytics,'Front End Screen Views',{
    firebase_screen: 'Category Part Detail_2 Page', 
  firebase_screen_class: 'Category Part Detail_2 Page'
  })
}
  ngOnInit(): void {
    this.galleryOptions_2 = [
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

    this.galleryImages_2 = [
      {
        small: '../../../assets/images/slidermain_1.png',
        medium: '../../../assets/images/slidermain_1.png',
        big: '../../../assets/images/slidermain_1.png'
      },
      {
        small: '../../../assets/images/slider1_1.png',
        medium: '../../../assets/images/slider1_1.png',
        big: '../../../assets/images/slider1_1.png'
      },
      {
        small:  '../../../assets/images/slider2_1.png',
        medium: '../../../assets/images/slider2_1.png',
        big: '../../../assets/images/slider2_1.png'
      },
      {
        small: '../../../assets/images/slider3_1.png',
        medium: '../../../assets/images/slider3_1.png',
        big: '../../../assets/images/slider3_1.png'
      } ,
      {
        small: '../../../assets/images/slider4_1.png',
        medium: '../../../assets/images/slider4_1.png',
        big: '../../../assets/images/slider4_1.png'
      },
      {
        small:  '../../../assets/images/slider2_1.png',
        medium: '../../../assets/images/slider2_1.png',
        big: '../../../assets/images/slider2_1.png'
      },
    ];
  }


}
