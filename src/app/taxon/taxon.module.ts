import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaxonListComponent } from './taxon-list/taxon-list.component';
import { TaxonCardComponent } from './taxon-card/taxon-card.component';

import { routing } from './taxon.routing';

@NgModule({
  imports: [
    CommonModule,
    routing
  ],
  declarations: [TaxonListComponent, TaxonCardComponent]
})
export class TaxonModule { }