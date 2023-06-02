import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ControlAccesoRoutingModule } from './control-acceso-routing.module';
import { CompartidoModule } from 'src/app/componentes/compartido.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    ControlAccesoRoutingModule,
    CompartidoModule
  ]
})
export class ControlAccesoModule { }
