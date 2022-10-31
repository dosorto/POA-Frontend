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
  
  async crearArea(nombre:string){
    await this.service.crearArea(nombre,this.idObjetivo).subscribe((res:any)=>{
      console.log(res);
      Swal.fire({
        icon: 'success',
        title: 'Area registrada con éxito!',
        showConfirmButton: false,
        timer: 2500
      })
      setTimeout(function() {
        window.location.reload();
      },2500);
    }, (error: any) => {
      console.log(error);
    });
  }

}
