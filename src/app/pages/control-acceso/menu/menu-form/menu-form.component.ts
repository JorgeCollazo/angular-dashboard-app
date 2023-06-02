import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import alasql from 'alasql';
import { ToastrService } from 'ngx-toastr';
import { BaseFormComponent } from 'src/app/componentes/base-form/base-form.component';
import { ConsumerService } from 'src/app/services/http/consumer/consumer.service';
import { menu, MenuDto, menuRequest } from '../menu.class';

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styleUrls: ['./menu-form.component.css']
})
export class MenuFormComponent extends BaseFormComponent implements OnInit {

  ListMenuPadre: menu[] = new Array<menu>();
  constructor(
    fb: UntypedFormBuilder,
    consumer: ConsumerService,
    toastr: ToastrService,
    router: Router,
    ActivatedRoute: ActivatedRoute) {
    super(fb, consumer, toastr, router, ActivatedRoute);

    this.urlToReturn = './app/pages/control-acceso/menu'; /* Ruta donde regresa al dar click al boton NO en el moddal de acción*/
    this.form(); /* Inicializa el formulario */
    this.getData(); /* Obtiene los datos en caso que venga parametros para filtrar por Id */
    this.getList(); /* Consulta el menu para seleccionar el menu padre en caso tal se necesite. */
  }

  ngOnInit(): void {
  }

  /* Inicia los campos y la configuracion del formulario. */
  form(): void {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      link: ['', Validators.required],
      nivel: ['', Validators.required],
      orden: ['', Validators.required],
      descripcion: [''],
      status: [true, Validators.required],
      sw_display: [true, Validators.required],
      sw_admin: [false, Validators.required],
      padre: ['0']
    });

    this.fromDefaultValue = this.formulario.value; // Obtiene los datos por defecto del formulario por si ejecuta el metodo de limpiar el formulario.
    this.stateForm();
  }

  /* Obtiene los datos del formulario. */
  getFormData(): menuRequest {
    let datos: menuRequest = new menuRequest;

    datos.usu_accion = this.global.InfoUsr.usuario_id;
    datos.nombre = this.frmCrtl['nombre'].value;
    datos.status = (this.frmCrtl['status'].value) ? 1 : 0;
    datos.sw_admin = (this.frmCrtl['sw_admin'].value) ? 1 : 0;
    datos.descripcion = this.frmCrtl['descripcion'].value;
    datos.nivel = this.frmCrtl['nivel'].value;
    datos.link = this.frmCrtl['link'].value;
    datos.sw_display = (this.frmCrtl['sw_display'].value) ? 1 : 0;
    datos.orden = this.frmCrtl['orden'].value;
    datos.padre = this.frmCrtl['padre'].value;
    return datos;
  }

  /* Inserta los Valores en el Formulario. */
  setFormData(datos: menu): void {
    this.frmCrtl['nombre'].setValue(datos.nombre);
    this.frmCrtl['status'].setValue((datos.status == 1) ? true : false);
    this.frmCrtl['sw_admin'].setValue((datos.sw_admin == 1) ? true : false);
    this.frmCrtl['descripcion'].setValue(datos.descripcion);
    this.frmCrtl['nivel'].setValue(datos.nivel);
    this.frmCrtl['link'].setValue(datos.link);
    this.frmCrtl['sw_display'].setValue((datos.sw_display == 1) ? true : false);
    this.frmCrtl['orden'].setValue(datos.orden);
    this.frmCrtl['padre'].setValue(datos.padre);
  }

  /* Valida si va a actualizar o Crear el registro. */
  btnSave() {
    /* Primero valida si se permitio hacer un GET (hay parametro) y valida Si es de edicion y se procede actualizar de los contrario se procede a crear el registro.*/
    if (this.getDataByParams) {
      if (this.params['action'] == 'edit') {
        if (confirm(`Hola ${this.global.InfoUsr.nombre} ¿Seguro quieres actualizar el registro?`))
          this.updateData();
      }
    } else {
      this.saveData();
    }
  }

  /* Busca el registro del parametro envido en el router. */
  async getData() {
    /* Antes de consultar el registro valida si hay parametros, de no existir parametros nos indica que la accion es un nuevo registro por lo tanto no se ejecuta el http. */
    if (!this.getDataByParams)
      return;

    this.loadingPage = true;
    this.messageApi = '';

    var consumerApiOrden = await this.consumer.Get(this.ApiCtrl.urlMenu + this.params['id']);
    if (consumerApiOrden.success) {
      let Datos: MenuDto = consumerApiOrden.data;
      if (Datos.success) {
        this.setFormData(Datos.menu);
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

  /* Guarda el registro. */
  async saveData() {
    this.loadingRequest = true;
    this.messageApi = '';
    let datos: menuRequest = this.getFormData();

    var consumerApiOrden = await this.consumer.Post(this.ApiCtrl.urlMenu, datos);
    if (consumerApiOrden.success) {
      let Datos: MenuDto = consumerApiOrden.data;
      if (Datos.success) {
        this.toastr.success(Datos.message, 'Estado de su acción', this.global.optionsToast);
        this.mdlMsg = '¿Deseas crear otro registro?';
        this.btnSowMdlMessage();
        this.btnClear();
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

  /* Actualiza el registro. */
  async updateData() {
    this.loadingRequest = true;
    this.messageApi = '';
    let datos: menuRequest = this.getFormData();

    var consumerApiOrden = await this.consumer.Update(this.ApiCtrl.urlMenu + this.params['id'], datos);
    if (consumerApiOrden.success) {
      let Datos: MenuDto = consumerApiOrden.data;
      if (Datos.success) {
        this.toastr.success(Datos.message, 'Estado de su acción', this.global.optionsToast);
        this.btnToReturn();
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

  /* Consulta el menu para seleccionar el menu padre en caso tal se necesite. */
  async getList() {
    this.loadingPage = true;
    var consumerApiOrden = await this.consumer.Get(this.ApiCtrl.urlMenu);
    if (consumerApiOrden.success) {
      let Datos: MenuDto = consumerApiOrden.data;
      if (Datos.success) {
        this.ListMenuPadre = alasql("SELECT * FROM ? WHERE padre = 0", [Datos.menus]);
        //this.dataList = Datos.menus;
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

}
