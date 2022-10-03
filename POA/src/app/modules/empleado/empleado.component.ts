import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from './empleado.service';


@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {
  empleadoList: any = [];

  constructor( private empleadoService: EmpleadoService) { }

  ngOnInit(): void {
    console.log('El componente se ha inicializado');
    this.empleadoService.getEmpleado().subscribe((response : any) => console.log(response));
    this.empleadoService.getEmpleado().subscribe((response:any) => this.empleadoList = response.empleados);
  }

}
