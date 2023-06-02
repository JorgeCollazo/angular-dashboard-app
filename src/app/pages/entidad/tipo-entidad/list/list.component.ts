import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseListComponent } from 'src/app/componentes/base-list/base-list.component';
import { ConsumerService } from 'src/app/services/http/consumer/consumer.service';
import { tipoEntidadDto } from '../tipo-entidad.class';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent extends BaseListComponent implements OnInit {

  constructor(
    router: Router,
    consumer: ConsumerService,
    toastr: ToastrService,
    routeAct: ActivatedRoute) {
    super(router, consumer, toastr, routeAct);
    this.urlForm = './app/pages/entidad/tipo-entidad/form'; /* Ruta del formulario */
  }

  ngOnInit(): void {
    this.getList();
  }

  async getList() {
    this.loadingPage = true;
    var consumerApiOrden = await this.consumer.Get(this.ApiCtrl.urlTipoEntidad);
    if (consumerApiOrden.success) {
      let Datos: tipoEntidadDto = consumerApiOrden.data;
      if (Datos.success) {
        this.dataList = Datos.tiposEntidades;
      } else {
        this.messageApi = Datos.message;
        this.toastr.error(Datos.message, 'Estado de su acción', this.global.optionsToast);
      }
    } else {
      this.messageApi = consumerApiOrden.message.message;
      this.toastr.error(consumerApiOrden.message.message, consumerApiOrden.message?.title, this.global.optionsToast);
    }
    this.loadingPage = false;
  }

  async delete() {
    this.loadingRequest = true;
    var consumerApiOrden = await this.consumer.Delete(this.ApiCtrl.urlTipoEntidad + this.idRegistro);
    if (consumerApiOrden.success) {
      let Datos: tipoEntidadDto = consumerApiOrden.data;
      if (Datos.success) {
        this.getList();
        this.mdlShow = false;
      } else {
        this.messageApi = Datos.message;
        this.toastr.error(Datos.message, 'Estado de su acción', this.global.optionsToast);
      }
    } else {
      this.messageApi = consumerApiOrden.message.message;
      this.toastr.error(consumerApiOrden.message.message, consumerApiOrden.message?.title, this.global.optionsToast);
    }
    this.loadingRequest = false;
  }

} 