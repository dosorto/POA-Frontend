import { Component, OnInit } from '@angular/core';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import { AreasService } from '../../../services-pei/areas.service';
import { Area } from '../../../interfaces-pei/area.model';
import { Objetivo } from "../../../interfaces-pei/objetivo.model";
import { Dimension } from '../../../interfaces-pei/dimension.model';
import { Pei } from '../../../interfaces-pei/pei.model';
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
  //public area:Area | any = {};
  public dimension:Dimension | any = {};
  public pei:Pei | any = {};
  area: Area | any = {};
  errorMessage = '';



  _delete:string="";


  constructor(private Storage:Storage, 
              private service:AreasService,
              private router:Router,
              private _route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = Number(this._route.snapshot.paramMap.get('id'));
    if (id) {
      this.getAreas(id);  
    }
    console.log(this.area?.id)
   
  }
  getAreas(id: number): void {
    this.service.getAreass(id).subscribe({
      next: area => {this.area = area},
      error: err => this.errorMessage = err
    });
  }
  
   /*async initData(){
    this.area = await this.service.getAreass(this.id).subscribe((response:any)=>{
      this.area = response.area;
      console.log(response);
    }
    );
    console.log(this.area);
  } */

  /*this.dimension = await this.service.getDimension(this.id).subscribe((response:any)=>{
    this.dimension = response.dimension;
    console.log(response);
  }
  );
  console.log(this.dimension);

this.pei = this.service.getPEI_Id(this.id).subscribe((response:any)=>{
  this.pei = response.pei;
  console.log(response);
}
);
console.log(this.pei);
*/

  toList(){
    this.router.navigate(['/gestion_pei/areas/list/',this.idObjetivo]);
  }
  toResultados(){
    this.router.navigate(['/gestion_pei/resultados/list/',this.id]);
  }
  toUpdate(){
    this.router.navigate(['/gestion_pei/areas/update/',this.id,this.idObjetivo]);
  }

  async Delete(){
    try{
    await this.service.eliminarArea(this.id).subscribe((res:any)=>{
      Swal.fire({
        icon: 'success',
        title: '¡Eliminado con éxito!',
        showConfirmButton: false,
        timer: 1000
      })
    });
    setTimeout(function() {
      window.location.reload();
    },1000);
    this.toList();
  }catch(error){
    Swal.fire({
      icon: 'error',
      title: '¡Ha ocurrido un error!',
      showConfirmButton: false,
      timer: 1000
    })
    setTimeout(function() {
    window.location.reload();
    },1000);
  
  }
  }
}