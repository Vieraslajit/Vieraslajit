import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AccordionModule, CollapseModule, PaginationModule, TabsModule, CarouselModule, BsDropdownModule } from 'ngx-bootstrap';

import { TaxonListComponent } from './taxon-list/taxon-list.component';
import { TaxonCardComponent } from './taxon-card/taxon-card.component';

import { TaxonRoutingModule } from './taxon-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { TaxonComparisonComponent } from './taxon-comparison/taxon-comparison.component';
import { ObservationComponent } from '../observation/observation.component';

/**
 * Declares routes and components for browsing and viewing invasive species
 */
@NgModule({
  imports: [
    CommonModule,
    TaxonRoutingModule,
    FormsModule,
    SharedModule,
    NgxDatatableModule,
    AccordionModule,
    CollapseModule,
    PaginationModule,
    TabsModule,
    CarouselModule,
    BsDropdownModule,
  ],
  declarations: [TaxonListComponent, TaxonCardComponent, TaxonComparisonComponent, ObservationComponent ]
})
export class TaxonModule { }
