import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PGlobal } from 'src/app/services/globales';
import { ApiController } from 'src/app/services/http/apiController';
import { ConsumerService } from 'src/app/services/http/consumer/consumer.service';

import alasql from 'alasql';

@Component({
  selector: 'app-base-list',
  templateUrl: './base-list.component.html',
  styleUrls: []
})
export class BaseListComponent {

  loadingPage: boolean = false;/* Muestra Cargando al iniciar la vista. */
  loadingRequest: boolean = false; /* Muestra Cargando al enviar al API. */
  messageApi: string = ''; /* Mensaje del API ya sea de errores o exitosos. */
  global = new PGlobal; /* Variables y funciones globales. */
  ApiCtrl: ApiController = new ApiController; /* Url de los controladores del api para consumir. */
  dataList: any[] = []; /* Lista de datos a mostrar en la vista */
  filterText: string = ''; /* Campo paera filtrar texto */
  p: any; /* Porpiedad de pginacion */
  rowsPage: number = 10; /* Indica la cantidad de filas que se muestran en la tabla */
  mdlMsg: string = ''; /* Mensaje que se muestra en el modal al momento de eliminar un registro. */
  mdlShow: boolean = false; /* muestra u oculta la ventana modal de acciones */
  idRegistro: number = 0; /* I del registro quese va a eliminar*/
  urlForm: string = ''; /* Ruta donde se encuentra el formulario de la antidad actual. */
  urlConfig: string = ''; /* Ruta donde se encuentra la configuracion de algun elemento especifico. */
  params: any; // Parametros del router.


  constructor(
    public router: Router,
    public consumer: ConsumerService,
    public toastr: ToastrService,
    public routeAct: ActivatedRoute) { }

  getParams(): void {
    const snapshot = this.routeAct.snapshot;
    const params = snapshot.params; // Parametros enviados por la ruta
    let cantidadParametros: number = Object.keys(params).length;
    if (cantidadParametros > 0) {
      this.params = params;
    }
  }

  /* Muestra el modal para preguntar si en realidad desea Eliminar el registro. */
  btnSowMdlMessage(): void {
    this.mdlShow = true;
  }

  /* Es la acción que toma el boton No en el modal. */
  btnNo(): void {
    this.mdlShow = false;
  }

  btnAdd(): void {
    this.router.navigate([this.urlForm]);
  }

  btnRouterForm(action: string, idRegistro: number): void {
    this.router.navigate([`${this.urlForm}/${action}/${idRegistro}`]);
  }

  btnDelete(nombreRegistro: string, idRegistro: number): void {
    this.idRegistro = idRegistro;
    this.mdlMsg = `¿Deseas desea eliminar el registro "${nombreRegistro}"?`;
    this.btnSowMdlMessage();
  }

  btnConfig(id: number): void {
    this.router.navigate([this.urlConfig + `/${id}`]);
  }
}
