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
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FacturacionDataComponent } from './facturacion-data/facturacion-data.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [
    InicioComponent,
    DashboardComponent,
    FacturacionDataComponent,
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
    LayoutModule,
    NgxChartsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
  ]
})
export class PagesModule { }
