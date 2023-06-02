import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserFormComponent } from './user-form/user-form.component';
import { CompartidoModule } from 'src/app/componentes/compartido.module';
import { MenuPorUsuarioComponent } from './menu-por-usuario/menu-por-usuario.component';


@NgModule({
  declarations: [
    UserListComponent,
    UserFormComponent,
    MenuPorUsuarioComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    CompartidoModule
  ]
})
export class UserModule { }
