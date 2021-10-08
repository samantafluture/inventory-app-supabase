import {
  NbButtonModule,
  NbIconModule,
  NbLayoutModule,
  NbMenuModule,
  NbSidebarModule,
} from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbIconModule,
    NbEvaIconsModule,
    NbButtonModule,
  ],
})
export class DashboardModule {}
