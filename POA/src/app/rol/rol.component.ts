import { Component, OnInit } from '@angular/core';
import { RolService } from '../rol/rol.service';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit {
  rolList: any = [];
  constructor( private rolService: RolService) { }

  ngOnInit(): void {
    console.log('El componente se ha inicializado');
    this.rolService.getRol().subscribe((response : any) => console.log(response));
    this.rolService.getRol().subscribe((response:any) => this.rolList = response.roles);

  }

}
