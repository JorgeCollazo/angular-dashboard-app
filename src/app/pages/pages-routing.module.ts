import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { PermitionPageGuard } from '../services/Guard/permition-page.guard';
import { InicioComponent } from './inicio/inicio.component';
import { ConteoMesaComponent } from './mesa-conteo/conteo-mesa/conteo-mesa.component';
import { AppComponent } from '../app.component';
import { FotoMesaComponent } from './mesa-conteo/foto-mesa/foto-mesa.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FacturacionDataComponent } from './facturacion-data/facturacion-data.component';

const routes: Routes = [
  {
    path: 'pages',
    data: { breadcrumb: { skip: true } },
    component: LayoutComponent,
    children: [
      {
        data: { breadcrumb: 'Inicio' },
        path: 'inicio', canActivate: [PermitionPageGuard],
        component: InicioComponent
      },
      {
        path: 'compania',
        loadChildren: () => import('./compania/compania.module')
          .then(m => m.CompaniaModule),
          data: {
            breadcrumb: 'Mod. Compañia'
          }
      },
      {
        path: 'control-acceso',
        loadChildren: () => import('./control-acceso/control-acceso.module')
          .then(m => m.ControlAccesoModule),
          data: {
            breadcrumb: { skip: true }
          }
      },
      {
        path: 'entidad',
        loadChildren: () => import('./entidad/entidad.module')
          .then(m => m.EntidadModule),
          data: {
            breadcrumb: { skip: true }
          }
      },
      {
        path: 'scanner',
        loadChildren: () => import('./mobile/mobile.module')
          .then(m => m.MobileModule),
          data: {
            breadcrumb: { skip: true }
          }
      },
      {
        path: 'rpt-premioinst',
        loadChildren: () => import('./reportes/reportes.module')
          .then(m => m.ReportesModule),
          data: {
            breadcrumb: { skip: true }
          }
      },
      {
        path: 'seleccion-mesa',
        loadChildren: () => import('./mesa-conteo/mesa-conteo.module')
          .then(m => m.MesaConteoModule),
          data: {
            breadcrumb: { skip: true }
          }
      },
      {
        path: 'mesa-info',
        loadChildren: () => import('./mesa-informacion/mesa-informacion.module')
          .then(m => m.MesaInformacionModule),
          data: {
            breadcrumb: { skip: true }
          }
      },
      {
        path: 'foto-mesa',
        data: { breadcrumb: { skip:true } },
        component:FotoMesaComponent
      },
      {
        path: 'conteo-mesa',
        data: { breadcrumb: { skip: true }},
        component: ConteoMesaComponent
      },
      {
        path: 'data-filter',
        data: { breadcrumb: { skip: true }},
        component: FacturacionDataComponent
      },
      {
        path: 'dashboard',
        data: { breadcrumb: { skip: true }},
        component: DashboardComponent
      },
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: '/404'
      }
    ]
  },
  {
    path: '',
    redirectTo: 'pages',
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
export class PagesRoutingModule { }
