import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import { DimensionService } from '../../../services-pei/dimension.service';
import { Dimension } from '../../../interfaces-pei/dimension.model';
import { Pei } from '../../../interfaces-pei/pei.model';
@Component({
  selector: 'app-detail-dimension',
  templateUrl: './detail-dimension.component.html',
  styleUrls: ['./detail-dimension.component.css']
})
export class DetailDimensionComponent implements OnInit {
  public idPei:number = Number(this._route.snapshot.paramMap.get('idPei'));
  public id:number = Number(this._route.snapshot.paramMap.get('id'));
  public dimension:Dimension | any = {};
  constructor(private Storage:Storage, 
              private service:DimensionService,
              private router:Router,
              private _route: ActivatedRoute) { }
  
  
  

  ngOnInit(): void {
    this.initData();
  }

  async initData(){
    this.dimension = await this.service.getDimension(this.id).subscribe((response:any)=>{
      this.dimension = response.dimension;
      console.log(response);
    }
    );
    console.log(this.dimension);
    
  }

  toList(){
    this.router.navigate(['/gestion_pei/dimension/list/',this.idPei]);
  }
  toObjetivos(){
    this.router.navigate(['/gestion_pei/objetivos/list/',this.id]);
  }
  toUpdate(){
    this.router.navigate(['/gestion_pei/dimension/update/',this.id,this.idPei]);
  }
  async Delete(){
    try{
    await this.service.eliminarDimension(this.id.toString()).subscribe((res:any)=>{
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
