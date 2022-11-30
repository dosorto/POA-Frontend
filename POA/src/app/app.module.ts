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
import { LoginComponent } from './modules/login-module/login.component';
import {MatCardModule} from '@angular/material/card';
import { ToastrModule } from 'ngx-toastr';
import { TopBarComponent } from './_core/top-bar/top-bar.component';
import { ChangepasswordComponent } from './modules/changepassword/changepassword.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChangepasswordComponent,
   

  ],
  imports: [
    NgSelectModule,
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
    ReactiveFormsModule ,
    TopBarComponent,
    MatSlideToggleModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }