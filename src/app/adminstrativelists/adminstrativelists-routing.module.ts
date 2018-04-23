import { NgModule }             from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EulistComponent } from './eulist/eulist.component';
import { FilistComponent } from './filist/filist.component';
import { EulistobligationsComponent } from './eulistobligations/eulistobligations.component';
import { FilistobligationsComponent } from './filistobligations/filistobligations.component';

const routes: Routes = [
  { path: '', component: EulistComponent },
  { path: 'national', component: FilistComponent},
  { path: 'national/obligations', component: FilistobligationsComponent},
  { path: 'obligations', component: EulistobligationsComponent},

  
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminstrativelistsRoutingModule { }
