import { Component, OnInit } from '@angular/core';
import { PEI } from 'src/app/models/pei';
import { DisablePEIService } from 'src/app/services/disablePEI.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-disable-pei',
  templateUrl: './disable-pei.component.html',
  styleUrls: ['./disable-pei.component.css']
})
export class DisablePEIComponent implements OnInit {
  listPEI: PEI[] = [];

  constructor(private _disablepeiservice: DisablePEIService) { }

  ngOnInit(): void {
    console.log('El componente se ha inicializado');
  }
  getPEIS(){
    this._disablepeiservice.getPEI().subscribe(data =>{
      console.log(data);
      this.listPEI = data;
    }, error =>{
      console.log(error)
    })
  }
  disablePEI(id: any){
    this._disablepeiservice.disablePEI(id).subscribe(data =>{
      console.log("El PEI se ha eliminado")
      this.getPEIS();
    }, error =>{
      console.log(error)
    })
  }

}
