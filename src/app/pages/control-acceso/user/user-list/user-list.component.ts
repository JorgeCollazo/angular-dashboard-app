import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseListComponent } from 'src/app/componentes/base-list/base-list.component';
import { ConsumerService } from 'src/app/services/http/consumer/consumer.service';
import { UserDto } from '../user.class';
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent extends BaseListComponent implements OnInit {

  constructor(
    router: Router,
    consumer: ConsumerService,
    toastr: ToastrService,
    routeAct: ActivatedRoute) {
    super(router, consumer, toastr, routeAct);
    this.urlForm = './app/pages/control-acceso/user/user-form'; /* Ruta del formulario */
    this.urlConfig = './app/pages/control-acceso/user/menu-por-usuario'; /* Ruta de configuración de los permisos */
  }

  ngOnInit(): void {
    this.getList();
  }

  async getList() {
    this.loadingPage = true;
    var consumerApiOrden = await this.consumer.Get(this.ApiCtrl.urlUser);
    if (consumerApiOrden.success) {
      let Datos: UserDto = consumerApiOrden.data;
      if (Datos.success) {
        this.dataList = Datos.usuarios;
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
    var consumerApiOrden = await this.consumer.Delete(this.ApiCtrl.urlUser + this.idRegistro);
    if (consumerApiOrden.success) {
      let Datos: UserDto = consumerApiOrden.data;
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