import { Component, OnInit } from '@angular/core';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import { AreasService } from '../../../services-pei/areas.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-area',
  templateUrl: './create-area.component.html',
  styleUrls: ['./create-area.component.css']
})
export class CreateAreaComponent implements OnInit {
  constructor(private Storage:Storage, 
              private service:AreasService,
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
