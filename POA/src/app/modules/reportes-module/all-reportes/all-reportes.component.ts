import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Tareas } from '../../poa-module/interfaces-poa/tareas.model';
import { ReportesService } from '../services-reportes/reportes.service';
import { Storage } from 'src/app/_core/global-services/local_storage.service';

@Component({
  selector: 'app-all-reportes',
  templateUrl: './all-reportes.component.html',
  styleUrls: ['./all-reportes.component.css']
})
export class AllReportesComponent implements OnInit {

  constructor(private Storage:Storage, 
    private service:ReportesService,
    private router:Router,
    private _route: ActivatedRoute) { }

  public idDepto : number=1;
  public idPoa :number=1;
  public listTareas : Array<Tareas>=[]

  ngOnInit(): void {
    this.initData()
  }
  displayedColumns: any[] = ['Nombre_Departamento',
  'Nombre_Poa','Año','Fuente11','Fuente12','Fuente12B','Nombre_Actividad','Estado'
 ,'Tipo_Actividad','Categoria_Actividad','Nombre_Tarea','Cantidad',
 'costo','total','fuente','grupo','objeto'
];
  dataSource:any[]=[]

  async initData(){
    const tareas = await firstValueFrom(this.service.getPoa_id_iddepto(this.idPoa,this.idDepto))
    this.listTareas = tareas;
    
    this.dataSource = this.listTareas;
    console.log("aqui",this.dataSource)
  }

}
