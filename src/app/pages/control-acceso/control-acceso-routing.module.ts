import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermitionPageGuard } from 'src/app/services/Guard/permition-page.guard';

const routes: Routes = [
  {
    path: 'menu', canActivate: [PermitionPageGuard], canActivateChild: [PermitionPageGuard],
    loadChildren: () => import('./menu/menu.module')
      .then(m => m.MenuModule),
      data: {
        breadcrumb: 'Mod. Menu'
      },
  },
  {
    path: 'rol', canActivate: [PermitionPageGuard], canActivateChild: [PermitionPageGuard],
    loadChildren: () => import('./rol/rol.module')
      .then(m => m.RolModule),
      data: {
        breadcrumb: 'Mod. Rol'
      },
  },
  {
    path: 'user', canActivate: [PermitionPageGuard], canActivateChild: [PermitionPageGuard],
    loadChildren: () => import('./user/user.module')
      .then(m => m.UserModule),
      data: {
        breadcrumb: 'Mod. Usuario'
      },
  },
  {
    path: '',
    redirectTo: 'menu',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ControlAccesoRoutingModule { }
