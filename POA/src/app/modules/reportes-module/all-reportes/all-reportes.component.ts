import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Tareas } from '../../poa-module/interfaces-poa/tareas.model';
import { ReportesService } from '../services-reportes/reportes.service';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import { Depto } from '../../poa-module/interfaces-poa/depto.model';
import { Poa } from '../../poa-module/interfaces-poa/poa.model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-all-reportes',
  templateUrl: './all-reportes.component.html',
  styleUrls: ['./all-reportes.component.css']
})
export class AllReportesComponent implements OnInit {

  constructor(private Storage:Storage, 
    private service:ReportesService,
    private router:Router,
    private _route: ActivatedRoute,
    private _snackBar: MatSnackBar) { }

  public idDepto : number = 1;
  public idPoa :number=1;
  public listTareas : Array<Tareas>=[]
  public listnPTareas : Array<Tareas>=[]
  public listsPTareas : Array<Tareas>=[]

  public deptoList:Array<Depto> = [];
  public poaList : Array<Poa> = []
  public PoaList: Poa | any = {}

  public gastosFuente11:number=0
  public gastosFuente12:number=0  
  public gastosFuente12B:number=0  
  public listFuente11: Array<Tareas>=[];
  public listFuente12: Array<Tareas>=[];
  public listFuente12B: Array<Tareas>=[];

public departamento_seleccionado:number=this.idDepto;
public poa_seleccionado:number=this.idPoa;

openSnackBar() {
  this._snackBar.open('Procesando descarga'+' '+this.PoaList.name, 'undo', {
    horizontalPosition: 'start',
    verticalPosition: 'bottom',
    panelClass: ['mat-primary']
  });
}

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

    const nptareas = await firstValueFrom(this.service.getnoPTareas(this.idPoa))
    this.listnPTareas = nptareas;

    const sptareas = await firstValueFrom(this.service.getsiPTareas(this.idPoa))
    this.listsPTareas = sptareas;


    
    this.dataSource = this.listTareas;
    console.log("aqui",this.dataSource)

    this.poaList = await firstValueFrom(this.service.getPoa(this.idDepto));
    console.log("00000000"+ this.poaList)

    this.PoaList = await this.service.getPoa_Id(this.idPoa).subscribe((response:any)=>{
      this.PoaList = response.poa;
      //this.saldo= +this.PoaList.fuente11 -this.gastosFuente11
    })

        // obtengo la lista de las tareas que tienen presupuesto
    // fuente 11
    const Fuente11 = await firstValueFrom(this.service.getFuente11(this.idPoa))
    this.listFuente11 = Fuente11
    
    // fuente 12
    const Fuente12 = await firstValueFrom(this.service.getFuente12(this.idPoa))
    this.listFuente12 = Fuente12
    // fuente 12B
    const Fuente12B = await firstValueFrom(this.service.getFuente12B(this.idPoa))
    this.listFuente12B = Fuente12B

    this.gastosFuente11 = this.listFuente11.reduce((sum, value) => (typeof Number(value.presupuesto.total) == "number" ? sum + +value.presupuesto.total : sum), 0);
    //sumo todos los valores de las tareas que son agregadas a la fuente 12
    this.gastosFuente12 = this.listFuente12.reduce((sum, value) => (typeof +value.presupuesto.total == "number" ? sum + value.presupuesto.total : sum), 0);
    //sumo todos los valores de las tareas que son agregadas a la fuente 12B
    this.gastosFuente12B = this.listFuente12B.reduce((sum, value) => (typeof +value.presupuesto.total == "number" ? sum + value.presupuesto.total : sum), 0);


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
