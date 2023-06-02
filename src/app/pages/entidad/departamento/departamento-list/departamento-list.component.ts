import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseListComponent } from 'src/app/componentes/base-list/base-list.component';
import { ConsumerService } from 'src/app/services/http/consumer/consumer.service';
import { DepartamentoDto } from '../departamento.class';

@Component({
  selector: 'app-departamento-list',
  templateUrl: './departamento-list.component.html',
  styleUrls: ['./departamento-list.component.css']
})
export class DepartamentoListComponent extends BaseListComponent implements OnInit {

  constructor(
    router: Router,
    consumer: ConsumerService,
    toastr: ToastrService,
    routeAct: ActivatedRoute) {
    super(router, consumer, toastr, routeAct);
    this.urlForm = './app/pages/entidad/departamento/form-departamento'; /* Ruta del formulario */
  }

  ngOnInit(): void {
    this.getList();
  }

  async getList() {
    this.loadingPage = true;
    var consumerApiOrden = await this.consumer.Get(this.ApiCtrl.urlDepartamento);
    if (consumerApiOrden.success) {
      let Datos: DepartamentoDto = consumerApiOrden.data;
      if (Datos.success) {
        this.dataList = Datos.departamentos;
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
    var consumerApiOrden = await this.consumer.Delete(this.ApiCtrl.urlDepartamento + this.idRegistro);
    if (consumerApiOrden.success) {
      let Datos: DepartamentoDto = consumerApiOrden.data;
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
