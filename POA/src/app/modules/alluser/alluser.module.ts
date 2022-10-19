import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AlluserComponent } from './alluser.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { PaginacionPipe } from './paginacion.pipe';
import { FilterPipePipe } from './filter-pipe.pipe';
import { ObjToArrayPipe } from './obj-to-array.pipe';
import { FormsModule } from '@angular/forms';
const router = RouterModule.forChild([
  {path: '', component: AlluserComponent}
])
@NgModule({
  declarations: [
    AlluserComponent,
    PaginacionPipe,
    FilterPipePipe,
    ObjToArrayPipe
  ],
  imports: [
CommonModule,
    router,
    MatPaginatorModule,
    FormsModule
    
  ]
})
export class UsuarioModule { }