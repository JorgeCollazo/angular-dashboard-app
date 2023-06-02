import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: 'list-entidad',
    data: { breadcrumb: 'Entidad Lista' },
    component: ListComponent
  },
  {
    path: 'form-entidad',
    data: { breadcrumb: 'Entidad Formulario' },
    component: FormComponent
  },
  {
    path: 'form-entidad/:action/:id',
    data: { breadcrumb: 'Entidad Formulario' },
    component: FormComponent
  },
  {
    path: '',
    redirectTo: 'list-entidad',
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
export class EntidadOpcionRoutingModule { }
