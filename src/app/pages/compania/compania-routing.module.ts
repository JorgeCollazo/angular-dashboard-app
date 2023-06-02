import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompaniaFormComponent } from './compania-form/compania-form.component';
import { CompaniaListComponent } from './compania-list/compania-list.component';

const routes: Routes = [
  {
    path: 'list',
    data: { breadcrumb: 'Lista' },
    component: CompaniaListComponent
  },
  {
    path: 'form',
    data: { breadcrumb: 'Formulario' }, component: CompaniaFormComponent
  },
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompaniaRoutingModule { }
