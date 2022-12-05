import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestion-pei',
  templateUrl: './gestion-pei.component.html',
  styleUrls: ['./gestion-pei.component.css']
})
export class GestionPeisComponent implements OnInit {
  public selected:string = '';
  constructor(private router:Router) { 
    
  }

  ngOnInit(): void {
  }

}
