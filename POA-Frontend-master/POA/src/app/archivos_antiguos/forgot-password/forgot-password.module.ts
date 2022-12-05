import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password.component';

const router = RouterModule.forChild([
  {path: '', component: ForgotPasswordComponent}
])


@NgModule({
  declarations: [],
  imports: [
  CommonModule,
  router
  ]
})
export class ForgorPasswordModule { }
