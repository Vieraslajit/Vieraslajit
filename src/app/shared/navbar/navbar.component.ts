import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../app.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'vrs-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{

  translate: TranslateService;

  constructor(translate: TranslateService) { 
    this.translate = translate;
  }
    
  ngOnInit() {
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  getLanguage() {
    return this.translate.currentLang;
  }

}
