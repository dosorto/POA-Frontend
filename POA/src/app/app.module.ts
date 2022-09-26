import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
<<<<<<< HEAD
import { GetUserByIdComponent } from './get-user-by-id/get-user-by-id.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, NgControl } from '@angular/forms';
import { objToArrayPipe } from './objToArray.pipe';
import { CreateUserComponent } from './create-user/create-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';

=======
import { AlluserComponent } from './alluser/alluser.component';
import { HttpClientModule } from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
>>>>>>> d9a88ee22adecb84f29591f955e9fa1eafe78115
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
<<<<<<< HEAD
    GetUserByIdComponent,
    objToArrayPipe,
    CreateUserComponent,
    
=======
    AlluserComponent
>>>>>>> d9a88ee22adecb84f29591f955e9fa1eafe78115
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
<<<<<<< HEAD
    ReactiveFormsModule,
    NoopAnimationsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
=======
    NoopAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule
>>>>>>> d9a88ee22adecb84f29591f955e9fa1eafe78115
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
