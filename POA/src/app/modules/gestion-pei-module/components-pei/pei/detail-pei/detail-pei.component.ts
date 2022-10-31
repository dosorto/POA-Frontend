import { Component, OnInit } from '@angular/core';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import { PeiService } from '../../../services-pei/pei.service';
import { Pei } from '../../../interfaces-pei/pei.model';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-pei',
  templateUrl: './detail-pei.component.html',
  styleUrls: ['./detail-pei.component.css']
})
export class DetailPeiComponent implements OnInit {

  public idInstitucion:number = Number(this._route.snapshot.paramMap.get('idInsti'));
  public id:number = Number(this._route.snapshot.paramMap.get('id'));
  public pei:Pei | any = {};

  constructor(private service:PeiService,
              private router:Router,private _route: ActivatedRoute) { }

  ngOnInit(): void {
    this.initData();
  }

  async initData() {
    this.pei = this.service.getPEI_Id(this.id).subscribe((response:any)=>{
      this.pei = response.pei;
      console.log(response);
    }
    );
    console.log(this.pei);
  }

  toList(){
    this.router.navigate(['/gestion_pei/pei/list/',this.idInstitucion]); //revisar
  }
  toObjetivos(){
    this.router.navigate(['/gestion_pei/objetivos/list/',this.id]); // revisar
  }
  toUpdate(){
    this.router.navigate(['/gestion_pei/dimension/update/',this.id,this.idInstitucion]); //revisar
  }

  async Delete(){
    try{
    await this.service.eliminarPEI(this.id).subscribe((res:any)=>{
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
