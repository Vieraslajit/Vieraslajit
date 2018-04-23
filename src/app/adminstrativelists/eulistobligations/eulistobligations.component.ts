import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { StaticComponent } from '../../static/static.component';

@Component({
  selector: 'vrs-eulistobligations',
  templateUrl: './eulistobligations.component.html',
  styleUrls: ['./eulistobligations.component.scss']
})
export class EulistobligationsComponent implements OnInit {

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
      this.staticId= "i-217";
    }
    if (lang== "en"){
      this.staticId= "i-221";
    }
    if (lang== "sv"){
      this.staticId= "i-225";
    }
  }

}
