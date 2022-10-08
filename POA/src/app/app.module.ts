import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, NgForm} from '@angular/forms'
import { NgFor } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { MatTableModule } from '@angular/material/table';


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
import { ToastrModule } from 'ngx-toastr';
import { TopBarComponent } from './_core/top-bar/top-bar.component';
import { SidebarComponent } from './_core/sidebar/sidebar.component';

import { ObjetivosComponent } from './objetivos/objetivos.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    //AlluserComponent,
    IdUserComponent,
    RolComponent,
    GetUserByIdComponent,
    TopBarComponent,
    SidebarComponent,
    ObjetivosComponent,
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