import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AlluserComponent } from './alluser.component';
import {MatPaginatorModule} from '@angular/material/paginator';
const router = RouterModule.forChild([
  {path: '', component: AlluserComponent}
])
@NgModule({
  declarations: [
    AlluserComponent
  ],
  imports: [
CommonModule,
    router,
    MatPaginatorModule
  ]
})
export class UsuarioModule { }