import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './public/auth/auth.component';
import { CambioContrasenaComponent } from './public/cambio-contrasena/cambio-contrasena.component';
import { Page403Component } from './public/page403/page403.component';
import { Page404Component } from './public/page404/page404.component';
import { FotoMesaComponent } from './pages/mesa-conteo/foto-mesa/foto-mesa.component';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent
  },
  {
    path: 'cambio-contrasena/:data',
    component: CambioContrasenaComponent
  },
  {
    path: 'app',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule),
    data: { breadcrumb: { skip: true }}
  },
  {
    path: '404',
    component: Page404Component
  },
  {
    path: '403',
    component: Page403Component
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
