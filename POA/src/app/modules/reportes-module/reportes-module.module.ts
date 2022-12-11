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
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { es_ES } from 'ng-zorro-antd/i18n';
import es from '@angular/common/locales/es';
import { registerLocaleData } from '@angular/common';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NgModel, FormControl, FormsModule} from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzProgressModule } from 'ng-zorro-antd/progress';
import {MatIconModule} from '@angular/material/icon';


registerLocaleData(es);

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
    MatSnackBarModule,
    NzStatisticModule,
    NzGridModule,
    FormsModule,
    NzIconModule,
    NzProgressModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: es_ES }
  ]
})
export class ReportesModuleModule { }

