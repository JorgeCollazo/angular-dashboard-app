import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MesaInformacionComponent } from './mesa-informacion.component';
const routes: Routes = [
  {
    path: 'mesa-info',
    data: { breadcrumb: 'mesa-info' },
    component: MesaInformacionComponent
  },
  {
    path: '',
    redirectTo: 'mesa-info',
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
export class MesaInformacionRoutingModule { }
