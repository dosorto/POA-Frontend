import { Component, OnInit } from '@angular/core';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import { ActividadService } from '../../../services-poa/actividad.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-actividad',
  templateUrl: './create-actividad.component.html',
  styleUrls: ['./create-actividad.component.css']
})
export class CreateActividadComponent implements OnInit {
  constructor(private Storage:Storage, 
              private service:ActividadService,
              private router:Router,
              private _route: ActivatedRoute) { }

  ngOnInit(): void {
   
  }
  public idObjetivo:number = Number(this._route.snapshot.paramMap.get('idObjetivo'));
  toList(){
    this.router.navigate(['/gestion_pei/areas/list/',this.idObjetivo]);
  }
  async crearArea(nombre:string){
    console.log(nombre.toString(),this.idObjetivo);
    await this.service.crearArea(nombre,this.idObjetivo).subscribe((res:any)=>{
        Swal.fire({
        icon: 'success',
        title: '¡Creado con éxito!',
        showConfirmButton: false,
        timer: 2500
      })
      this.toList();
    },(error:any)=>{
      Swal.fire({
        icon: 'error',
        title: 'Ha ocurrido un error',
        showConfirmButton: false,
        timer: 2500
      })
    });
    setTimeout(function() {
      window.location.reload();
    },1500);
  }
}
