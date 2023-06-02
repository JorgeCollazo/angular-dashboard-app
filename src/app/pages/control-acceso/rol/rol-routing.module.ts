import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuPorRolComponent } from './menu-por-rol/menu-por-rol.component';
import { RolFormComponent } from './rol-form/rol-form.component';
import { RolListComponent } from './rol-list/rol-list.component';

const routes: Routes = [
  {
    path: 'rol-list',
    data: { breadcrumb: 'Rol Lista' },
    component: RolListComponent
  },
  {
    path: 'rol-form',
    data: { breadcrumb: 'Rol Formulario' },
    component: RolFormComponent
  },
  {
    path: 'rol-form/:action/:id',
    data: { breadcrumb: 'Rol Formulario' },
    component: RolFormComponent
  },
  {
    path: 'menu-por-rol/:id',
    data: { breadcrumb: 'Menu por Rol' },
    component: MenuPorRolComponent
  },
  {
    path: '',
    redirectTo: 'rol-list',
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
export class RolRoutingModule { }
