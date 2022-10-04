<<<<<<< HEAD
import { Component } from '@angular/core';
=======
import { Component, OnInit } from '@angular/core';

//import { Component } from '@angular/core';
>>>>>>> origin/Alejandraf
import { NavigationEnd, Router } from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'POA';
  thisRoute: string;
  TopBar_sideBar = true;
  rutasExcentasTopBar = ['/', '/login']
  constructor(private router: Router) {
    this.thisRoute = "Demo";
    this.router.events.subscribe((event: any) => {

      if (event instanceof NavigationEnd) {
        this.thisRoute = event.url;
        console.log(event);
      }

      if (this.rutasExcentasTopBar.includes(this.thisRoute)) {
        this.TopBar_sideBar = false;
      }
    })
  }
  ngOnInit(): void {
  }
}
