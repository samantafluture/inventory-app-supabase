import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule } from '@ngx-formly/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbCardModule, NbDialogModule, NbToastrModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NbDialogModule.forChild(),
    NbCardModule,
    NbToastrModule.forRoot(),
    ReactiveFormsModule,
    FormlyModule.forChild({
      validationMessages: [{ name: 'required', message: 'Required Field' }],
    }),
    FormlyBootstrapModule,
  ],
  exports: [
    CommonModule,
    NbDialogModule,
    NbCardModule,
    NbToastrModule,
    ReactiveFormsModule,
    FormlyModule,
    FormlyBootstrapModule,
  ],
})
export class BaseModule {}
