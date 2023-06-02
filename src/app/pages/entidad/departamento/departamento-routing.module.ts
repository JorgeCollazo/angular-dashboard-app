import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartamentoFormComponent } from './departamento-form/departamento-form.component';
import { DepartamentoListComponent } from './departamento-list/departamento-list.component';

const routes: Routes = [
  {
    path: 'list-departamento',
    data: { breadcrumb: 'Departamento Lista' },
    component: DepartamentoListComponent
  },
  {
    path: 'form-departamento',
    data: { breadcrumb: 'Departamento Formulario' },
    component: DepartamentoFormComponent
  },
  {
    path: 'form-departamento/:action/:id',
    data: { breadcrumb: 'Departamento Formulario' },
    component: DepartamentoFormComponent
  },
  {
    path: '',
    redirectTo: 'list-departamento',
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
export class DepartamentoRoutingModule { }
