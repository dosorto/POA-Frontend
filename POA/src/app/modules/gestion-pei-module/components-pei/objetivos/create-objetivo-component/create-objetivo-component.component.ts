import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { ObjetivosService } from '../../../services-pei/objetivos.service';
@Component({
  selector: 'app-create-objetivo-component',
  templateUrl: './create-objetivo-component.component.html',
  styleUrls: ['./create-objetivo-component.component.css']
})
export class CreateObjetivoComponentComponent implements OnInit {

  constructor(private objetivosService:ObjetivosService,private _router: Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.initData()
    this.initData_Dimension()
  }

  public dimension_seleccionado:string="";
  public pei_seleccionado:string="";
  dimensionList: any = [];
  peisList:any=[];

  async initData() {
    this.objetivosService.getPEI().subscribe((data:any) =>console.log(data));
    this.objetivosService.getPEI().subscribe((data:any) =>this.peisList = data);
  }

  async initData_Dimension(){

    this.objetivosService.getdimensiones().subscribe((data:any) =>console.log(data));
  this.objetivosService.getdimensiones().subscribe((data:any) =>this.dimensionList = data);
  }

  public objetivo:FormGroup = new FormGroup({
    nombre: new FormControl('',[Validators.required]),
    descripcion: new FormControl('',[Validators.required]),
    idDimension: new FormControl('',[Validators.required]),
    idPei: new FormControl('',[Validators.required])
  })
  
  async crear_Objetivo(nombre:string,descripcion:string,idDimension:string, idPei:string){
    await this.objetivosService.crearObjetivo(nombre,descripcion,parseInt(idDimension),parseInt(idPei)).subscribe((res:any)=>{
      Swal.fire({
        icon: 'success',
        title: '¡Creado con éxito!',
        showConfirmButton: false,
        timer: 2500
      })
    },(error:any)=>{
      Swal.fire({
        icon: 'error',
        title: 'Ha ocurrido un error',
        showConfirmButton: false,
        timer: 1500
      })
    });
    this.onBack()
  }
  onBack(): void {
    this._router.navigate(['/gestion_pei/objetivos/list']);
  }
}
