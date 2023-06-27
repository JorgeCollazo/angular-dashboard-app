import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConteoMesaComponent } from './conteo-mesa/conteo-mesa.component';
import { FotoMesaComponent } from './foto-mesa/foto-mesa.component';
import { SeleccionMesaComponent } from './seleccion-mesa/seleccion-mesa.component';
import { CompartidoModule } from 'src/app/componentes/compartido.module';
import { MesaConteoRoutingModule } from './mesa-conteo-routing.module';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HeaderPageComponent } from '../../componentes/header-page/header-page.component';
import { FormsModule } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [
    ConteoMesaComponent,
    FotoMesaComponent,
    SeleccionMesaComponent,
    // HeaderPageComponent,
  ],
  imports: [
    CommonModule,
    MesaConteoRoutingModule,
    CompartidoModule,
    MatSelectModule,
    MatButtonModule,
    MatToolbarModule,
    FormsModule,
    MatInputModule
  ],
  exports: [
    // HeaderPageComponent,
  ]
})
export class MesaConteoModule { }
