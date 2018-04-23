
import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { Taxonomy } from '../../shared/model/Taxonomy';
import { ListService } from '../../shared/service/list.service';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';
import { StaticComponent } from '../../static/static.component';

@Component({
  selector: 'vrs-filist',
  templateUrl: './filist.component.html',
  styleUrls: ['./filist.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FilistComponent implements OnInit {
  private subTransList: Subscription;
  private subTransAdm: Subscription;
  filist: Taxonomy[];
  columns = [];
  staticId: string;

  constructor( private listService: ListService, private translate: TranslateService, private router:Router) { }
    ngOnInit() {
      this.setStaticId(this.translate.currentLang);
      this.subTransList = this.translate.onLangChange.subscribe(this.update.bind(this));
      this.subTransAdm= this.translate.onLangChange.subscribe((event) =>{
          this.setStaticId(event.lang);
      });
      this.update();
  }

  update() {
    this.columns = [
      { prop: 'vernacularName', name: this.translate.instant('taxonomy.folkname'), canAutoResize: false, draggable: false, resizeable: false },
      { prop: 'scientificName', name: this.translate.instant('taxonomy.scientificname'), canAutoResize: false, draggable: false, resizeable: false, width: 150 },
      { prop: 'stableString', name: this.translate.instant('taxonomy.established'), draggable: false, canAutoResize: false, headerClass: 'mobile-hidden', cellClass: 'mobile-hidden', resizeable: false }
    ];
    
    this.listService.getNationalList('MX.37600', this.translate.currentLang).subscribe(data => {
      this.filist = data.results;
      this.filist.forEach(element => {
          if (!element.vernacularName) {
            element.vernacularName = element.scientificName;
          }
      
        element.stableString = this.translate.instant(String(element.stableInFinland));
      
      });
    });
  }

  setStaticId(lang: string){
    if (lang== "fi"){
      this.staticId= "i-115";
    }
    if (lang== "en"){
      this.staticId= "i-119";
    }
    if (lang== "sv"){
      this.staticId= "i-124";
    }
  }

  ngOnDestroy() {
    this.subTransList.unsubscribe();
    this.subTransAdm.unsubscribe();
  } 

  onSelect(event) {
    this.router.navigate(['/taxon', event.selected.shift().id]);
  }

}

