import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RolRoutingModule } from './rol-routing.module';
import { MenuPorRolComponent } from './menu-por-rol/menu-por-rol.component';
import { RolListComponent } from './rol-list/rol-list.component';
import { RolFormComponent } from './rol-form/rol-form.component';
import { CompartidoModule } from 'src/app/componentes/compartido.module';


@NgModule({
  declarations: [
    RolListComponent,
    RolFormComponent,
    MenuPorRolComponent
  ],
  imports: [
    CommonModule,
    RolRoutingModule,
    CompartidoModule
  ]
})
export class RolModule { }
