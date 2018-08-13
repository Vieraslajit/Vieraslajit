import { Component, OnInit, ViewEncapsulation, OnDestroy, Input } from '@angular/core';
import { Observable ,  Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Taxonomy } from '../../shared/model/Taxonomy';
import { ListService } from '../../shared/service/list.service';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { StaticComponent } from '../../static/static.component';
import { StaticContent, findContentID } from './../../../assets/i18n/cms-content';

@Component({
  selector: 'vrs-eulist',
  templateUrl: './eulist.component.html',
  styleUrls: ['./eulist.component.scss'],
  encapsulation: ViewEncapsulation.None
  
  
})
export class EulistComponent implements OnInit {
  private subTransList: Subscription;
  private subTransAdm: Subscription;
  eulist: Taxonomy[];
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
    
    this.listService.getEuList('MX.37600', this.translate.currentLang).subscribe(data => {
      this.eulist = data.results;
      this.eulist.forEach(element => {
          if (!element.vernacularName) {
            element.vernacularName = element.scientificName;
          }
      
        element.stableString = this.translate.instant(String(element.stableInFinland));
      
      });
    });
  }

  setStaticId(lang: string){
    this.staticId= findContentID(StaticContent.EUList, lang);
  }

  ngOnDestroy() {
    this.subTransList.unsubscribe();
    this.subTransAdm.unsubscribe();
  }

  onSelect(event) {
    this.router.navigate(['/taxon', event.selected.shift().id]);
  }

}


