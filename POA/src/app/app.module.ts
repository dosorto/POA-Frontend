import { NgModule } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {MatPaginatorModule} from '@angular/material/paginator';

import { MatTableModule } from '@angular/material/table';
import { RouterModule, Routes } from '@angular/router';
import { InsertPEIComponent } from './components/new-pei/new-pei.component';
import { NgFor } from '@angular/common';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

//Modulos
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
import { ObjetivosComponent } from './objetivos/objetivos.component';
import { ForgotPasswordComponent } from './modules/forgot-password/forgot-password.component';
import { ChangepasswordComponent } from './modules/changepassword/changepassword.component';





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
    SidebarComponent,
    ObjetivosComponent,
    ForgotPasswordComponent,
    ChangepasswordComponent,
    
 

    
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NoopAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatTableModule,
    NgFor,
    ToastrModule.forRoot(),
    FormsModule,
    NgFor,
    ReactiveFormsModule 
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
