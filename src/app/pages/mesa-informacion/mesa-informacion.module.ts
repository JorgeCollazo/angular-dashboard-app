import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompartidoModule } from 'src/app/componentes/compartido.module';
import { MesaInformacionComponent } from './mesa-informacion.component';
import { MesaInformacionRoutingModule } from './mesa-informacion-routing.module';
import { MatInputModule } from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { MesaConteoModule } from '../mesa-conteo/mesa-conteo.module';


@NgModule({
  declarations: [
    MesaInformacionComponent,
  ],
  imports: [
    CommonModule,
    MesaInformacionRoutingModule,
    CompartidoModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MesaConteoModule
  ]
})
export class MesaInformacionModule { }
