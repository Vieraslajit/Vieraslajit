import { Component, OnInit } from '@angular/core';
import { UserService, Role } from './../service/user.service';

@Component({
  selector: 'vrs-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  isAdmin(): boolean {
    return UserService.hasRole(Role.CMS_ADMIN);
  }

}
