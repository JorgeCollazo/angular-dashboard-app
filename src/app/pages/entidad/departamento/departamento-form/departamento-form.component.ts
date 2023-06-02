import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseFormComponent } from 'src/app/componentes/base-form/base-form.component';
import { ConsumerService } from 'src/app/services/http/consumer/consumer.service';
import { Departamento, DepartamentoDto, DepartamentoRequest } from '../departamento.class';

@Component({
  selector: 'app-departamento-form',
  templateUrl: './departamento-form.component.html',
  styleUrls: ['./departamento-form.component.css']
})
export class DepartamentoFormComponent extends BaseFormComponent implements OnInit {

  constructor(
    fb: UntypedFormBuilder,
    consumer: ConsumerService,
    toastr: ToastrService,
    router: Router,
    ActivatedRoute: ActivatedRoute) {
    super(fb, consumer, toastr, router, ActivatedRoute);

    this.urlToReturn = './app/pages/entidad/tipo-entidad'; /* Ruta donde regresa al dar click al boton NO en el moddal de acción*/
    this.form(); /* Inicializa el formulario */
    this.getData(); /* Obtiene los datos en caso que venga parametros para filtrar por Id */

  }

  ngOnInit(): void {
  }

  /* Inicia los campos y la configuracion del formulario. */
  form(): void {
    this.formulario = this.fb.group({
      mant_nombre: ['', Validators.required],
      mant_activo: [true, Validators.required]
    });

    this.fromDefaultValue = this.formulario.value; // Obtiene los datos por defecto del formulario por si ejecuta el metodo de limpiar el formulario.
    this.stateForm();
  }

  /* Obtiene los datos del formulario. */
  getFormData(): DepartamentoRequest {
    let datos: DepartamentoRequest = new DepartamentoRequest;

    datos.mant_activo = (this.frmCrtl['mant_activo'].value) ? 1 : 0;
    datos.mant_nombre = this.frmCrtl['mant_nombre'].value;

    return datos;
  }

  /* Inserta los Valores en el Formulario. */
  setFormData(datos: Departamento): void {
    this.frmCrtl['mant_nombre'].setValue(datos.dep_nombre);
    this.frmCrtl['mant_activo'].setValue((datos.dep_SwActivo == 1) ? true : false);
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

    var consumerApiOrden = await this.consumer.Get(this.ApiCtrl.urlTipoEntidad + this.params['id']);
    if (consumerApiOrden.success) {
      let Datos: DepartamentoDto = consumerApiOrden.data;
      if (Datos.success) {
        this.setFormData(Datos.departamento);
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
    let datos: DepartamentoRequest = this.getFormData();

    var consumerApiOrden = await this.consumer.Post(this.ApiCtrl.urlTipoEntidad, datos);
    if (consumerApiOrden.success) {
      let Datos: DepartamentoDto = consumerApiOrden.data;
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
    let datos: DepartamentoRequest = this.getFormData();

    var consumerApiOrden = await this.consumer.Update(this.ApiCtrl.urlTipoEntidad + this.params['id'], datos);
    if (consumerApiOrden.success) {
      let Datos: DepartamentoDto = consumerApiOrden.data;
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

}

