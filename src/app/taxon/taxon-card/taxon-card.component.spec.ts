import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';

import { TaxonCardComponent } from './taxon-card.component';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { TaxonService } from '../../shared/service/taxon.service';
import { ApiService } from '../../shared/api/api.service';
import { HttpClientModule } from '@angular/common/http';
import { LabelPipe } from '../../shared/pipe/label.pipe';
import { MetadataService } from '../../shared/service/metadata.service';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { CollapseModule, AccordionModule, CarouselModule, BsModalService, ComponentLoaderFactory, ModalModule } from 'ngx-bootstrap';
import { TaxonComparisonComponent } from '../taxon-comparison/taxon-comparison.component';
import { RouterTestingModule } from '@angular/router/testing';
import { OmnisearchComponent } from '../../shared/omnisearch';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ObservationComponent } from '../../observation/observation.component';
import { ObservationService } from '../../shared/service/observation.service';
import { SpinnerModule } from '../../shared-modules/spinner/spinner.module';


describe('TaxonCardComponent', () => {
  let component: TaxonCardComponent;
  let fixture: ComponentFixture<TaxonCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaxonCardComponent, LabelPipe, TaxonComparisonComponent, OmnisearchComponent, ObservationComponent],
      imports: [
        HttpClientModule, TranslateModule.forRoot(), CollapseModule.forRoot(),
        RouterTestingModule, FormsModule, ReactiveFormsModule, AccordionModule, SpinnerModule,
        CarouselModule, ModalModule.forRoot()
      ],
      providers: [
        TaxonService, ApiService, TranslateService, MetadataService, ObservationService, BsModalService
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxonCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
