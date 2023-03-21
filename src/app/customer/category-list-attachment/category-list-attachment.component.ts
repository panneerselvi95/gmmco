import { Component, OnInit } from '@angular/core';
import { FleetService } from 'src/app/services/fleet.service';
import { Router, ActivatedRoute } from '@angular/router';
import { getAnalytics, logEvent } from "firebase/analytics";

@Component({
  selector: 'app-category-list-attachment',
  templateUrl: './category-list-attachment.component.html',
  styleUrls: ['./category-list-attachment.component.scss']
})
export class CategoryListAttachmentComponent implements OnInit {
  sno: any;
  partsCategory: any;

  constructor(private fleetservice:FleetService , private activateroute:ActivatedRoute , private router: Router) { }

 
  ngOnInit() {

    this.sno = this.activateroute.snapshot.params;
    console.log(this.sno['id2'])
    this._getCategoryDetails()
  }
  ngAfterViewInit(){
    const analytics = getAnalytics();
  
  logEvent(analytics,'Front End Screen Views',{
    firebase_screen: 'Category List Attachment Page', 
  firebase_screen_class: 'Category List Attachment Page'
  })
}

  _getCategoryDetails(){
   this.fleetservice._category_parts(this.sno['id1'],this.sno['id2']).subscribe((data:any)=>{

    this.partsCategory =  data.response;
   console.log(data)
   })
  }
}
