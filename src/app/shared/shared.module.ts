import { NgModule, ModuleWithProviders } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './api/api.service';
import { SearchComponent } from './googlesearch/search/search.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { TaxonService } from './service/taxon.service';
import { NewsService } from './service/news.service';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { LanguageSelectorComponent } from './navbar/language-selector/language-selector.component';
import { LabelPipe } from './pipe/label.pipe';
import { MetadataService } from './service/metadata.service';
import { OmnisearchComponent } from './omnisearch/omnisearch.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule, ModalModule, CollapseModule } from 'ngx-bootstrap';
import { FormService } from './service/form.service';
import { FormApiClient } from './api/FormApiClient';
import { UserService } from './service/user.service';
import { HttpModule } from '@angular/http';
import { InformationService } from './service/information.service';
import {ListService } from './service/list.service';
import { SpinnerModule } from './../shared-modules/spinner/spinner.module'
import { ObservationService } from './service/observation.service';
import {EditcmsModule} from './../shared-modules/editcms/editcms.module';
import { DocumentService } from './service/document.service';
import { AlertService } from './service/alert.service';

/**
 * Provides common utilities for other modules
 */

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule,
    SpinnerModule,
    EditcmsModule,
    ModalModule.forRoot(),
    CollapseModule.forRoot(),
    HttpModule
  ],
  entryComponents: [SearchComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  declarations: [NavbarComponent, FooterComponent, SearchComponent, LanguageSelectorComponent, OmnisearchComponent, LabelPipe],
  providers: [],
  exports: [NavbarComponent, RouterModule, FooterComponent, SpinnerModule, EditcmsModule, SearchComponent, TranslateModule, LanguageSelectorComponent, OmnisearchComponent, LabelPipe]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        ApiService,
        TaxonService,
        NewsService,
        MetadataService,
        FormService,
        FormApiClient,
        UserService,
        InformationService,
        ObservationService,
        DocumentService,
        AlertService,
      ]
    };
  }
}
