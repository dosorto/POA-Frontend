import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChangepasswordComponent } from './changepassword.component';
import { FormsModule } from '@angular/forms';
const router = RouterModule.forChild([
  {path: '', component: ChangepasswordComponent}
])


@NgModule({
  declarations: [ChangepasswordComponent],
  imports: [
CommonModule,
  router,
  NgFor,
  FormsModule
  ]
})
export class changePasswordModule { }