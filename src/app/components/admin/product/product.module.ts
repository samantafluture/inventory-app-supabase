import { BaseModule } from './../../../shared/base/base.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';


@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    BaseModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
