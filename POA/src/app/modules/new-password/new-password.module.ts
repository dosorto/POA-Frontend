import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NewPasswordComponent } from './new-password.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgForm, FormsModule } from '@angular/forms';
const router = RouterModule.forChild([
  {path: '', component: NewPasswordComponent}
])


@NgModule({
  declarations: [NewPasswordComponent],
  imports: [
CommonModule,
  router,
  BrowserModule,
  FormsModule
  ]
})
export class newPasswordModule { }
