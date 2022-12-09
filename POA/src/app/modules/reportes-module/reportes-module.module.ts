import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportesModuleComponent } from './reportes-module.component';
import { RouterModule } from '@angular/router';

import { TopBarComponent } from 'src/app/_core/top-bar/top-bar.component';
import { AllReportesComponent } from './all-reportes/all-reportes.component';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { BackButtonComponent } from 'src/app/_core/back-button/back-button.component';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import { MatTableExporterModule } from 'mat-table-exporter';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModel, FormControl, FormsModule} from '@angular/forms';

const router = RouterModule.forChild([
  {path: '', component: ReportesModuleComponent},

  {path: 'list', component: AllReportesComponent},
])

@NgModule({
  declarations: [
    ReportesModuleComponent,
    AllReportesComponent

  ],
  imports: [
    CommonModule,
    router,
    TopBarComponent,
    MatCardModule,
    MatTabsModule,
    BackButtonComponent,
    MatButtonModule,
    MatTableModule,
    MatTableExporterModule,
    NgSelectModule,
    FormsModule
  ]
})
export class ReportesModuleModule { }
