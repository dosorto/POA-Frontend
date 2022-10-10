import { Component, OnInit } from '@angular/core';
import { ObjetivosService } from './objetivos.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators, AbstractControl,ReactiveFormsModule, SelectControlValueAccessor } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { objetivo } from './objetivos.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-objetivos',
  templateUrl: './objetivos.component.html',
  styleUrls: ['./objetivos.component.css']
})
export class ObjetivosComponent implements OnInit {
  _delete:any;
    public objetivo:FormGroup = new FormGroup({
    nombre: new FormControl('',[Validators.required]),
    idDimension: new FormControl('',[Validators.required]),
    idPei: new FormControl('',[Validators.required])
  })
  


  objetivosList: any = [];
    //id=String;
  //dataSource = this.userList;  // MatPaginator Output
    /*@ViewChild(MatPaginator) paginator!: MatPaginator; 
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }*/


  constructor( private objetivosService:ObjetivosService,private router: Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    console.log(this.objetivo);
    console.log('El componente se ha inicializado');
    //this.objetivosService.getObjetivos().subscribe((response:any) => console.log(response));
    //this.objetivosService.getObjetivos().subscribe((response:any) => this.objetivosList = response.allObjetivo);
    this.mostrarObjetivo();
  }

  mostrarObjetivo() {
    this.objetivosService.getObjetivos().subscribe((response:any) => 
    this.objetivosList = response.allObjetivo);
    
    }
    set_id_delete(id:Number){
      this._delete = id;
      console.log(this._delete)
    }
    async delete() {
      
      await this.objetivosService.eliminarObjetivo(this._delete)
      Swal.fire({
        title: 'Eliminado con exito',
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
  // eliminarObjetivo(id: any) {
  //   this.objetivosService.eliminarObjetivo(id).subscribe((response:any) => {
  //     this.toastr.error('El producto fue eliminado con exito' ,'Producto Eliminado');
  //     this.mostrarObjetivo();
  //   }, error => {
  //     console.log(error);
  //   })
  // }
// Función para obtener los datos del formulario y almacenarlos.
  postObjetivo(form:objetivo):any {
    this.objetivosService.postObjetivo(form).subscribe(data=>{
      console.log(data);
      Swal.fire({
        icon: 'success',
        title: '¡Objetivo Registrado!',
        showConfirmButton: false,
        timer: 2500
      })
      setTimeout(function() {
        window.location.reload();
      },2500);
    }, (error:any)=>{
      })
  }

//   agregarObjetivo(){
//     const OBJETIVO: Objetivo = {
//       nombre: this.objetivosForm.get('nombre')?.value,
//       idDimension: this.objetivosForm.get('idDimension')?.value,
//       idPei: this.objetivosForm.get('idPei')?.value,
//     }
//     console.log(OBJETIVO);
// this.objetivosService.insertarObjetivo(OBJETIVO).subscribe(data =>{
//   console.log('Agregado');
// }, error =>
//   console.log(error));
//   this.objetivosForm.reset();


//   }

}
