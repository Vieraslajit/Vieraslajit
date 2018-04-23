import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxonComparisonComponent } from './taxon-comparison.component';
import { LabelPipe } from '../../shared/pipe/label.pipe';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { TaxonService } from '../../shared/service/taxon.service';
import { ApiService } from '../../shared/api/api.service';
import { HttpClientModule } from '@angular/common/http';
import { MetadataService } from '../../shared/service/metadata.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OmnisearchComponent } from '../../shared/omnisearch';
import { SpinnerModule } from '../../shared-modules/spinner/spinner.module';
import { CarouselModule } from 'ngx-bootstrap';

describe('TaxonComparisonComponent', () => {
  let component: TaxonComparisonComponent;
  let fixture: ComponentFixture<TaxonComparisonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaxonComparisonComponent, LabelPipe, OmnisearchComponent],
      imports: [TranslateModule.forRoot(), RouterTestingModule, HttpClientModule,
        FormsModule, ReactiveFormsModule, SpinnerModule, CarouselModule],
      providers: [TaxonService, ApiService, MetadataService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxonComparisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
