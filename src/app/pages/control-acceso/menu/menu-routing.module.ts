import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuFormComponent } from './menu-form/menu-form.component';
import { MenuListComponent } from './menu-list/menu-list.component';

const routes: Routes = [
  {
    path: 'menu-list',
    data: { breadcrumb: 'Menu Lista' },
    component: MenuListComponent
  },
  {
    path: 'menu-form',
    data: { breadcrumb: 'Menu Formulario' },
    component: MenuFormComponent
  },
  {
    path: 'menu-form/:action/:id',
    data: { breadcrumb: 'Menu Formulario' },
    component: MenuFormComponent
  },
  {
    path: '',
    redirectTo: 'menu-list',
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
export class MenuRoutingModule { }
