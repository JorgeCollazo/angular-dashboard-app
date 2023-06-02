import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseListComponent } from 'src/app/componentes/base-list/base-list.component';
import { ConsumerService } from 'src/app/services/http/consumer/consumer.service';
import { MenuDto } from '../menu.class';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent extends BaseListComponent implements OnInit {

  constructor(
    router: Router,
    consumer: ConsumerService,
    toastr: ToastrService,
    routeAct: ActivatedRoute) {
    super(router, consumer, toastr, routeAct);
    this.urlForm = './app/pages/control-acceso/menu/menu-form'; /* Ruta del formulario */
  }

  ngOnInit(): void {
    this.getList();
  }

  async getList() {
    this.loadingPage = true;
    var consumerApiOrden = await this.consumer.Get(this.ApiCtrl.urlMenu);
    if (consumerApiOrden.success) {
      let Datos: MenuDto = consumerApiOrden.data;
      if (Datos.success) {
        this.dataList = Datos.menus;
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
    var consumerApiOrden = await this.consumer.Delete(this.ApiCtrl.urlMenu + this.idRegistro);
    if (consumerApiOrden.success) {
      let Datos: MenuDto = consumerApiOrden.data;
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
