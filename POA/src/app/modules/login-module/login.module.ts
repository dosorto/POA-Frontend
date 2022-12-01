import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { FormsModule } from '@angular/forms';
import { NewPasswordComponent } from './new-password/new-password.component';

const router = RouterModule.forChild([
  {path: '', component: LoginComponent},
  {path: 'forgotPassword', component: ForgotPasswordComponent},
  {path: 'newPassword', component: NewPasswordComponent}

])


@NgModule({
  declarations: [
    ForgotPasswordComponent,
    NewPasswordComponent
  ],
  imports: [
  CommonModule,
  router,
  FormsModule
  ]
})
export class LoginModule { }
