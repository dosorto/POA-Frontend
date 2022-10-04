import { Component, Input, OnInit } from '@angular/core';
import { navbarData } from './nav-data';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  collapsed = false;
  navData = navbarData;
  @Input() permisos = ['r_home','r_institucion'];
  @Input() rutaActual:string =""; 
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  public link(modulo:string):void{
    this.router.navigate(['/'+modulo]);
  }
}
