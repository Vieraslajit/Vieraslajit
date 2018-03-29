import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import {OmnisearchComponent} from './shared/omnisearch/omnisearch.component'


@Component({
  selector: 'vrs-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'vrs';
  translate: TranslateService;

  constructor(translate: TranslateService) {
    this.translate = translate;

    // oletuskieli jos käännöstä ei löydy halutulla kielellä
    translate.setDefaultLang('en');

    if(window.localStorage.getItem("vrs-lang")) {
      translate.use(window.localStorage.getItem("vrs-lang"));
    } else  {
      translate.use('fi');
    }

  }

}
