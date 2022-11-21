import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  standalone:true,
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.css']
})
export class BackButtonComponent implements OnInit {
  @Input()
  path: Array<any> = [];

  @Input()
  idActividad: number = 0;
  constructor(private _router:Router) { }


  
  ngOnInit(): void {
  }
 redirect(){
  this._router.navigate(this.path);
 }
}
