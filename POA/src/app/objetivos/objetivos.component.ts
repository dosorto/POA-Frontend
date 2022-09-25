import { Component, OnInit } from '@angular/core';
import { ObjetivosService } from './objetivos.service';

@Component({
  selector: 'app-objetivos',
  templateUrl: './objetivos.component.html',
  styleUrls: ['./objetivos.component.css']
})
export class ObjetivosComponent implements OnInit {

  objetivosList: any = [];
    //id=String;
  //dataSource = this.userList;  // MatPaginator Output
    /*@ViewChild(MatPaginator) paginator!: MatPaginator; 
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }*/


  constructor( private objetivosService:ObjetivosService) { 
    console.log('El componente se ha iniciado');
  }

  ngOnInit(): void {
    console.log('El componente se ha inicializado');
    this.objetivosService.getObjetivos().subscribe((response:any) => console.log(response));
    this.objetivosService.getObjetivos().subscribe((response:any) => this.objetivosList = response.allObjetivo);
  }

}
