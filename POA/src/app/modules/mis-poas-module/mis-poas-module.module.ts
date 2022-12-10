import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MisPoasModuleComponent } from './mis-poas-module.component';
import { RouterModule } from '@angular/router';

const router = RouterModule.forChild([
  {path: '', component: MisPoasModuleComponent},

  {path: 'mipoa/list', component: MisPoasModuleComponent},

])

@NgModule({
  declarations: [
    MisPoasModuleComponent
  ],
  imports: [
    CommonModule,
    router
  ]
})
export class MisPoasModuleModule { }
