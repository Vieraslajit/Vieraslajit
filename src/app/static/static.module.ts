import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StaticComponent } from './static.component';
import {StaticRoutingModule} from './static-routing.module';
import { TabsModule } from 'ngx-bootstrap';
import {SharedModule} from '../shared/shared.module';

/**
 * Declares component and routes for viewing static content
 */

@NgModule({
  imports: [
    CommonModule,
    StaticRoutingModule,
    TabsModule,
    SharedModule
  ],
  declarations: [StaticComponent],
  exports: [StaticComponent]
})
export class StaticModule { }
