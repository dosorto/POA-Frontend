import { Component, OnInit } from '@angular/core';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import { AreasService } from '../../../services-pei/areas.service';
import { Area } from '../../../interfaces-pei/area.model';
import { Objetivo } from "../../../interfaces-pei/objetivo.model";
import { Dimension } from '../../../interfaces-pei/dimension.model';
<<<<<<< HEAD

=======
import { Pei } from '../../../interfaces-pei/pei.model';
>>>>>>> parent of c52b87fd (Revert "Merge branch 'branchCristhian'")
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
<<<<<<< HEAD
=======
  public pei:Pei | any = {};
>>>>>>> parent of c52b87fd (Revert "Merge branch 'branchCristhian'")



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
<<<<<<< HEAD
  

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
   
=======
  }

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
>>>>>>> parent of c52b87fd (Revert "Merge branch 'branchCristhian'")
