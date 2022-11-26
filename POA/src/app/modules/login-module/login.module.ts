import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';

const router = RouterModule.forChild([
  {path: '', component: LoginComponent}
])


@NgModule({
  declarations: [],
  imports: [
  CommonModule,
  router
  ]
})
export class LoginModule { }
