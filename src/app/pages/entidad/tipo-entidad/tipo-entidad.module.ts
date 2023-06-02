import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TipoEntidadRoutingModule } from './tipo-entidad-routing.module';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { CompartidoModule } from 'src/app/componentes/compartido.module';


@NgModule({
  declarations: [
    ListComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    TipoEntidadRoutingModule,
    CompartidoModule
  ]
})
export class TipoEntidadModule { }
