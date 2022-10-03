import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
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
import { LoginComponent } from './modules/login/login.component';
//import { AlluserComponent } from './alluser/alluser.component';
import { HttpClientModule } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';

import { IdUserComponent } from './id-user/id-user.component';
import { RolComponent } from './rol/rol.component';
import { GetUserByIdComponent } from './get-user-by-id/get-user-by-id.component';
import { objToArrayPipe } from './objToArray.pipe';
import { ToastrModule } from 'ngx-toastr';
import { TopBarComponent } from './_core/top-bar/top-bar.component';
import { SidebarComponent } from './_core/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    //AlluserComponent,
    IdUserComponent,
    RolComponent,
    GetUserByIdComponent,
    objToArrayPipe,
    TopBarComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NoopAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatTableModule,
    ToastrModule.forRoot(),
    FormsModule,
    NgFor
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
