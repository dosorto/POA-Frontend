import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Institucion } from 'src/app/modules/administracion-module/interfaces/institucion.model';
import { Actividad } from 'src/app/modules/poa-module/interfaces-poa/actividad.model';
import { Depto } from 'src/app/modules/poa-module/interfaces-poa/depto.model';
import { Indicadores } from 'src/app/modules/poa-module/interfaces-poa/Indicadores.model';
import { Poa } from 'src/app/modules/poa-module/interfaces-poa/poa.model';
import { Presupuesto } from 'src/app/modules/poa-module/interfaces-poa/presupuesto.model';
import { Tareas } from 'src/app/modules/poa-module/interfaces-poa/tareas.model';
import { PoaService } from 'src/app/modules/poa-module/services-poa/poa.service';
import { TareasService } from 'src/app/modules/poa-module/services-poa/tareas.service';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-revisar-tareas',
  templateUrl: './revisar-tareas.component.html',
  styleUrls: ['./revisar-tareas.component.css']
})
export class RevisarTareasComponent implements OnInit {

  color: ThemePalette = 'primary';
  isPresupueseto = false;
  checked = true;
  disabled = true;
  isPresupuesto: boolean = true;
  _delete: any;

  constructor(private route: ActivatedRoute, 
    private router: Router, 
    private tareaservice:TareasService) { }

  public listPresupuesto: Array<Presupuesto>=[];

  public idActividad:number = Number(this.route.snapshot.paramMap.get('idActividad'));
  public idDepto = Number(this.route.snapshot.paramMap.get('idDepto'));
  public idPoa = Number(this.route.snapshot.paramMap.get('idPoa'));
  public idInsti = Number(this.route.snapshot.paramMap.get('idInsti'));
  public id:number = Number(this.route.snapshot.paramMap.get('id'));

  public ActividadList: Actividad | any = {};
  public indicadores:Array<Indicadores>=[]; // para llenar la tabla
  public InstiList: Institucion | any = {};
  public DeptoList: Depto | any = {};
  public PoaList: Poa | any = {}
  public tareas: Tareas | any = {};
  public presupuesto: Presupuesto | any = {};
  public actividad: Actividad | any = {};


  ngOnInit(): void {
    if (this.id) {
      this.getTareass(this.id);
    }
  }

  getTareass(id: number): void {
    this.tareaservice.getTareas(id).subscribe({
      next: tareas => { this.tareas = tareas }
      // error: err => this.errorMessage = err
    });
  }
  async initData() {
    // const tareas = await firstValueFrom(this.tareaservice.getTarea(this.idActividad))
    // this.listTareas = tareas;

    // const presupuesto = await firstValueFrom(this.tareaservice.getPresupuesto(this.id))
    // this.listPresupuesto = presupuesto;
    this.InstiList = await this.tareaservice.getInsti_Id(this.idInsti).subscribe((response:any)=>{
      this.InstiList = response.Institucion;
    })

    this.DeptoList = await this.tareaservice.getDepto_Id(this.idDepto).subscribe((response:any)=>{
      this.DeptoList = response.departamento;
    })


    this.PoaList = await this.tareaservice.getPoa_Id(this.idPoa).subscribe((response:any)=>{
      this.PoaList = response.poa;
      //this.saldo= +this.PoaList.fuente11 -this.gastosFuente11
    })
    //console.log('esta es',this.saldo)

    this.ActividadList = await this.tareaservice.getActividad_Id(this.idActividad).subscribe((response:any)=>{
      this.ActividadList = response.actividad;
    })


    this.tareas = await this.tareaservice.getTareas(this.id).subscribe((response: any) => {
      this.tareas = response.tareas;
      console.log(response);
    }
      )
      
      console.log(this.tareas)
      

  }
  toList() {
    this.router.navigate(['/gestion_poa/actividad/tab/', this.idActividad,this.idPoa,this.idDepto,this.idInsti]); //revisar
    setTimeout(function () {
      window.location.reload();
    }, 10)
  }
  onBack(): void {
    this.router.navigate(['/revision/']);
    //tareas/list/:idActividad/:idPoa/:idDepto/:idInsti
    
  }
  toUpdate(){
    this.router.navigate(['/gestion_poa/tareas/update/',this.id,this.idActividad,this.idPoa,this.idDepto,this.idInsti]);
  }

  set_id_delete(id: any) {
    this._delete = id;
    console.log(this._delete)
  }

  async delete() {

    await this.tareaservice.eliminarTarea(this._delete)
    Swal.fire({
      title: 'Eliminado con exito',
      showConfirmButton: false,
      color: 'white',
      background: '#F5B7B1',
      timer: 300,
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }

    })
    this.onBack();
  }


}
