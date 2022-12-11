import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevisionComponent } from './revision.component';
import { RouterModule } from '@angular/router';
import { RevisarTareasComponent } from './components/revisar-tareas/revisar-tareas.component';
import { TareasRevisadasComponent } from './components/tareas-revisadas/tareas-revisadas.component';
import { TareasAprobadasComponent } from './components/tareas-aprobadas/tareas-aprobadas.component';
import { TareasRechazadasComponent } from './components/tareas-rechazadas/tareas-rechazadas.component';

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
    router
  ]
})
export class RevisionModule { }
