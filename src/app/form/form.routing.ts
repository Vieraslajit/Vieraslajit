import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  { path: ':formId/:documentId', component: FormComponent },
  { path: ':formId', component: FormComponent }
];


export const routing: ModuleWithProviders = RouterModule.forChild(routes);
