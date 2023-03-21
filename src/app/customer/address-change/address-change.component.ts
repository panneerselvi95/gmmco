import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { getAnalytics, logEvent } from "firebase/analytics";

@Component({
  selector: 'app-address-change',
  templateUrl: './address-change.component.html',
  styleUrls: ['./address-change.component.scss']
})
export class AddressChangeComponent implements OnInit {

  closeResult: any;
  href: string='null';

  constructor(private modalService: NgbModal , private router: Router) { }

  ngOnInit(): void {
    // this.add_chatinline();
    // console.log("url plz")
    // localStorage.setItem("urlname" , "address-change");
    // this.href = this.router.url;
    //     console.log(this.router.url , "url");
  }


  ngAfterViewInit(){
   const analytics = getAnalytics();
  
  logEvent(analytics,'Front End Screen Views',{
    firebase_screen: 'Address Change Page', 
  firebase_screen_class: 'Address Change Page'
  })
}

// add_chatinline(){
//   const analytics = getAnalytics();
//   logEvent(analytics,'Front End Chat Screen',{
//     firebase_screen: 'AddressChangePage to ChatScreen', 
//   firebase_screen_class: 'AddressChangePage to ChatScreen'
//   })
// }


  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
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
      return  `with: ${reason}`;
    }
  }

}


