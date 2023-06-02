import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EntidadOpcionRoutingModule } from './entidad-opcion-routing.module';
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
    EntidadOpcionRoutingModule,
    CompartidoModule
  ]
})
export class EntidadOpcionModule { }
