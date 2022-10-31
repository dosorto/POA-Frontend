import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { Objetivo } from '../../../interfaces-pei/objetivo.model';
import { ObjetivosService } from '../../../services-pei/objetivos.service';
@Component({
  selector: 'app-create-objetivo-component',
  templateUrl: './create-objetivo-component.component.html',
  styleUrls: ['./create-objetivo-component.component.css']
})
export class CreateObjetivoComponentComponent implements OnInit {
  errorMessage = '';
  objetivos: Objetivo | undefined;
  constructor(private _route: ActivatedRoute,private objetivosService:ObjetivosService,private _router: Router,private toastr: ToastrService) { }
   id = Number(this._route.snapshot.paramMap.get('id'));
  ngOnInit(): void {
    const id = Number(this._route.snapshot.paramMap.get('id'));
    this.initData()
    this.initData_Dimension()
    console.log(this.objetivos?.id)
    // this.mostrarObjetivo(id),
    this.initData_Dimension();
    // console.log(this.mostrarObjetivo);
    this.objetivosService.getObjetivos().subscribe((response:any) =>console.log(response))
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
   
  })

  getObjetivoss(id: number): void {
    this.objetivosService.getObjetivo(id).subscribe({
      next: objetivo => {this.objetivos = objetivo},
      error: err => this.errorMessage = err
    });
  }
  
  async crear_Objetivo(nombre:string,descripcion:string){
    await this.objetivosService.crearObjetivo(nombre,descripcion,this.id).subscribe((res:any)=>{
      Swal.fire({
        icon: 'success',
        title: '¡Creado con éxito!',
        showConfirmButton: false,
        timer: 2500
      })
      this.onBack()
    },(error:any)=>{
      Swal.fire({
        icon: 'error',
        title: 'Ha ocurrido un error',
        showConfirmButton: false,
        timer: 1500
      })
    });
    // this.onBack()
  }
  onBack(): void {
    this._router.navigate(['/gestion_pei/objetivos/list/',this.id]);
  }
}
