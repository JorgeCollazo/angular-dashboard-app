import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeleccionMesaComponent } from './seleccion-mesa/seleccion-mesa.component';
import { ConteoMesaComponent } from './conteo-mesa/conteo-mesa.component';
import { FotoMesaComponent } from './foto-mesa/foto-mesa.component';

const routes: Routes = [
 {
    path: 'seleccion-mesa',
    data: { breadcrumb: 'seleccion-mesa' },
    component: SeleccionMesaComponent
  },
  {
    path: 'conteo-mesa',
    data: { breadcrumb: 'conteo-mesa' },
    component: ConteoMesaComponent
  },
  {
    path: 'foto-mesa',    
    data: { breadcrumb: 'foto-mesa' },
    component: FotoMesaComponent
  },
  {
    path: '',
    redirectTo: 'seleccion-mesa',
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
export class MesaConteoRoutingModule { }
