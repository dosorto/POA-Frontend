import { Component, OnInit } from '@angular/core';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import { PeiService } from '../../../services-pei/pei.service';
import { Pei } from '../../../interfaces-pei/pei.model';
import { firstValueFrom } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Institucion } from 'src/app/modules/administracion-module/interfaces/institucion.model';
@Component({
  selector: 'app-update-pei',
  templateUrl: './update-pei.component.html',
  styleUrls: ['./update-pei.component.css']
})
export class UpdatePeiComponent implements OnInit {

  constructor(private Storage:Storage, 
    private service:PeiService,
    private router:Router,
    private peiService:PeiService,
    private _route: ActivatedRoute) { }

    public idInsti:number = Number(this._route.snapshot.paramMap.get('idInsti'));
    public pei : Pei | any = {};
    public insti:Institucion|any={};
    public id:number = Number(this._route.snapshot.paramMap.get('id'));
    public name:string='';
    public initialYear:string='';
    public FinalYear:string='';

  ngOnInit(): void {
    this.initData();
    console.log(this.initData)
    this.insti = this.peiService.getInsti_Id(this.idInsti).subscribe((response: any) => {
      this.insti = response.Institucion;
    });
  }

  async initData() {
    this.pei = await this.service.getPEI_Id(this.id).subscribe((response:any)=>{
      this.pei = response.pei;
      console.log(response);
    }
    );
    console.log(this.pei)
  }

  toDetail(idPei:number){
    console.log(this.idInsti)
    this.router.navigate(['gestion_pei/pei/detail/',idPei.toString(),this.idInsti]);

  }
  // toDetail(){
  //   this.router.navigate(['/gestion_pei/pei/detail/',this.id,this.idInsti]);
  // }

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


  Update():any{
    let name = this.name;
    let initialYear = this.initialYear;
    let finalYear = this.FinalYear;
    console.log(":"+name+":" + ":"+initialYear+":"+finalYear);
     // validaciones
    if((name === '')){name = this.pei.name}
    if((initialYear === '')){initialYear = this.pei.initialYear}
    if((finalYear === '')){finalYear = this.pei.finalYear}

    console.log(":"+name+":" + ":"+initialYear+":"+finalYear);
     try{
      if (initialYear < finalYear) {
         this.service.updatePEI(name,initialYear,finalYear,this.id,this.idInsti).subscribe((res: any) => {
          console.log(res);
        },);
        Swal.fire({
          icon: 'success',
          title: '¡Registrado con éxito!',
          showConfirmButton: false,
          timer: 1500
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Ha ocurrido un error, revise si ha introducido bien las fechas',
          showConfirmButton: false,
          timer: 1500
        })
      } 
      this.toDetail(this.id);
   } catch(error){
     console.log(error);
   }
   setTimeout(function() {
    window.location.reload();
  },1500);  
  }
}
