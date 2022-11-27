import { Component, OnInit } from '@angular/core';
import { Storage } from 'src/app/_core/global-services/local_storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  rutaActual = "home";
  user = this.Storage.get_storage("user");
  token = this.user.token;
  constructor(private Storage:Storage, public router:Router) { 
    if(Object.entries(this.user).length === 0){
      this.router.navigate(['/login']);
    }
  }
  
  ngOnInit(): void {
    
  }
  toPei(){
    this.router.navigate(['/gestion_pei/pei/list/1'])
  }

}
