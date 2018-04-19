import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Taxonomy, TaxonomyImage } from '../../shared/model/Taxonomy';
import { TaxonService } from '../../shared/service/taxon.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'vrs-taxon-comparison',
  templateUrl: './taxon-comparison.component.html',
  styleUrls: ['./taxon-comparison.component.scss']
})
export class TaxonComparisonComponent implements OnInit, OnDestroy {

  @Input() taxon: Taxonomy;
  @Input() media: TaxonomyImage;
  private subTrans: any;

  groups = [];
  taxonomy: Taxonomy[];
  multimedia: TaxonomyImage[];
  selected: Taxonomy;
  current = 0;

  constructor(private taxonService: TaxonService, private translate: TranslateService) { }

  ngOnInit() {
    this.subTrans = this.translate.onLangChange.subscribe(this.update.bind(this));
    this.update();
  }

  next() {
    this.current = this.current + 1;
    if (this.current > this.taxonomy.length - 1) {
      this.current = 0;
    }
    this.selected = this.taxonomy[this.current];
  }

  prev() {
    this.current = this.current - 1;
    if (this.current < 0) {
      this.current = this.taxonomy.length - 1;
    }
    this.selected = this.taxonomy[this.current];
  }

  changeSelected(event) {
    this.selected = this.taxonomy[event];
    this.current = event;
  }

  update() {
    if (this.taxon) {
      this.taxon.informalTaxonGroups.forEach((elem, index, arr) => {
        this.taxonService.getGroupChildren(elem).subscribe((data) => {
          if (data.results.length === 0) {
            this.groups.push(elem);
          }
        }, err => err, () => {
          if (index === arr.length - 1) {
            this.getTaxon();
          }
        });
      });
    }
  }

  getTaxon() {
    this.groups.forEach(elem => {
      this.taxonService.getComparisonTaxonomy('MX.37600', elem, this.translate.currentLang).subscribe(data => {
        this.taxonomy = data.results.filter(taxon => taxon.id!=this.taxon.id);
        this.selected = data.results[this.current];
      });
    });
  }

  ngOnDestroy() {
  }
}