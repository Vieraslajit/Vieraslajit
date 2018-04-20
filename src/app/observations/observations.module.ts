import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ObservationsRoutingModule } from './observations-routing.module';
import { ObservationlistComponent } from './observationlist/observationlist.component';
import { SharedModule } from '../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ApiService } from '../shared/api/api.service';
import { ObservationService } from '../shared/service/observation.service'
import { TabsModule, AlertModule } from 'ngx-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    ObservationsRoutingModule,
    SharedModule,
    NgxDatatableModule,
    TabsModule.forRoot(),
    AlertModule.forRoot()
  ],
  declarations: [ObservationlistComponent],
  providers: [ApiService, ObservationService, DatePipe]
})
export class ObservationsModule { }
