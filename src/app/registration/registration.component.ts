import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';


import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ConfirmPasswordValidator } from '../shared/validator';
import { ToastService } from '../services/toastr.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbActiveModal, NgbModal, NgbModalRef, NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { getAnalytics, logEvent } from "firebase/analytics";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
  @ViewChild("input2") input2: ElementRef | any;
  registerForm!: FormGroup;
  closeResult: any;
  closeModal: any;
  eyeIcon: any = { password: "password", show: false, password1: "password", show1: false };
  envVar: any;
  submitted: boolean=false;
  revalue: boolean = false;
  changeDetector: any;
  constructor(private auth: AuthService,

    private formBuilder: FormBuilder,
    private toaster: ToastService,
    private router: Router, private activateroute: ActivatedRoute,
    private modalRef: NgbActiveModal,
    private modalService: NgbModal,

  ) {
    // this.registerForm = FormGroup;   
    this.createForm()
    this.envVar = environment;

  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    const analytics = getAnalytics();

    logEvent(analytics, 'Front End Screen Views', {
      firebase_screen: 'Registration Page',
      firebase_screen_class: 'Registration Page'
    })
  }

  open(content: any, e: any) {
    if (e.target.checked) {
      this.registerForm.controls.tC.patchValue(true)
      this.modalRef = this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });

    } else {
      console.log("ji")
      this.registerForm.controls.tC.patchValue("")
      console.log(this.registerForm.value)
    }
  }
  onKey(event: KeyboardEvent) {
    event.preventDefault();
    if (event.key === "Tab") {
        console.log('ole... tab');
        this.input2.nativeElement.value = "aha";
        this.changeDetector.detectChanges();
        this.input2.nativeElement.focus();
    }

  }

  createForm() {
    this.registerForm = this.formBuilder.group({
      ccode: [''],
      panNumber: ['', [Validators.required, Validators.minLength(10), Validators.pattern(/^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$/)]],
      // , Validators.pattern(/^[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}$/)
      mobile: ["", [Validators.required, Validators.minLength(10)]],
      tC: ["", [Validators.required]],
      customerName: new FormControl(''),
      companyName: new FormControl(''),

// NameValidator.noWhiteSpace
      password: ["", [Validators.required , Validators.minLength(7),Validators.maxLength(16) ,Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{7,}')]],
      // password: ["", Validators.required],
      passwordConfirm: ["", Validators.required],
      address: [''],
      pincode: [],

      permission: [''],
      status: [''],




    }, {
      validator: ConfirmPasswordValidator("password", "passwordConfirm")
    });
  }
  get f() { return this.registerForm.controls; }
  close() {
    this.modalRef.close();
  }


  clicktooglePassword(val: any) {

    if (val == 'pass') {


      if (this.eyeIcon.password === 'password') {
        this.eyeIcon.password = 'text';
        this.eyeIcon.show = true;
      } else {
        this.eyeIcon.password = 'password';
        this.eyeIcon.show = false;
      }

    } else {
      if (this.eyeIcon.password1 === 'password') {
        this.eyeIcon.password1 = 'text';
        this.eyeIcon.show1 = true;
      } else {
        this.eyeIcon.password1 = 'password';
        this.eyeIcon.show1 = false;
      }
    }
  }
  registration() {
    // alert(12)
    this.submitted=true;
    console.log(this.registerForm.value)

    // alert(this.registerForm.status)

    let formval = this.registerForm.value;
    formval['mobile'] = this.auth.encryptUsingAES256(this.registerForm.value.mobile)
    formval['panNumber'] = this.auth.encryptUsingAES256(this.registerForm.value.panNumber)
    formval['password'] = this.auth.encryptUsingAES256(this.registerForm.value.password)


    formval["isActive"] = true
    formval["createdOn"] = new Date()
    formval["admappOn"] = new Date()
    formval["regOn"] = new Date()
    formval["deactOn"] = new Date()
    formval["permission"] = new Date()
    formval["status"] = "string"
    console.log(formval, 'chking')
    // alert(1)
    if (this.registerForm.status == 'VALID' && this.registerForm.controls.tC.value != false) {
      // alert(2)
      this.auth._Register(formval).subscribe((data: any) => {
        console.log(data)
        this.submitted=false;
        if (data.isSuccess == false ) {

          this.toaster.showError(data.message)
          this.registerForm.reset();
          // for (let control in this.registerForm.controls) {
          //   this.registerForm.controls[control].setErrors(null);
          // }
          // this.registerForm.reset();

        } else {
          this.router.navigateByUrl('/login')
          this.toaster.showSuccess(data.message)
        }


      })
    } else {
      // this.toaster.showError('please fill (*) fields to register')
    }  
  }

  findInvalidControls() {
    const invalid = [];
    const controls = this.registerForm.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
    }
    return invalid;
}

panValidation(event: Event) {
//   const Eve = event.target as HTMLInputElement;
//   this.revalue = false;
//   if (Eve.value.length >= 6) {
//     var regex = /([A-Z]){5}$/;
//     this.revalue = regex.test(Eve.value)
//     console.log(Eve.value.length, "IF")
//   }
//   else if (Eve.value.length >= 7) {

//     var regex = /([A-Z]){5}([0-9]){4}$/;
//     this.revalue = regex.test(Eve.value)
//     console.log(Eve.value.length, "ELSE IF")
//   } else if (Eve.value.length >= 11) {
//     var regex = /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
//     this.revalue = regex.test(Eve.value)
//     console.log(Eve.value.length, "2ND if")
//   }
//   else {

//   }
let pan=this.registerForm.value;
    const regexp =  /([A-Z]){5}([0-9]){4}([A-Z]){1}$/;
    let check=regexp.test(pan);
}
}
