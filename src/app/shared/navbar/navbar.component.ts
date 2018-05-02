import { Component, OnInit, TemplateRef} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { SearchComponent } from '../googlesearch/search/search.component';
import { UserService, Role } from '../service/user.service';
import {Router} from '@angular/router';
import { InformationService } from '../service/information.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';
import { StaticContent, findContentID } from './../../../assets/i18n/cms-content';


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
  
  constructor(private modalService: BsModalService, private router: Router, private userService: UserService,
     private informationService: InformationService, private translate:TranslateService) {

    // temporary suboptimal solution (a lot more updates than necessary)

    this.loginSub = userService.loginStateChange.subscribe(() => {
      if(UserService.loggedIn()) {
        this.setLoggedIn();
      }
      this.loggedIn = UserService.loggedIn();
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

  setLoggedIn() {
    this.loggedIn = UserService.loggedIn();
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
