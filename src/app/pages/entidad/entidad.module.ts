import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntidadRoutingModule } from './entidad-routing.module';
import { CompartidoModule } from 'src/app/componentes/compartido.module';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    EntidadRoutingModule,
    CompartidoModule
  ]
})
export class EntidadModule { }
