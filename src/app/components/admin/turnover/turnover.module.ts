import { BaseModule } from 'src/app/shared/base/base.module';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select'
import { TurnoverRoutingModule } from './turnover-routing.module';
import { TurnoverComponent } from './turnover.component';


@NgModule({
  declarations: [
    TurnoverComponent
  ],
  imports: [
    BaseModule,
    NgSelectModule,
    TurnoverRoutingModule,
  ]
})
export class TurnoverModule { }
