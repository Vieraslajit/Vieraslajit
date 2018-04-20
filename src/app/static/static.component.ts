import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { InformationService } from '../shared/service/information.service';
import { Information } from '../shared/model/Information';
import { ActivatedRoute, Router, NavigationEnd, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { TranslateService } from '@ngx-translate/core';

/**
 * Renders static page ie. /static/:id route
 * 
 * StaticComponent is dynamically populated from the CMS. The CMS is
 * accessed via laji API using InformationService
 * 
 */

@Component({
  selector: 'vrs-static',
  templateUrl: './static.component.html',
  styleUrls: ['./static.component.scss'],
})
export class StaticComponent implements OnInit {

  public scontent: Object;
  @Input() id: string;
  sub: Subscription;
  private subTrans: Subscription;
  child_pages: Array<any>;

  constructor(public informationService: InformationService, private route: ActivatedRoute, 
    private router: Router, private translate: TranslateService) { }

  /**
   * Captures 'id' from url route and passes it to getInformation(id)
   */ 

  ngOnInit() {
    this.loadContent();
    this.subTrans = this.translate.onLangChange.subscribe(this.loadHomePage.bind(this));
    this.sub = this.router.events.filter(e => e instanceof NavigationEnd).subscribe((data)=>{
      this.loadContent();
    });
    
  }

  loadContent() {
    if(!this.id){
      this.route.params.subscribe(params => {
      this.id = params['id'];
      });
    }
    this.getInformation(this.id);
  }
  
  loadHomePage(){
      this.router.navigate(['./home']);
  }

  /**
   * Updates scontent with data from the CMS
   * @param{string} id  id of the content that will be loaded into scontent
   */

  getInformation(id) {
    this.informationService.getInformation(id).subscribe((data) => {
        this.scontent = data;
        this.child_pages = data.children;
        if(data.children) {
          for(let c of this.child_pages) {
            this.informationService.getInformation(c.id).subscribe((data) => {
              c.data = data;
            });
          }
        }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.subTrans.unsubscribe();
  }
}
