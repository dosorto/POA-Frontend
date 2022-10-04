import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { GuardarCComponent } from './componentes/guardar-c/guardar-c.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { objToArrayPipe } from './objToArray.pipe';
import {MatPaginatorModule} from '@angular/material/paginator';

import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';
import { InsertPEIComponent } from './components/new-pei/new-pei.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './modules/login/login.component';
//import { AlluserComponent } from './alluser/alluser.component';

import {MatCardModule} from '@angular/material/card';


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
    GuardarCComponent,
    objToArrayPipe,

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
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatCardModule,
    ReactiveFormsModule

    
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
