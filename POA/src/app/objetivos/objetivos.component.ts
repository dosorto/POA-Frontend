import { Component, OnInit } from '@angular/core';
import { ObjetivosService } from './objetivos.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Objetivo } from './objetivos.model';

@Component({
  selector: 'app-objetivos',
  templateUrl: './objetivos.component.html',
  styleUrls: ['./objetivos.component.css']
})
export class ObjetivosComponent implements OnInit {
  objetivosForm: FormGroup;


  objetivosList: any = [];
    //id=String;
  //dataSource = this.userList;  // MatPaginator Output
    /*@ViewChild(MatPaginator) paginator!: MatPaginator; 
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }*/


  constructor( private objetivosService:ObjetivosService,
              private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService) { 

                this.objetivosForm = this.fb.group({
                  nombre : ['', Validators.required],
                  idDimension : ['', Validators.required],
                  idPEI : ['', Validators.required]
                })
               


  }

  ngOnInit(): void {
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

  agregarObjetivo(){
    const OBJETIVO: Objetivo = {
      nombre: this.objetivosForm.get('nombre')?.value,
      idDimension: this.objetivosForm.get('idDimension')?.value,
      idPEI: this.objetivosForm.get('idPEI')?.value,
    }
    console.log(OBJETIVO);
this.objetivosService.insertarObjetivo(OBJETIVO).subscribe(data =>{
  console.log('Agregado');
}, error =>
  console.log(error));
  this.objetivosForm.reset();


  }

}
