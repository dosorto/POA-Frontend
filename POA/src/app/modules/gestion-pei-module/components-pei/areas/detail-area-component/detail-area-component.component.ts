import { Component, OnInit } from '@angular/core';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import { AreasService } from '../../../services-pei/areas.service';
import { Area } from '../../../interfaces-pei/area.model';
import { Objetivo } from "../../../interfaces-pei/objetivo.model";
import { Dimension } from '../../../interfaces-pei/dimension.model';

import { firstValueFrom } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-detail-area-component',
  templateUrl: './detail-area-component.component.html',
  styleUrls: ['./detail-area-component.component.css']
})
export class DetailAreaComponentComponent implements OnInit {
  public idObjetivo:number = Number(this._route.snapshot.paramMap.get('idObjetivo'));
  public id:number = Number(this._route.snapshot.paramMap.get('id'));
  public area:Area | any = {};
  public dimension:Dimension | any = {};



  _delete:string="";


  constructor(private Storage:Storage, 
              private service:AreasService,
              private router:Router,
              private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initData();
  }
  
  async initData(){
    this.area = await this.service.getArea(this.id).subscribe((response:any)=>{
      this.area = response.area;
      console.log(response);
    }
    );
    console.log(this.area);
  

  this.dimension = await this.service.getDimension(this.id).subscribe((response:any)=>{
    this.dimension = response.dimension;
    console.log(response);
  }
  );
  console.log(this.dimension);
}

  toList(){
    this.router.navigate(['/gestion_pei/areas/list/',this.idObjetivo]);
  }
  toResultados(){
    this.router.navigate(['/gestion_pei/resultados/list/',this.id]);
  }
  toUpdate(){
    this.router.navigate(['/gestion_pei/areas/update/',this.id,this.idObjetivo]);
  }

  set_id_delete(nombre:string){
    this._delete = nombre;
    console.log(this._delete)
  }
  async delete(){
    await this.service.eliminarArea(this._delete);
    Swal.fire({
      title: 'Area eliminada con exito',
      showConfirmButton: false,
      color:'white',
      background:'#F5B7B1',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
      
    })
    setTimeout(function() {
      window.location.reload();
    },3000);
    
      
    window.location.reload();
    
  }


}
   
