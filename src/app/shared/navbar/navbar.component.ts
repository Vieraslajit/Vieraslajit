import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { SearchComponent } from '../googlesearch/search/search.component';
import { UserService, Role } from '../service/user.service';
import {Router} from '@angular/router';
import { InformationService } from '../service/information.service';

// ID of the parent element of general static pages
const PARENT_ID = "i-45";

@Component({
  selector: 'vrs-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  modalRef: BsModalRef;
  loginUrl = '#';
  isCollapsed = false;
  loggedIn = false;

  constructor(private modalService: BsModalService, private router: Router, private informationService: InformationService) { 
    // temporary suboptimal solution (a lot more updates than necessary)
    router.events.subscribe((val) => {
      this.loginUrl = UserService.getLoginUrl(encodeURI(window.location.pathname));
      this.loggedIn = UserService.loggedIn();
    });
  }

  ngOnInit() {
    this.informationService.getInformation(PARENT_ID).subscribe((data) => {
      console.log(data);
    });
  }

  userPropertiesWrapper() {
    if(this.loggedIn) {
      return UserService.getUserProperties();
    }
  }

  isCMSAdmin() {
    return UserService.hasRole(Role.CMS_ADMIN);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
