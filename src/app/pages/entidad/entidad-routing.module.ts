import { NgModule } from '@angular/core'; 
import { RouterModule, Routes } from '@angular/router';
import { PermitionPageGuard } from 'src/app/services/Guard/permition-page.guard';

const routes: Routes = [
  {
    path: 'tipo-entidad', canActivate: [PermitionPageGuard], canActivateChild: [PermitionPageGuard],
    loadChildren: () => import('./tipo-entidad/tipo-entidad.module')
      .then(m => m.TipoEntidadModule),
      data: {
        breadcrumb: 'Mod. Entidad'
      },
  },{
    path: 'entidad', canActivate: [PermitionPageGuard], canActivateChild: [PermitionPageGuard],
    loadChildren: () => import('./entidad-opcion/entidad-opcion.module')
      .then(m => m.EntidadOpcionModule),
      data: {
        breadcrumb: 'Mod. Entidad'
      },
  },{
    path: 'departamento', canActivate: [PermitionPageGuard], canActivateChild: [PermitionPageGuard],
    loadChildren: () => import('./departamento/departamento.module')
      .then(m => m.DepartamentoModule),
      data: {
        breadcrumb: 'Mod. Departamento'
      },
  },
  {
    path: '',
    redirectTo: 'entidad',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntidadRoutingModule { }
