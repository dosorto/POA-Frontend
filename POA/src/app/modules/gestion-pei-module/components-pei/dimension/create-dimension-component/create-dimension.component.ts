import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import { DimensionService } from '../../../services-pei/dimension.service';
import { Dimension } from '../../../interfaces-pei/dimension.model';
import { Pei } from '../../../interfaces-pei/pei.model';
@Component({
  selector: 'app-create-dimension',
  templateUrl: './create-dimension.component.html',
  styleUrls: ['./create-dimension.component.css']
})
export class CreateDimensionComponent implements OnInit {

  constructor(private Storage:Storage, 
              private service:DimensionService,
              private router:Router,
              private _route: ActivatedRoute) { }

  ngOnInit(): void {
  }
  public idPei:number = Number(this._route.snapshot.paramMap.get('idPei'));
  public idInsti:number = Number(this._route.snapshot.paramMap.get('idInsti'));
  toList(){
    this.router.navigate(['/gestion_pei/dimension/list/',this.idPei,this.idInsti]); //revisar
  }
  async crear_Dimension(nombre:string,descripcion:string){
    console.log(nombre.toString(),descripcion,this.idPei);
    await this.service.crearDimension(nombre,descripcion,this.idPei).subscribe((res:any)=>{
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
    
  }
}
