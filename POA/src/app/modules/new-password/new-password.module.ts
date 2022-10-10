import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NewPasswordComponent } from './new-password.component';
const router = RouterModule.forChild([
  {path: '', component: NewPasswordComponent}
])


@NgModule({
  declarations: [],
  imports: [
  CommonModule,
  router
  ]
})
export class newPasswordModule { }
