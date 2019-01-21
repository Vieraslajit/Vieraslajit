import { Component, OnInit, AfterViewChecked, AfterViewInit, ViewChildren, QueryList, NgZone, Renderer2, ElementRef, ChangeDetectorRef } from '@angular/core';
import { UserService } from '../service/user.service';
import {Router} from '@angular/router';
import { InformationService } from '../service/information.service';
import { TranslateService } from '@ngx-translate/core';
import { Subscription, of } from 'rxjs';
import { StaticContent, findContentID } from './../../../assets/i18n/cms-content';
import * as $ from 'jquery';
import { BsDropdownDirective } from '../../../../node_modules/ngx-bootstrap';
import { mergeMap, map, catchError } from 'rxjs/operators';

@Component({
  selector: 'vrs-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterViewChecked, AfterViewInit {
  loginUrl = '#';
  fixedTop = false;
  isCollapsed = false;
  loggedIn = false;
  menu: Array<any> = new Array();
  loginSub: Subscription;
  private onLangChange: Subscription;
  rootId: string = "";
  currentId: string= "";
  private dropdown_user_bound = false;

  mobile = false;

  @ViewChildren(BsDropdownDirective) d : QueryList<BsDropdownDirective>;

  constructor(private router: Router, private userService: UserService,
     private informationService: InformationService, private translate:TranslateService,
     private zone: NgZone,
     private renderer: Renderer2,
     private cd: ChangeDetectorRef) {
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

  getCurrentLang() {
    return this.translate.currentLang;
  }

  ngOnInit() {
    this.updateMobileMode();
    this.onLangChange = this.translate.onLangChange.subscribe((event) =>{
      this.setCMSRootId(event.lang);
      this.update();
    });
    this.zone.runOutsideAngular(() => {
      $(window).resize(() => {
        this.updateMobileMode();
      });
      $(window).on('scroll', ()=>{
        this.updateFixedTop();
      });
    });
  }

  private updateMobileMode() {
    const _mobile = this.mobile;
    if (window.innerWidth < 768) {
      this.mobile = true;
    } else {
      this.mobile = false;
    }
    if (_mobile !== this.mobile) {
      this.updateFixedTop();
      this.cd.detectChanges();
    }
  }

  private updateFixedTop() {
    const _fixedTop = this.fixedTop;
    if ($(window).scrollTop() <= 138) {
        this.fixedTop = false;
    } else {
        this.fixedTop = true;
    }
    if (this.fixedTop !== _fixedTop) {
        this.cd.detectChanges();
    }
  }

  ngAfterViewInit() {
    this.d.forEach((dropdown) => {
      // hacking into private property (of dropdown directive) because we are above the law
      // @ts-ignore
      let el = dropdown._elementRef.nativeElement;
      this.renderer.listen(el, "mouseenter", ()=>{
        dropdown.toggle(true);
      })
      this.renderer.listen(el, "mouseleave", ()=>{
        dropdown.toggle(true);
      })
    })
  }

  /* dropdown-user is inside an *ngIf statement, so it can't be selected until the if statement is evaluated*/
  ngAfterViewChecked() {
    if(!this.dropdown_user_bound) {
      /* wait for the dropdown-user element to appear before binding */
      if($("#dropdown-user").length !== 0) {
        $("#dropdown-user").on("mouseenter mouseleave", ()=>{
          this.d.first.toggle(true);
        });
        this.dropdown_user_bound = true;
      }
    }
  }

  /**
   * Fetches static content from API with rootId to populate navbar menu
   */
  update(){
    this.menu = [];
    this.informationService.getInformation(this.rootId).pipe(
      mergeMap((base) => {
        return of(...base.children)
      }),
      mergeMap((header) => {
        return this.informationService.getInformation(header.id)
      })
    )
    .subscribe((data) => {
      this.menu.push(data)
      this.cd.markForCheck()
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

  userPropertiesWrapper(): any {
    if(this.loggedIn) {
      return UserService.getUserProperties();
    } else {
      return {person: {fullName: ''}};
    }
  }

  ngOnDestroy(){
    this.loginSub ? this.loginSub.unsubscribe() : null;
    this.onLangChange ? this.onLangChange.unsubscribe() : null;
  }

}
