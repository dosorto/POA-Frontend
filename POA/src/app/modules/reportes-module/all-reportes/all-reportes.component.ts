import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Tareas } from '../../poa-module/interfaces-poa/tareas.model';
import { ReportesService } from '../services-reportes/reportes.service';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import { Depto } from '../../poa-module/interfaces-poa/depto.model';
import { Poa } from '../../poa-module/interfaces-poa/poa.model';

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

  public idDepto : number = 1;
  public idPoa :number=1;
  public listTareas : Array<Tareas>=[]
  public deptoList:Array<Depto> = [];
  public poaList : Array<Poa> = []

public departamento_seleccionado:number=this.idDepto;
public poa_seleccionado:number=this.idPoa;

  ngOnInit(): void {
    this.initData(),
    this.getDeptos()
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

    this.poaList = await firstValueFrom(this.service.getPoa(this.idDepto));
    console.log("00000000"+ this.poaList)

  }

  async getDeptos(){
    await this.service.getDepto().subscribe((response:Array<Depto>)=>{
      this.deptoList = response;
      console.log(response);
      return response;
    })
  }

  selectDepto(){
    this.router.navigate(['/reportes/list']);
    setTimeout(function () {
      window.location.reload();
    }, 10)
  }

  selectPoa(){
    this.router.navigate(['/reportes/list']);
    setTimeout(function () {
      window.location.reload();
    }, 10)
  }


}
