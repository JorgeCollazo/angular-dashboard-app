import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepartamentoRoutingModule } from './departamento-routing.module';
import { CompartidoModule } from 'src/app/componentes/compartido.module';
import { DepartamentoListComponent } from './departamento-list/departamento-list.component';
import { DepartamentoFormComponent } from './departamento-form/departamento-form.component';


@NgModule({
  declarations: [
    DepartamentoListComponent,
    DepartamentoFormComponent
  ],
  imports: [
    CommonModule,
    DepartamentoRoutingModule,
    CompartidoModule
  ]
})
export class DepartamentoModule { }
