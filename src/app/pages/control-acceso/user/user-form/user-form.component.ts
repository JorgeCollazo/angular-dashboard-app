import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseFormComponent } from 'src/app/componentes/base-form/base-form.component';
import { ConsumerService } from 'src/app/services/http/consumer/consumer.service';
import { rolDto } from '../../rol/rol.class';
import { User, UserDto, UserRequest } from '../user.class';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent extends BaseFormComponent implements OnInit {

  dataListRol: any[] = []; /* Lista de datos a mostrar en la vista */

  constructor(
    fb: UntypedFormBuilder,
    consumer: ConsumerService,
    toastr: ToastrService,
    router: Router,
    ActivatedRoute: ActivatedRoute) {
    super(fb, consumer, toastr, router, ActivatedRoute);

    this.urlToReturn = './app/pages/control-acceso/user'; /* Ruta donde regresa al dar click al boton NO en el moddal de acción*/
    this.form(); /* Inicializa el formulario */
    this.getData(); /* Obtiene los datos en caso que venga parametros para filtrar por Id */
    this.getListRol();
  }

  ngOnInit(): void {
  }

  /* Inicia los campos y la configuracion del formulario. */
  form(): void {
    this.formulario = this.fb.group({
      nombre: ['', Validators.required],
      status: [true, Validators.required],
      sw_admin: [false, Validators.required],
      rol_id: ['', Validators.required],
      usuario: ['', Validators.required],
    });

    this.fromDefaultValue = this.formulario.value; // Obtiene los datos por defecto del formulario por si ejecuta el metodo de limpiar el formulario.
    this.stateForm();
  }

  /* Obtiene los datos del formulario. */
  getFormData(): UserRequest {
    let datos: UserRequest = new UserRequest;

    datos.usu_accion = this.global.InfoUsr.usuario_id;

    datos.status = (this.frmCrtl['status'].value) ? 1 : 0;
    datos.sw_admin = (this.frmCrtl['sw_admin'].value) ? 1 : 0;
    datos.nombre = this.frmCrtl['nombre'].value;
    datos.rol_id = this.frmCrtl['rol_id'].value;
    datos.usuario = this.frmCrtl['usuario'].value;

    return datos;
  }

  /* Inserta los Valores en el Formulario. */
  setFormData(datos: User): void {
    this.frmCrtl['nombre'].setValue(datos.nombre);
    this.frmCrtl['status'].setValue((datos.status == 1) ? true : false);
    this.frmCrtl['sw_admin'].setValue((datos.sw_admin == 1) ? true : false);
    this.frmCrtl['rol_id'].setValue(datos.rol_id);
    this.frmCrtl['usuario'].setValue(datos.usuario);
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

    var consumerApiOrden = await this.consumer.Get(this.ApiCtrl.urlUser + this.params['id']);
    if (consumerApiOrden.success) {
      let Datos: UserDto = consumerApiOrden.data;
      if (Datos.success) {
        this.setFormData(Datos.usuario);
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
    let datos: UserRequest = this.getFormData();

    var consumerApiOrden = await this.consumer.Post(this.ApiCtrl.urlUser, datos);
    if (consumerApiOrden.success) {
      let Datos: UserDto = consumerApiOrden.data;
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
    let datos: UserRequest = this.getFormData();

    var consumerApiOrden = await this.consumer.Update(this.ApiCtrl.urlUser + this.params['id'], datos);
    if (consumerApiOrden.success) {
      let Datos: UserDto = consumerApiOrden.data;
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
  async getListRol() {
    this.loadingPage = true;
    var consumerApiOrden = await this.consumer.Get(this.ApiCtrl.urlRol);
    if (consumerApiOrden.success) {
      let Datos: rolDto = consumerApiOrden.data;
      if (Datos.success) {
        this.dataListRol = Datos.roles;
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