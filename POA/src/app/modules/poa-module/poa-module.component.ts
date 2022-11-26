import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-poa',
  templateUrl: './poa-module.component.html',
  styleUrls: ['./poa-module.component.css']
})
export class GestionPoasComponent implements OnInit {
  public selected:string = '';
  constructor(private router:Router) { 
    
  }

  ngOnInit(): void {
  }

}
