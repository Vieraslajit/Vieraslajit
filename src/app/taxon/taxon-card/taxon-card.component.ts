import { Component, OnInit, OnDestroy, Input, ViewEncapsulation, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaxonService } from '../../shared/service/taxon.service';
import { TaxonomyDescription, TaxonomyImage, Taxonomy } from '../../shared/model/Taxonomy';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { ObservationComponent } from '../../observation/observation.component';


@Component({
  selector: 'vrs-taxon-card',
  templateUrl: './taxon-card.component.html',
  styleUrls: ['./taxon-card.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class TaxonCardComponent implements OnInit, OnDestroy {

  private sub: any;
  private querySub: Subscription;
  private subTrans: Subscription;
  public loading = true; // spinner true on start

  id: string;
  taxon: Taxonomy;
  desc: TaxonomyDescription;
  media: Array<TaxonomyImage>;
  family: Array<Taxonomy>;
  quarantinePlantPest: boolean;  // Vaarallinen kasvintuhoaja
  comparison: boolean;
  isFirstOpen: boolean;
  customClass: string;
  modalRef: BsModalRef;
  selectedImage: TaxonomyImage;


  constructor(private route: ActivatedRoute, private router: Router,
    private taxonService: TaxonService, private translate: TranslateService, private modalService: BsModalService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

  }

  ngOnInit() {
    this.isFirstOpen = false;
    this.subTrans = this.translate.onLangChange.subscribe(this.update.bind(this));
    this.querySub = this.route.queryParams.subscribe(params => {
      if (params) {
        this.comparison = params.comparison;
      }
    });
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
    });
    this.scrollTop();
    this.update();
  }

  update() {
    this.taxonService.getTaxon(this.id, this.translate.currentLang).subscribe(data => {
      this.taxon = data;
      if (this.taxon.administrativeStatuses) {
        this.quarantinePlantPest = this.taxon.administrativeStatuses.includes('MX.quarantinePlantPest');
      }
    });
    this.taxonService.getTaxonDescription(this.id, this.translate.currentLang).subscribe(data => {
      this.desc = data[0];


    });
    this.taxonService.getTaxonMedia(this.id, this.translate.currentLang).subscribe(data => {
      this.media = data;
    });
    this.taxonService.getTaxonParents(this.id, this.translate.currentLang).subscribe(data => {
      if (data.some(e => e.taxonRank === 'MX.subfamily')) {
        this.family = data.filter(value => value.taxonRank === 'MX.subfamily');
      } else {
        this.family = data.filter(value => value.taxonRank === 'MX.family');
      }
    }, () => null, () => this.loader()); // spinner to false
  }

  // if loading true => false, removes spinner
  loader() {
    if (this.loading) {
      this.loading = false;
    }
  }

  comparisonView() {
    this.comparison = !this.comparison;
  }

  scrollTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
    this.subTrans.unsubscribe();
    if (this.querySub.closed) {
      this.querySub.unsubscribe();
    }
  }

  openImage(template: TemplateRef<any>, image: TaxonomyImage) {
    this.selectedImage = image;
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }

  handleLoading(loading) {
    setTimeout(() => {
      this.loading = loading;
    }, 200);
  }

}
