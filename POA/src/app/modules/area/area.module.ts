import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AreaComponent } from './area.component';
import { FormsModule } from '@angular/forms';
const router = RouterModule.forChild([
  {path: '', component: AreaComponent}
])

@NgModule({
  declarations: [
    AreaComponent
  ],
  imports: [
CommonModule,
    router,
    FormsModule 
  ]
})
export class peiModule { }