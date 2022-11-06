import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import { Dimension } from '../../../interfaces-pei/dimension.model';
import { Indicador } from '../../../interfaces-pei/indicadores.model'; 
import { Area } from '../../../interfaces-pei/area.model'
import { IndicadoresService } from '../../../services-pei/indicadores.service';

@Component({
  selector: 'app-update-indicador-component',
  templateUrl: './update-indicador-component.component.html',
  styleUrls: ['./update-indicador-component.component.css']
})
export class UpdateIndicadorComponentComponent implements OnInit {

  constructor(private Storage:Storage, 
              private indicadoresService:IndicadoresService,
              private router:Router,
              private _route: ActivatedRoute) { }

              public idResultado:number = Number(this._route.snapshot.paramMap.get('idResultado'));
              public id:number = Number(this._route.snapshot.paramMap.get('id'));
              public indicadores: Indicador | any = {};
              public nombre:string='';
              public descripcion:string='';
              
              ngOnInit(): void {
              this.initData();
              }
              
              async initData(){
              this.indicadores = await this.indicadoresService.getIndicadoress(this.id).subscribe((response:any)=>{
              this.indicadores = response.indicadores;
              console.log(response);
              }
              );
              console.log(this.indicadores);
              
              }
              toDetail(){
              this.router.navigate(['/gestion_pei/indicadores/detail/',this.id,this.idResultado]);
              }
              Update():any{
              let nombre = this.nombre;
              let descripcion = this.descripcion
              console.log(":"+nombre+":" + ":"+descripcion);
              // validaciones
              if((nombre === '')){nombre = this.indicadores.nombre}
              if((descripcion === '')){descripcion = this.indicadores.descripcion}
              
              console.log(":"+nombre+":" + ":"+descripcion);
              try{
              this.indicadoresService.updateIndicador(nombre,descripcion,this.id,this.idResultado).subscribe((res:any)=>{
              
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
              },1000);
              
              
              }
}
