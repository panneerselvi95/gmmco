import { Component, OnInit,ViewChild,ElementRef} from '@angular/core';
import { FleetService } from 'src/app/services/fleet.service';
import { ToastService } from 'src/app/services/toastr.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbModalRef, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { getAnalytics, logEvent } from "firebase/analytics";

@Component({
  selector: 'app-all-contacts',
  templateUrl: './all-contacts.component.html',
  styleUrls: ['./all-contacts.component.scss']
})
export class AllContactsComponent implements OnInit {
  @ViewChild('mymodal1') modal!: ElementRef;

  AddAddressForm!: FormGroup;
  title_dropdown: any = [];
  region_dropdown: any = [];
  currentCustomerId: any;
  active_tab: string = 'bill';
  primaryaddress:any;
  address_list: any = {
    'bill': [],
    'ship': []
  }
  allContacts: any;
  currentobj:any;
  IsUpdate: boolean = false;

  constructor(
    private modalRef: NgbActiveModal,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private fleetService: FleetService,
    private toaster: ToastService
  ) { }

  ngOnInit(): void {
    this.AddAddressForm = this.formBuilder.group({
      contact_email:['',[Validators.required,Validators.pattern(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      contact_name:['',[Validators.required]],
      contact_phone: ['',[Validators.required, Validators.minLength(10)]],
    });
    this.currentCustomerId = sessionStorage.getItem('id');
    
    this._getContacts_();
  }
  
  ngAfterViewInit(){
    const analytics = getAnalytics();
  
  logEvent(analytics,'Front End Screen Views',{
    firebase_screen: 'All Contacts Page', 
  firebase_screen_class: 'All Contacts Page'
  })
}
  saveContact() {
  this.fleetService._add_Contact(this.currentCustomerId,this.AddAddressForm.value.contact_email,this.AddAddressForm.value.contact_phone,this.AddAddressForm.value.contact_name).subscribe((data:any)=>{
    console.log(data)
    if(data.isSuccess ==  true){
      this.toaster.showSuccess('Contact Created Successfully')
      this._getContacts_();

      this.modalRef.close();

    }else{
      this.toaster.showError('Enter Details Wrong')
      this.modalRef.close();

    }
  })
  }
  get f() { return this.AddAddressForm.controls; }

  open(content: any, value:any) {
     value =='new'?this.IsUpdate=false:this.IsUpdate=true;
    this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }
  close() {
    this.AddAddressForm.reset();
    this.modalRef.close();
    this._getContacts_()
  }
  onNavChange(changeEvent: NgbNavChangeEvent) {
    this.AddAddressForm.patchValue({ address_type: changeEvent.nextId })
  }

_getContacts_(){
  let id :any  = sessionStorage.getItem('id')
this.fleetService._getAll_Contacts(id).subscribe((data:any)=>{
  this.allContacts = data.response;
console.log(data)
})
}
getEditData(data:any){
  console.log(data,"edit")
  this.IsUpdate = true;
  this.AddAddressForm.controls.contact_email.patchValue(data.email);
  this.AddAddressForm.controls.contact_name.patchValue(data?.name);
  this.AddAddressForm.controls.contact_phone.patchValue(data.telephone)
    
    
    
}


_Set_isDefault(cusid:any,cid:any,email:any){
// console.log(email)

this.currentobj = {
    
  "name": "contact",
  "ccOde": parseInt(cusid),
  "serialNumber": "string",
  "id":cid+""
}
if(email ===  ""){
console.log('yes')
this.open(this.modal,'new')
}else{
  
  this.fleetService._set_isDefault(  this.currentobj).subscribe((data:any)=>{
    console.log(data)
    
      if(data.isSuccess == true){
        this.toaster.showSuccess(data.response)
        this._getContacts_()
    
      }else{
        
        this.toaster.showError('Something Went Wrong')
      }
    })
}
  // alert(cusid)

}


setdeafultcall(){
  this.fleetService._set_isDefault(  this.currentobj).subscribe((data:any)=>{
    console.log(data)
    
      if(data.isSuccess == true){
        this.toaster.showSuccess(data.response)
       this.close();
    
      }else{
        this.toaster.showError('Something Went Wrong')
      }
    })
}




}
