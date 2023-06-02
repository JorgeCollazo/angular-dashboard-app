import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { PpBreadcrumbsModule } from 'pp-breadcrumbs';
import { CompartidoModule } from '../componentes/compartido.module';

@NgModule({
  declarations: [
    InicioComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    PpBreadcrumbsModule,
    CompartidoModule

  ]
})
export class PagesModule { }
