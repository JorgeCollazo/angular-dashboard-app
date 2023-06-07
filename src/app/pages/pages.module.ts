import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { PpBreadcrumbsModule } from 'pp-breadcrumbs';
import { CompartidoModule } from '../componentes/compartido.module';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  declarations: [
    InicioComponent,
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    PpBreadcrumbsModule,
    CompartidoModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule

  ]
})
export class PagesModule { }
