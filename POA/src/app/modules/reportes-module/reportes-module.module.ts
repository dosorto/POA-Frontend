import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportesModuleComponent } from './reportes-module.component';
import { RouterModule } from '@angular/router';

const router = RouterModule.forChild([
  {path: '', component: ReportesModuleComponent}
])

@NgModule({
  declarations: [
    ReportesModuleComponent
  ],
  imports: [
    CommonModule,
    router
  ]
})
export class ReportesModuleModule { }
