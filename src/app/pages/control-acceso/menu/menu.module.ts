import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuRoutingModule } from './menu-routing.module';
import { MenuListComponent } from './menu-list/menu-list.component';
import { MenuFormComponent } from './menu-form/menu-form.component';
import { CompartidoModule } from 'src/app/componentes/compartido.module';


@NgModule({
  declarations: [
    MenuListComponent,
    MenuFormComponent],
  imports: [
    CommonModule,
    MenuRoutingModule,
    CompartidoModule
  ]
})
export class MenuModule { }
