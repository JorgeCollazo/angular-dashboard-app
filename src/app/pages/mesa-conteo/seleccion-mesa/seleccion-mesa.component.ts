import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from 'src/app/componentes/base-list/base-list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsumerService } from 'src/app/services/http/consumer/consumer.service';
import { ToastrService } from 'ngx-toastr';
import { SeleccionMesa } from './seleccion-mesa.class';
import {
  CentrosDto,
  CorregimientoDto,
  DistritoDto,
  MesasDto,
  ProvinciaDto,
  MesaSelDto
} from '../mesa-conteo.class';
import { MesaConteoService } from '../mesa-conteo-service';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-seleccion-mesa',
  templateUrl: './seleccion-mesa.component.html',
  styleUrls: ['./seleccion-mesa.component.css'],
})
export class SeleccionMesaComponent
  extends BaseListComponent
  implements OnInit
{
  mesaConteoService: MesaConteoService = new MesaConteoService();
  solicitud: any;
  flag_envio: boolean = false;

  MesaSeleccion: SeleccionMesa = new SeleccionMesa();

  // Variables
  provincias: any[] = [];
  distritos: any[] = [];
  corregimientos: any[] = [];
  centros: any[] = [];
  mesas: any[] = [];
  selected_provincia: any;
  selected_distrito: any;
  selected_corregimiento: any;
  selected_centro: any;
  selected_circuito: any;
  selected_mesa: any;
  selected_id_mesa: any;
  id_acta: any;
  selectedValueDistrito: any;
  selectedValueCorregimiento: any;
  selectedValueCentro: any;
  selectedValueMesa: any;

  constructor(
    router: Router,
    consumer: ConsumerService,
    toastr: ToastrService,
    routeAct: ActivatedRoute
  ) {
    super(router, consumer,toastr, routeAct);
    this.urlForm =
      './app/pages/seleccion-mesa/seleccion-mesa'; /* Ruta del formulario */
  }

  ngOnInit(): void {
    this.getProvincias();
    //IMPORTANTE
    //verificar el estatus del usuario si ya tomo una mesa, si ya tomo una mesa y el acta fue creada, redireccionar
    // a conteo-mesa: si se creo el acta pero no se han subido los conteos
    // a foto-mesa: si se creo el acta, se suvieron los conteos, pero hace falta la foto del acta
  }

  setProvincia(provincia: any) {
    this.selected_provincia = provincia;
    console.log('Selected id provincia: ' + this.selected_provincia);
    // console.log("Selected id distrito: " + this.selected_distrito)
    console.log('distritos: ' + this.distritos);
    // console.log("distritos: " + )
    this.getDistritos(this.selected_provincia);
    this.limpiarSelecciones();
  }
  setDistrito(distrito: any) {
    this.selected_distrito = distrito;
    console.log('Selected id distrito: ' + this.selected_distrito);
    this.getCorregimientos(this.selected_distrito);
    // this.limpiarSelecciones()
    this.selectedValueCentro = '';
    this.selectedValueCorregimiento = '';
    this.selectedValueMesa = '';
  }
  setCorregimiento(corregimiento: any) {
    this.selected_corregimiento = corregimiento;
    console.log('Selected id corregimiento: ' + this.selected_corregimiento);
    this.getCentros(corregimiento);
    this.selectedValueCentro = '';
    this.selectedValueMesa = '';
  }
  setCentro(centro: any) {
    this.selected_centro = centro;
    console.log('Selected id centro: ' + this.selected_centro);
    this.getMesas(centro);
  }
  setMesa(mesa: any) {
    //this.selected_mesa = this.mesas.find(x => x.id_mesa == mesa).mesa_nombre //CORREGIR ESTA LINEA PARA QUE APLIQUE LA DATA QUE VENGA DEL QUERY
    this.selected_id_mesa = mesa;
    console.log('Selected id mesa: ' + mesa);
  }
  async getProvincias() {
    this.loadingPage = true;
    this.messageApi = '';
    var consumerApiOrden = await this.consumer.Get(this.ApiCtrl.urlProvincia);
    if (consumerApiOrden.success) {
      let Datos: ProvinciaDto = consumerApiOrden.data;
      this.provincias = Datos.provinciasList;
      if (Datos.success) {
        // this.setFormData(Datos.departamento);
      } else {
        this.messageApi = Datos.message;
        this.toastr.error(
          Datos.message,
          'Estado de su acción',
          this.global.optionsToast
        );
      }
    } else {
      this.messageApi = consumerApiOrden.message.message;
      // this.toastr.error(consumerApiOrden.message.message, consumerApiOrden.message?.title, this.global.optionsToast);
    }
    this.loadingPage = false;
  }
  async getDistritos(selected_provincia: any) {
    this.loadingPage = true;
    this.messageApi = '';
    var consumerApiOrden = await this.consumer.Get(
      this.ApiCtrl.urlDistrito + this.selected_provincia
    );
    if (consumerApiOrden.success) {
      let Datos: DistritoDto = consumerApiOrden.data;
      this.distritos = Datos.distritosList;
      if (Datos.success) {
        // this.setFormData(Datos.departamento);
      } else {
        this.messageApi = Datos.message;
        this.toastr.error(
          Datos.message,
          'Estado de su acción',
          this.global.optionsToast
        );
      }
    } else {
      this.messageApi = consumerApiOrden.message.message;
      // this.toastr.error(consumerApiOrden.message.message, consumerApiOrden.message?.title, this.global.optionsToast);
    }
    this.loadingPage = false;
  }
  async getCorregimientos(selected_distrito: any) {
    this.loadingPage = true;
    this.messageApi = '';
    var consumerApiOrden = await this.consumer.Get(
      this.ApiCtrl.urlCorregimiento +
        this.selected_provincia +
        ',' +
        this.selected_distrito
    );
    if (consumerApiOrden.success) {
      let Datos: CorregimientoDto = consumerApiOrden.data;
      this.corregimientos = Datos.corregimientosList;
      if (Datos.success) {
        // this.setFormData(Datos.departamento);
      } else {
        this.messageApi = Datos.message;
        this.toastr.error(
          Datos.message,
          'Estado de su acción',
          this.global.optionsToast
        );
      }
    } else {
      this.messageApi = consumerApiOrden.message.message;
      // this.toastr.error(consumerApiOrden.message.message, consumerApiOrden.message?.title, this.global.optionsToast);
    }
    this.loadingPage = false;
  }

  async getCentros(selected_corregimiento: any) {
    this.loadingPage = true;
    this.messageApi = '';
    var consumerApiOrden = await this.consumer.Get(
      this.ApiCtrl.urlCentro +
        this.selected_provincia +
        ',' +
        this.selected_distrito +
        ',' +
        this.selected_corregimiento
    );
    if (consumerApiOrden.success) {
      let Datos: CentrosDto = consumerApiOrden.data;
      this.centros = Datos.centrosList;
      if (Datos.success) {
        // this.setFormData(Datos.departamento);
      } else {
        this.messageApi = Datos.message;
        this.toastr.error(
          Datos.message,
          'Estado de su acción',
          this.global.optionsToast
        );
      }
    } else {
      this.messageApi = consumerApiOrden.message.message;
      // this.toastr.error(consumerApiOrden.message.message, consumerApiOrden.message?.title, this.global.optionsToast);
    }
    this.loadingPage = false;
  }

  async getMesas(selected_centro: any) {
    this.loadingPage = true;
    this.messageApi = '';
    console.log('this.selected_centro : ' + this.selected_centro);
    var consumerApiOrden = await this.consumer.Get(
      this.ApiCtrl.urlMesas + this.selected_centro
    );
    if (consumerApiOrden.success) {
      let Datos: MesasDto = consumerApiOrden.data;
      this.mesas = Datos.mesainfoList;
      if (Datos.success) {
        // this.setFormData(Datos.departamento);
      } else {
        this.messageApi = Datos.message;
        this.toastr.error(
          Datos.message,
          'Estado de su acción',
          this.global.optionsToast
        );
      }
    } else {
      this.messageApi = consumerApiOrden.message.message;
      // this.toastr.error(consumerApiOrden.message.message, consumerApiOrden.message?.title, this.global.optionsToast);
    }
    this.loadingPage = false;
  }

  async btnRegistrar() {

    if(confirm("Esta seguro de seleccionar esta mesa ?")) {
      //Se sube el base64 de la foto this.base64TextString al API
      this.loadingPage = true;
      this.messageApi = '';

      this.MesaSeleccion.consulta = 'C';
      this.MesaSeleccion.id_usuario = this.global.InfoUsr.usuario_id;
      this.MesaSeleccion.id_acta = 0; // el id de acta es autonumerico
      this.MesaSeleccion.id_prov = this.selected_provincia;
      this.MesaSeleccion.id_dist = this.selected_distrito;
      this.MesaSeleccion.id_corr = this.selected_corregimiento;
      this.MesaSeleccion.id_circ = '0';
      this.MesaSeleccion.id_centro = this.selected_centro;
      this.MesaSeleccion.fecha_hora ='';
      this.MesaSeleccion.foto = '';
      this.MesaSeleccion.id_mesa = this.selected_mesa;
      
      var consumerApiOrden = await this.consumer.Get(this.ApiCtrl.urlSelMesa +
                this.MesaSeleccion.consulta + ',' +
                this.MesaSeleccion.id_usuario + ',' +
                this.MesaSeleccion.id_acta + ',' +
                this.MesaSeleccion.id_prov + ',' +
                this.MesaSeleccion.id_dist + ',' +
                this.MesaSeleccion.id_corr + ',' +
                this.MesaSeleccion.id_centro + ',' +
                this.MesaSeleccion.id_mesa
      );
      
      if (consumerApiOrden.success) {
        let Datos: MesaSelDto = consumerApiOrden.data;
        if (Datos.success) {
          alert('Seleccion de mesa procesada correctamente');
          this.messageApi = consumerApiOrden.message.message;

          this.router.navigate(['./app/pages/seleccion-mesa/conteo-mesa'], { state: {id_acta: this.id_acta, selected_mesa: this.selected_mesa, selected_id_mesa: this.selected_id_mesa}});

        } else {
          this.messageApi = Datos.message;
          alert('Ha ocurrido un error al procesar su selección');
        }
      }    
      this.loadingPage = false;
    }
    
  //Realizar query aqui, subir informacion de cual mesa va a ser tomada
  //Luego de subir la informacion correctamente, navegar a pantalla conteo-mesa
  //envio de data a siguiente pantalla
  
}

  limpiarSelecciones() {
    this.selected_distrito = '';
    this.distritos = [];
    this.corregimientos = [];
    this.centros = [];
    this.mesas = [];
    this.selectedValueDistrito = '';
    this.selectedValueCorregimiento = '';
    this.selectedValueCentro = '';
    this.selectedValueMesa = '';
  }
}
