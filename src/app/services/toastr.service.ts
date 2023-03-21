import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toast: ToastrService) { }


  showSuccess(message: string){
    this.toast.success(message);
  }
  showError(message: string){
    this.toast.error(message);
  }

  showInformation(message:string){
    this.toast.info(message);
  }

  
}
