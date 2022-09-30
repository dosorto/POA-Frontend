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
    UserroleComponent,
    objToArrayPipe,
    InsertPEIComponent,
    DisablePEIComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
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
