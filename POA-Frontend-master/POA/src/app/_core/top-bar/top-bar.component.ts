import { Component, OnInit } from '@angular/core';
import { Storage } from '../global-services/local_storage.service';
import { Router } from '@angular/router';

@Component({
  standalone:true,
  selector: 'top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  user = this.local.get_storage("user");
  constructor(private local:Storage, private router:Router) { }

  ngOnInit(): void {
    
  }
  logout(){
    this.local.delete_storage("user");
    this.router.navigate(['/login']);
  }
}
