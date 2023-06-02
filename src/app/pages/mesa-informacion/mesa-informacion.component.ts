import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsumerService } from 'src/app/services/http/consumer/consumer.service';
import { ToastrService } from 'ngx-toastr';
import { BaseListComponent } from 'src/app/componentes/base-list/base-list.component';
import { AsistenciaPost, MesaInformacionRequest, CedulaResult } from './mesa-info.class';
import { Provincia } from '../mesa-conteo/mesa-conteo.class';

@Component({
  selector: 'app-mesa-informacion',
  templateUrl: './mesa-informacion.component.html',
  styleUrls: ['./mesa-informacion.component.css']
})
export class MesaInformacionComponent extends BaseListComponent implements OnInit {

  flag_envio: boolean = false;
  solicitud: MesaInformacionRequest = new MesaInformacionRequest();
  asistencia: AsistenciaPost = new AsistenciaPost();
  cedula_res: CedulaResult = new CedulaResult();
  voto_gaby: boolean = false;
  voto_otro: boolean = false;
  
  constructor(
    router: Router,
    consumer: ConsumerService,
    toastr: ToastrService,
    routeAct: ActivatedRoute) {
    super(router, consumer, toastr, routeAct);
    this.urlForm = './app/pages/mesa-info/mesa-info'; /* Ruta del formulario */
  }
  ngOnInit(): void {
  }

  async buscarCedula(){
    //Request al api, desplegar en los campos de this.solicitud
    var consumerApiConteos = await this.consumer.Get('api/Cedula/'+this.solicitud.cedula_afiliado);
    
    if (consumerApiConteos.success) {
        if (consumerApiConteos.data.success) {
          this.solicitud = consumerApiConteos.data.cedula;
          this.asistencia.id_centro_votacion = this.solicitud.id_centro;
          this.asistencia.cedula_afiliado = this.solicitud.cedula_afiliado;
          this.asistencia.sw_consultado = this.solicitud.sw_consultado;
          this.asistencia.sw_encontrado = 1;
        } else {
          this.asistencia.sw_encontrado = 0;
            alert('Cedula no localizada. Favor verificar');
        }
    } else {
        alert('Error al realizar consulta de cedula : ' + consumerApiConteos.message);

    }
  }

  async votoGaby(){
    //Cambiar estatus de boton
    if(this.asistencia.sw_consultado==0 && this.asistencia.sw_encontrado==1){
        this.asistencia.consulta = 'C';
        this.asistencia.id_usuario = this.global.InfoUsr.usuario_id;
        this.asistencia.sw_voto = 1;

        var consumerApiAsistencia = await this.consumer.Post('api/Asistencia/',this.asistencia);
        
        if (consumerApiAsistencia.success) {
            alert('Consulta de cedula procesada correctamente');
            this.solicitud = new MesaInformacionRequest(); 
            this.asistencia = new AsistenciaPost();
        } else {
          alert('Error al procesar cedula consultada: ' + consumerApiAsistencia.message);
        }    
      } else {
          this.solicitud = new MesaInformacionRequest(); 
          this.asistencia = new AsistenciaPost();
      }
  }

  async votoOtro(){
    // Lo mismo
    if(this.asistencia.sw_consultado==0 && this.asistencia.sw_encontrado==1){
        this.asistencia.consulta = 'C';
        this.asistencia.id_usuario = this.global.InfoUsr.usuario_id;
        this.asistencia.sw_voto = 0;
        
        var consumerApiAsistencia = await this.consumer.Post('api/Asistencia/',this.asistencia);
        
        if (consumerApiAsistencia.success) {
          alert('Consulta de cedula procesada correctamente');
          this.solicitud = new MesaInformacionRequest(); 
          this.asistencia = new AsistenciaPost();
        } else {
            alert('Error al procesar cedula consultada: ' + consumerApiAsistencia.message);
        }      
      } else {
        this.solicitud = new MesaInformacionRequest(); 
        this.asistencia = new AsistenciaPost();
      }
  }
}
