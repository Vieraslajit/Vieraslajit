import { Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { SearchComponent } from '../googlesearch/search/search.component';
import { UserService, Role } from '../service/user.service';
import {Router, RouterLinkActive} from '@angular/router';
import { InformationService } from '../service/information.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { StaticContent, findContentID } from './../../../assets/i18n/cms-content';
import * as $ from 'jquery';
import { BsDropdownDirective } from '../../../../node_modules/ngx-bootstrap';

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
  menu: Array<any> = new Array();
  loginSub: Subscription;
  translateSub: Subscription;
  rootId: string = "";
  currentId: string= "";

  @ViewChild(BsDropdownDirective)
  d : BsDropdownDirective
  
  constructor(private modalService: BsModalService, private router: Router, private userService: UserService,
     private informationService: InformationService, private translate:TranslateService) {

    this.loginSub = userService.loginStateChange.subscribe(() => {
      this.loggedIn = UserService.loggedIn();
      if(this.loggedIn == false) {
        // Use reload hack to force re-render of the component
        this.router.navigate(["reload/" + this.router.url]);
      }
    })
    /**
     * Update login url next parameter every time active route changes
     */
    router.events.subscribe((val) => {
      this.loginUrl = UserService.getLoginUrl(encodeURI(window.location.pathname));
    });
    
  }

  ngOnInit() {
    this.translate.onLangChange.subscribe((event) =>{
      this.setCMSRootId(event.lang);
      this.update();
    });  

    /* Dropdown toggle */
    $(".dropdown").on("mouseenter mouseleave", ()=>{
      this.d.toggle(true);
    });
  }

  /**
   * Fetches static content from API with rootId to populate navbar menu
   */
  update(){
    this.informationService.getInformation(this.rootId).subscribe((data) => {
      this.menu= [];
      for(let c of data.children) {
          this.menu.push(c);
      }
    });
  }

  /**
   * Changes root id used in static content API call when language changes
   */

  setCMSRootId(lang: string) {
    this.rootId = findContentID(StaticContent.Root, lang);
  }

  logout() {
    this.userService.logout();
  }

  userPropertiesWrapper() {
    if(this.loggedIn) {
      return UserService.getUserProperties();
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  ngOnDestroy(){
    this.loginSub.unsubscribe();
  }

}
