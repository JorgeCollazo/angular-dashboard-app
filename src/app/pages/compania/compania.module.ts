import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompaniaRoutingModule } from './compania-routing.module';
import { CompaniaFormComponent } from './compania-form/compania-form.component';
import { CompaniaListComponent } from './compania-list/compania-list.component';
import { CompartidoModule } from 'src/app/componentes/compartido.module';


@NgModule({
  declarations: [
    CompaniaFormComponent,
    CompaniaListComponent
  ],
  imports: [
    CommonModule,
    CompaniaRoutingModule,
    CompartidoModule
  ]
})
export class CompaniaModule { }
