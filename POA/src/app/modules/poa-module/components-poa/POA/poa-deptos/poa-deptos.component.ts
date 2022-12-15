import { Component, OnInit ,OnDestroy} from '@angular/core';
import { Storage } from '../../../../../_core/global-services/local_storage.service';
import { UnidadEjecutora } from '../../../interfaces-poa/unidad_ejecutora.model';
import { ActivatedRoute, Router } from '@angular/router';
import { UePresupuesto } from '../../../services-poa/ue_presupuesto.service';
import { UePresupuestoModel } from '../../../interfaces-poa/ue_presupuesto.model';
import { Depto } from '../../../interfaces-poa/depto.model';
import { CantidadPresupuestada } from '../../../interfaces-poa/cantidadPresupuestado.model';
import { Poa } from '../../../interfaces-poa/poa.model';


@Component({
  selector: 'app-presupuesto-poa',
  templateUrl: './poa-deptos.component.html',
  styleUrls: ['./poa-deptos.component.css']
})
export class PoaDeptosComponent implements OnInit {

  constructor(private Storage:Storage,
              private _route:ActivatedRoute,
              private service:UePresupuesto,
              private router:Router) { }
  public departamentosFromDb:Array<Depto> = [];
  public user:any={}; // usuario logueado (no es tipo user, es un json)
  public idUESelect: number = Number(this.Storage.get_storage('idUe'));
  public UAListFromDb:Array<UnidadEjecutora> = [];
  public listStatusDepto:Array<Boolean>=[];
  public UnidadEjecutoraSeleccionada: number = 1;
  public filter:string='';

  public page: number = 0;
  public actualpage: number = 1;
  public step: number = 40;
  public maxPages: number = 1;
  public enumPages: number[] = [];
  public presupuestos:CantidadPresupuestada|any;
  public idUePresupuesto: number = Number(this._route.snapshot.paramMap.get('id'));
  public UePresupesto:UePresupuestoModel|any;



  ngOnInit(): void {
    this.user = this.Storage.get_storage('user');
    this.idUESelect = Number(this.Storage.get_storage('idUe'));
    this.InitData()
  }
  

   async InitData(){
    this.service.getrUE(this.idUePresupuesto).subscribe(
      (response:any)=>{
        this.UePresupesto = response
        // por cuestion de tiempos toca meterlo en el response para que busque cuando ya tenga el a;o
        this.service.getPresupuestoforUE(this.user.empleado.ejecutora.id,this.UePresupesto.anio).subscribe(
          (response:any)=>{
            this.presupuestos = response;
            console.log(response)
          }
        )
        this.service.getdepartamentos().subscribe(
          (response: any) => {
            this.departamentosFromDb = response;
            this.getStatusFromDeptos(response,this.UePresupesto.anio);
        })
        
      }
      
    )
    
    
  }
  selectUA(){

  }
  async getStatusFromDeptos(deptos:Array<Depto>,anio:string){
    for(let x of deptos){
      await this.service.getStatusOfDepto(x.id,this.user.empleado.ejecutora.id,anio).subscribe(
          (response:any) =>{this.listStatusDepto.push(response.res)},
          (error:any)=>{this.listStatusDepto.push(error.res)}
      )
    }
  }
  toCreate( id:number){
    this.router.navigate(['/gestion_poa/poa/create/', this.user.empleado.ejecutora.Institucion.id,this.user.empleado.ejecutora.id,id,this.UePresupesto.id,this.UePresupesto.anio]);
  }
  toHome(){

  }
  toDetail(id:number){
    let poa:Poa|any;
    this.service.getStatusOfDepto(id,this.user.empleado.ejecutora.id,'2022').subscribe(
      (response:any) =>{poa = response.poa
        this.router.navigate(['/gestion_poa/poa/detail/', poa.id.toString(),this.user.empleado.ejecutora.Institucion.id,this.user.empleado.ejecutora.id ,id,this.idUePresupuesto,this.UePresupesto.anio]);}
  )
    
  }
  nextPage(){
    this.page = this.page + this.step;
    this.actualpage++;
  }
  previousPage(){
    this.page = this.page - this.step;
    this.actualpage--;
  }
  selectPage(numPage:number){
    this.page = numPage * this.step;
  }
}
