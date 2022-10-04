import { Component, OnInit } from '@angular/core';
import { ObjetivosService } from './objetivos.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators, AbstractControl,ReactiveFormsModule } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { objetivo } from './objetivos.model';

@Component({
  selector: 'app-objetivos',
  templateUrl: './objetivos.component.html',
  styleUrls: ['./objetivos.component.css']
})
export class ObjetivosComponent implements OnInit {
  
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


  eliminarObjetivo(id: any) {
    this.objetivosService.eliminarObjetivo(id).subscribe((response:any) => {
      this.toastr.error('El producto fue eliminado con exito' ,'Producto Eliminado');
      this.mostrarObjetivo();
    }, error => {
      console.log(error);
    })
  }
// Función para obtener los datos del formulario y almacenarlos.
  postObjetivo(form:objetivo):any {
    this.objetivosService.postObjetivo(form).subscribe(data=>{
      console.log(data);
      window.location.reload();
      this.objetivo.reset();
    },(error:any)=>{
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
