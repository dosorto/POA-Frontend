import { Component, OnInit } from '@angular/core';
import { PEI } from 'src/app/models/pei';
import { AllPEIService } from 'src/app/SERVICES/all-pei.service';



@Component({
  selector: 'app-all-pei',
  templateUrl: './all-pei.component.html',
  styleUrls: ['./all-pei.component.css']
})
export class AllPEIComponent implements OnInit {

  allpei: PEI [] = [];

  constructor(private allpeiService:AllPEIService) {
    console.log('El componente se ha iniciado');
  }

  ngOnInit(): void {
    console.log('El componente se ha inicializado');
    this.allpeiService.getPEI().subscribe((response:any) =>
    this.allpei = response.allPEI);
  }
}
