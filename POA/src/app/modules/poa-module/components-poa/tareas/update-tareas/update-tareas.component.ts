import { Component, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Presupuesto } from '../../../interfaces-poa/presupuesto.model';
import { Tareas } from '../../../interfaces-poa/tareas.model';
import { TareasService } from '../../../services-poa/tareas.service';

@Component({
  selector: 'app-update-tareas',
  templateUrl: './update-tareas.component.html',
  styleUrls: ['./update-tareas.component.css']
})
export class UpdateTareasComponent implements OnInit {
  color: ThemePalette = 'primary';
  isPresupueseto=true;
  checked = false;
  disabled = false;
  selected = "4"
  isPresupuesto:boolean=false;
  
  public unidadmedida_seleccionado:string="";
  public objetogasto_seleccionado:string="";
  public grupogasto_seleccionado:string="";
  public fuente_seleccionado:string="";
  

  id = Number(this.route.snapshot.paramMap.get('id'));
  idActividad:number = Number(this.route.snapshot.paramMap.get('idActividad'));
  idPresupuesto:number = Number(this.route.snapshot.paramMap.get('idPresupuesto'));
  
  public tareas:Tareas | any = {};
  //variables 
  public nombre:string='';
  public descripcion:string='';
  public costounitario:number=0
  public cantidad:number=0
  public total:number=0
  public idobjeto:number=0
  public idfuente:number=0
  public idunidad:number=0



  constructor(private route: ActivatedRoute, 
    private router: Router, 
    private tareaservice:TareasService) { }

  ngOnInit(): void {
    if (this.id) {
      this.getTareass(this.id);  
    }
  }

  getTareass(id: number): void {
    this.tareaservice.getTareas(id).subscribe({
      next: tareas => {this.tareas = tareas}
      // error: err => this.errorMessage = err
    });
  }

  public tareass:Presupuesto | any = {};
  List:Array<Tareas>=[];
  mostrarObjeto(nombre:string): void {
    this.tareaservice.Probando(nombre).subscribe({
      next: tareas => {this.tareass = tareas}
      // error: err => this.errorMessage = err
    });
  }
  Update():any{
    let nombre = this.nombre;
    let descripcion = this.descripcion;
    let cantidad = this.cantidad;
    let costounitario = this.costounitario;
    let total = this.total;
    let idobjeto = this.idobjeto;
    let idfuente = this.idfuente;
    let idunidad = this.idunidad;
    console.log(":"+nombre+":" + ":"+descripcion);
     // validaciones
    if((nombre === '')){nombre = this.tareas.nombre}
    if((descripcion === '')){descripcion = this.tareas.descripcion}
    if((cantidad==0)){cantidad = this.tareas.presupuesto.cantidad}
    if((costounitario==0)){costounitario = this.tareas.presupuesto.costounitario}
    if((total==0)){total = this.tareas.presupuesto.total}
    if((idobjeto==0)){idobjeto = this.tareas.presupuesto.idobjeto}
    if((idfuente==0)){idfuente = this.tareas.presupuesto.idfuente}
    if((idunidad==0)){idunidad = this.tareas.presupuesto.idunidad}
    console.log(":"+nombre+":" + ":"+descripcion);
     try{
      total=cantidad*costounitario
      this.tareaservice.actualizarTarea(nombre,descripcion,this.id,this.isPresupueseto,this.idActividad,cantidad,this.idPresupuesto,costounitario,total,idobjeto,idfuente,idunidad).subscribe((res:any)=>{    
        Swal.fire({
        icon: 'success',
        title: '¡Actualizado con éxito!',
        showConfirmButton: false,
        timer: 2500
      })
     },(error:any)=>{
      
     });
this.onBack()

} catch(error){
  console.log(error);
  Swal.fire({
   icon: 'success',
   title: 'Ha ocurrido un error',
   showConfirmButton: false,
   timer: 2500,
 })
 this.onBack()
}

}

onBack(): void {
  this.router.navigate(['/gestion_poa/tareas/detail/',this.idActividad]);
}
toDetail(){
  this.router.navigate(['/gestion_poa/tareas/detail/',this.id,this.idActividad]);
}
}

