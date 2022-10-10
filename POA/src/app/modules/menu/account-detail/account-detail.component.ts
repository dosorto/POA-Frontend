import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Storage } from 'src/app/_core/global-services/local_storage.service';

@Component({
  standalone:true,
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css']
})
export class AccountDetailComponent implements OnInit {
  public user = this.storage.get_storage('user');
  constructor(private route: ActivatedRoute, private storage:Storage) { }

  ngOnInit(): void {
    let routeParams = this.route.snapshot.paramMap;
    console.log(this.user)
  }

}
