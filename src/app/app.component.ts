import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { OmnisearchComponent } from './shared/omnisearch/omnisearch.component'
import { UserService, userProperty } from './shared/service/user.service';
import { Router, NavigationEnd } from '@angular/router';
import { Subscriber ,  Subscription } from 'rxjs';
import * as $ from 'jquery';
import { LocationStrategy } from '@angular/common';
import { StateService } from './state.service';

/**
 * Main component that acts as a container for navigation, content and footer.
 */

@Component({
  selector: 'vrs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vrs';
  translate: TranslateService;
  isPopState = false;
  hideFooter = false;

  /**
  * Initializes TranslateService
  * 1. Use English if a particular translation element is not found
  * 2. Use either the default language or language stored in localStorage
  */
  constructor(state: StateService, translate: TranslateService, private userService: UserService, private router: Router) {

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.hideFooter = !state.footerEnabled;
      }
    });

    this.translate = translate;

    /**
    * Use English if translation is not found
    */
    translate.setDefaultLang('en');

    /**
    * User's language choice is stored in localStorage, if language is not found
    * then use Finnish
    */
    if (window.localStorage.getItem("vrs-lang")) {
      translate.use(window.localStorage.getItem("vrs-lang"));
    } else {
      translate.use('fi');
    }

    if (UserService.getToken()) {
      userService.updateUserProperties(UserService.getToken());
    }
  }
}
