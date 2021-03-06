import { TabsModule } from 'ngx-bootstrap';
import { NgModule } from '../../../../node_modules/@angular/core';
import { TaxonBrowserComponent } from './taxon-browser.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { TaxonCardGridComponent } from './taxoncard-grid/taxoncard-grid.component';
import { RouterModule } from '../../../../node_modules/@angular/router';
import { CommonModule } from '../../../../node_modules/@angular/common';
import { TranslateModule } from '../../../../node_modules/@ngx-translate/core';
import { FormsModule } from '../../../../node_modules/@angular/forms';
import { TaxonBrowserListComponent } from './taxon-browser-list/taxon-browser-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SpinnerModule } from '../../shared-modules/spinner/spinner.module';
import { SharedModule } from '../../shared/shared.module';
import { InformalGroupComponent } from './informal-group/informal-group.component';
import { InformalGroupGridComponent } from './informal-group/informal-group-grid.component';
import { TaxonMosaicComponent } from './taxon-mosaic/taxon-mosaic.component';
import { GroupDropdownComponent } from './informal-group/group-dropdown.component';
import { OptionsAccordionComponent } from './options-accordion.component';

@NgModule({
    imports: [NgxPaginationModule, TabsModule, NgxDatatableModule, RouterModule,
        CommonModule, TranslateModule, FormsModule, SpinnerModule, SharedModule, InfiniteScrollModule],
    declarations: [GroupDropdownComponent, TaxonCardGridComponent, TaxonMosaicComponent, TaxonBrowserComponent, TaxonBrowserListComponent, InformalGroupComponent, InformalGroupGridComponent, OptionsAccordionComponent ],
    exports: [TaxonBrowserComponent]
})
export class TaxonBrowserModule {}