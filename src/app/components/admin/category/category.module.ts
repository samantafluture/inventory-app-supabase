import { BaseModule } from './../../../shared/base/base.module';
import { NgModule } from '@angular/core';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';

@NgModule({
  declarations: [CategoryComponent],
  imports: [
    BaseModule,
    CategoryRoutingModule,
    FormlyModule,
    FormlyBootstrapModule,
  ],
})
export class CategoryModule {}
