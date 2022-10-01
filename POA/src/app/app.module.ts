import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {MatPaginatorModule} from '@angular/material/paginator';

import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';
import { InsertPEIComponent } from './components/new-pei/new-pei.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListPermisosComponent } from './components/list-permisos/list-permisos.component';
import { AgregarEditarPermisoComponent } from './components/agregar-editar-permiso/agregar-editar-permiso.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Modulos
import { SharedModule } from './shared/shared.module';
import { ListPEIComponent } from './components/list-pei/list-pei.component';
import { AllAgregarActualizarDesactivarPeiComponent } from './components/all-agregar-actualizar-desactivar-pei/all-agregar-actualizar-desactivar-pei.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UserroleComponent } from './components/userrole/userrole.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { objToArrayPipe } from './objToArray.pipe';
import { DisablePEIComponent } from './components/disable-pei/disable-pei.component';


@NgModule({
  declarations: [
    AppComponent,
    ListPermisosComponent,
    AgregarEditarPermisoComponent,
    ListPEIComponent,
    AllAgregarActualizarDesactivarPeiComponent,
    UserroleComponent,
    objToArrayPipe,
    InsertPEIComponent,
    DisablePEIComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    NoopAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
