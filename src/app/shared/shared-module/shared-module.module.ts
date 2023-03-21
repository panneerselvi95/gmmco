import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {AccordionModule} from '@andreagrossetti/ngx-accordion';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AccordionModule
  ]

  ,exports:[
    CommonModule,
    AccordionModule
  ]
})
export class SharedModuleModule { }
