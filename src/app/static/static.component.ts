import { Component, OnInit, OnDestroy } from '@angular/core';
import { InformationService } from '../shared/service/information.service';
import { Information } from '../shared/model/Information';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
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
  id: String;
  sub: Subscription;
  child_pages: Array<any>;

  constructor(public informationService: InformationService, private route: ActivatedRoute, 
    private router: Router, private translate: TranslateService) { }

  /**
   * Captures 'id' from url route and passes it to getInformation(id)
   */

  ngOnInit() {
    this.loadContent();
    this.sub = this.router.events.filter(e => e instanceof NavigationEnd).subscribe((data)=>{
      this.loadContent();
    });
  }

  loadContent() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getInformation(this.id);
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
  }
}
