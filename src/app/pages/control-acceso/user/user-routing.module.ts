import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuPorUsuarioComponent } from './menu-por-usuario/menu-por-usuario.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Routes = [
  {
    path: 'user-list',
    data: { breadcrumb: 'Usuario Lista' },
    component: UserListComponent
  },
  {
    path: 'user-form',
    data: { breadcrumb: 'Usuario Formulario' },
    component: UserFormComponent
  },
  {
    path: 'user-form/:action/:id',
    data: { breadcrumb: 'Usuario Formulario' },
    component: UserFormComponent
  },
  {
    path: 'menu-por-usuario/:id',
    data: { breadcrumb: 'Menu Por usuario' },
    component: MenuPorUsuarioComponent
  },
  {
    path: '',
    redirectTo: 'user-list',
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
export class UserRoutingModule { }
