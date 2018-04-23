import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { StaticComponent } from '../../static/static.component';

@Component({
  selector: 'vrs-filistobligations',
  templateUrl: './filistobligations.component.html',
  styleUrls: ['./filistobligations.component.scss']
})
export class FilistobligationsComponent implements OnInit {

  staticId: string;
  private subTrans: Subscription;

  constructor(private translate: TranslateService) { }

  ngOnInit() {
    this.setStaticId(this.translate.currentLang);
    this.subTrans= this.translate.onLangChange.subscribe((event) =>{
      this.setStaticId(event.lang);
    });
  }

  setStaticId(lang: string){
    if (lang== "fi"){
      this.staticId= "i-219";
    }
    if (lang== "en"){
      this.staticId= "i-223";
    }
    if (lang== "sv"){
      this.staticId= "i-227";
    }
  }  

}
