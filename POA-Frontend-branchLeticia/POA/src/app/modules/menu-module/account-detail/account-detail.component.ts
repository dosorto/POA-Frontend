import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Storage } from 'src/app/_core/global-services/local_storage.service';


@Component({
    selector: 'app-account-detail',
    templateUrl: './account-detail.component.html',
    styleUrls: ['./account-detail.component.css'],
})
export class AccountDetailComponent implements OnInit {
userToUpdate: any;
empleadosFromDb: any;
rolesFromDb: any;
updateUsuario(arg0: any,arg1: any,arg2: any,arg3: any) {
throw new Error('Method not implemented.');
}
  public user = this.storage.get_storage('user');
editMode: any;
  constructor(private route: ActivatedRoute, private storage:Storage, private router:Router) { }

  ngOnInit(): void {
    let routeParams = this.route.snapshot.paramMap;
    console.log(this.user)
  }
  public changePassword(){
    this.router.navigate(['/login/changePassword']);
  }
}
