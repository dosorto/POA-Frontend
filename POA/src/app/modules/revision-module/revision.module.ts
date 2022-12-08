import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevisionComponent } from './revision.component';
import { RouterModule } from '@angular/router';

const router = RouterModule.forChild([
  {path: '', component: RevisionComponent}
]
)


@NgModule({
  declarations: [
    RevisionComponent
  ],
  imports: [
    CommonModule,
    router
  ]
})
export class RevisionModule { }
