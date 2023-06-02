import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: 'list',
    data: { breadcrumb: 'Tipo Entidad Lista' },
    component: ListComponent
  },
  {
    path: 'form',
    data: { breadcrumb: 'Tipo Entidad Formulario' },
    component: FormComponent
  },
  {
    path: 'form/:action/:id',
    data: { breadcrumb: 'Tipo Entidad Formulario' },
    component: FormComponent
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
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoEntidadRoutingModule { }
