import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import { DimensionService } from '../../../services-pei/dimension.service';
import { Dimension } from '../../../interfaces-pei/dimension.model';
import { Pei } from '../../../interfaces-pei/pei.model';
import { Institucion } from 'src/app/modules/administracion-module/interfaces/institucion.model';
import { PeiService } from '../../../services-pei/pei.service';
@Component({
  selector: 'app-update-dimension',
  templateUrl: './update-dimension.component.html',
  styleUrls: ['./update-dimension.component.css']
})
export class UpdateDimensionComponent implements OnInit {

  constructor(private Storage:Storage, 
              private service:DimensionService,
              private peiService:PeiService,
              private router:Router,
              private _route: ActivatedRoute) { }
  
  public idPei:number = Number(this._route.snapshot.paramMap.get('idPei'));
  public idInsti:number = Number(this._route.snapshot.paramMap.get('idInsti'));
  public id:number = Number(this._route.snapshot.paramMap.get('id'));
  public dimension:Dimension | any = {};
  public pei:Pei|any={};
  public insti:Institucion|any={};
  public nombre:string='';
  public descripcion:string='';

  ngOnInit(): void {
    this.initData();
  }

  async initData(){
    this.dimension = await this.service.getDimension(this.id).subscribe((response:any)=>{
      this.dimension = response.dimension;
      console.log(response);
    }
    );
    this.pei = this.peiService.getPEI_Id(this.idPei).subscribe((response:any)=>{
      this.pei = response.pei
    })
    this.insti = this.peiService.getInsti_Id(this.idInsti).subscribe((response:any)=>{
      this.insti = response.Institucion
    })
    console.log(this.dimension);
    
  }
  toDetail(){
    this.router.navigate(['/gestion_pei/dimension/detail/',this.id,this.idPei,this.idInsti]);
  }
  Update():any{
   let nombre = this.nombre;
   let descripcion = this.descripcion
   console.log(":"+nombre+":" + ":"+descripcion);
    // validaciones
   if((nombre === '')){nombre = this.dimension.nombre}
   if((descripcion === '')){descripcion = this.dimension.descripcion}

   console.log(":"+nombre+":" + ":"+descripcion);
    try{
     this.service.updateDimension(nombre,descripcion,this.id,this.idPei).subscribe((res:any)=>{
     
     Swal.fire({
       icon: 'success',
       title: '¡Actualizado con éxito!',
       showConfirmButton: false,
       timer: 2500
     })
    },(error:any)=>{
     Swal.fire({
       icon: 'error',
       title: 'Ha ocurrido un error',
       showConfirmButton: false,
       timer: 2500
     })
    });
    this.toDetail();
    
  } catch(error){
    console.log(error);
  }
  setTimeout(function() {
   window.location.reload();
 },1500);

 
 }

}
