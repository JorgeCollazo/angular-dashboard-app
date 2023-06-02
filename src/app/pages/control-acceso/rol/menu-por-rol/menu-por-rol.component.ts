import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import alasql from 'alasql';
import { ToastrService } from 'ngx-toastr';
import { BaseListComponent } from 'src/app/componentes/base-list/base-list.component';
import { ConsumerService } from 'src/app/services/http/consumer/consumer.service';
import { menuRoleDto, menuRoles, menuRolesRequest } from '../menuRol.class';

@Component({
  selector: 'app-menu-por-rol',
  templateUrl: './menu-por-rol.component.html',
  styleUrls: ['./menu-por-rol.component.css']
})
export class MenuPorRolComponent extends BaseListComponent implements OnInit {

  data: menuRolesRequest = new menuRolesRequest();
  constructor(
    router: Router,
    consumer: ConsumerService,
    toastr: ToastrService,
    routeAct: ActivatedRoute) {
    super(router, consumer, toastr, routeAct);
    this.urlForm = './app/pages/control-acceso/rol/rol-form'; /* Ruta del formulario */
    this.urlConfig = './app/pages/control-acceso/rol/menu-por-rol'; /* Ruta de configuración de los permisos */
  }

  ngOnInit(): void {
    this.getParams();
    this.data.rol_id = this.params['id'];
    this.getList();
  }

  option(id: number, propiedad: string) {
    let menuRole: menuRoles = alasql("SELECT * FROM ? WHERE acc_menu_id = ?", [this.dataList, id])[0];

    this.data.estado = menuRole.estado;
    this.data.crear = menuRole.crear;
    this.data.editar = menuRole.editar;
    this.data.eliminar = menuRole.eliminar;
    this.data.ver = menuRole.ver;
    this.data.principal = menuRole.principal;

    this.data.menu_id = menuRole.acc_menu_id;

    if (this.data.estado == 0) {
      this.data.consulta = 'C';
    } else {
      this.data.consulta = 'U';
    }

    switch (propiedad) {
      case 'estado':
        this.data.estado = (menuRole.estado == 0) ? 1 : 0;
        this.data.consulta = (this.data.estado == 0) ? 'D' : 'C';
        break;
      case 'crear':
        this.data.crear = (menuRole.crear == 0) ? 1 : 0;
        this.data.estado = 1;
        break;
      case 'editar':
        this.data.editar = (menuRole.editar == 0) ? 1 : 0;
        this.data.estado = 1;
        break;
      case 'eliminar':
        this.data.eliminar = (menuRole.eliminar == 0) ? 1 : 0;
        this.data.estado = 1;
        break;
      case 'ver':
        this.data.ver = (menuRole.ver == 0) ? 1 : 0;
        this.data.estado = 1;
        break;
      case 'principal':
        this.data.principal = (menuRole.principal == 0) ? 1 : 0;
        this.data.estado = 1;
        break;
      default:
        break;
    }
    this.save();

    // if (this.global.permisos.editar == 1 && this.global.permisos.crear == 1) {
    //   this.save();
    // } else {
    //   this.toastr.info('Usted no posee permisos para ejecutar est acción', 'Estado del proceso', this.global.optionsToast);
    // }

  }

  async getList() {
    this.loadingPage = true;
    var consumerApiOrden = await this.consumer.Get(this.ApiCtrl.urlMenuPorRolByRol + this.data.rol_id);
    if (consumerApiOrden.success) {
      let Datos: menuRoleDto = consumerApiOrden.data;
      if (Datos.success) {
        this.dataList = Datos.menuRoles;
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

  async save() {
    this.loadingRequest = true;
    var consumerApiOrden = await this.consumer.Post(this.ApiCtrl.urlMenuPorRol, this.data);
    if (consumerApiOrden.success) {
      let Datos: menuRoleDto = consumerApiOrden.data;
      if (Datos.success) {
        this.dataList =[];
        this.dataList = Datos.menuRoles;
        this.toastr.success('Actualizado Correctamente', 'Estado de su acción', this.global.optionsToast);
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