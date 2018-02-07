import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';


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
    translate.setDefaultLang('fi');

    // oletuskieli jos haluttua kieltä ei ole saatavilla
    translate.use('fi');

  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }
}
