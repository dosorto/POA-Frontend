import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RevisionComponent } from './revision.component';
import { RouterModule } from '@angular/router';
import { TopBarComponent } from '../../_core/top-bar/top-bar.component';
import { RevisarTareasComponent } from './components/revisar-tareas/revisar-tareas.component';
import { TareasRevisadasComponent } from './components/tareas-revisadas/tareas-revisadas.component';
import { TareasAprobadasComponent } from './components/tareas-aprobadas/tareas-aprobadas.component';
import { TareasRechazadasComponent } from './components/tareas-rechazadas/tareas-rechazadas.component';
import { BackButtonComponent } from 'src/app/_core/back-button/back-button.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { BrowserModule } from '@angular/platform-browser';
import {MatTabsModule} from '@angular/material/tabs';
import { NzTableModule } from 'ng-zorro-antd/table';

const router = RouterModule.forChild([
  {path: '', component: RevisionComponent},
  {path: 'tareas/:id', component: RevisarTareasComponent},
  {path: 'revisadas/:id', component: TareasRevisadasComponent},
  {path: 'aprobadas/:id', component: TareasAprobadasComponent},
  {path: 'rechazadas/:id', component: TareasRechazadasComponent},
]
)


@NgModule({
  declarations: [
    RevisionComponent,
    RevisarTareasComponent,
    TareasRevisadasComponent,
    TareasAprobadasComponent,
    TareasRechazadasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    router,
    TopBarComponent,
    BackButtonComponent,
    NzInputModule,
    MatTabsModule,
    NzTableModule
  ]
})
export class RevisionModule { }
