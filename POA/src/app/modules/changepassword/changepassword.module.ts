import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChangepasswordComponent } from './changepassword.component';

const router = RouterModule.forChild([
  {path: '', component: ChangepasswordComponent}
])


@NgModule({
  declarations: [],
  imports: [
  CommonModule,
  router
  ]
})
export class changePasswordModule { }