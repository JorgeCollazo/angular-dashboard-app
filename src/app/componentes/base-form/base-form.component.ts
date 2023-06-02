import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PGlobal } from 'src/app/services/globales';
import { ApiController } from 'src/app/services/http/apiController';
import { ConsumerService } from 'src/app/services/http/consumer/consumer.service';

@Component({
  selector: 'app-base-form',
  templateUrl: './base-form.component.html',
  styleUrls: []
})
export class BaseFormComponent {

  loadingPage: boolean = false; /* Muestra Cargando al iniciar la vista. */
  loadingRequest: boolean = false; /* Muestra Cargando al enviar al API. */
  messageApi: string = ''; /* Mensaje del API ya sea de errores o exitosos. */
  formulario!: UntypedFormGroup; /* Formulario de la Entidad que esta gestionando. */
  fromDefaultValue: any; /* Variable para guardar los datos por defecto del formulario. */
  urlToReturn: string = ''; /* Ruta donde debe regresar el usuario en caso de al boton Regresar o al crear un nuevo registro. */
  global = new PGlobal; /* Variables y funciones globales. */
  ApiCtrl: ApiController = new ApiController; /* Url de los controladores del api para consumir. */
  btnAction = { BtnClearIsVisible: false, BtnSaveIsVisible: false }; /* Controla si muestra el boton o no en el formulario */
  params: any; // Parametros del router.
  getDataByParams: boolean = false; // Variable le indica al metodo GET si hay parametros para consultar o no (si no hay el get ejecura un return para no realizar la peticion http)
  mdlMsg: string = ''; /* Mensaje que se muestra en el modal al momento de crear un registro. */
  mdlShow: boolean = false; /* muestra u oculta la ventana modal de acciones */

  constructor(
    public fb: UntypedFormBuilder,
    public consumer: ConsumerService,
    public toastr: ToastrService,
    public router: Router,
    public routeAct: ActivatedRoute) {
  }

  /* Para obtener los controles del formulario y no escribir mucho codigo cuando se necesita. */
  get frmCrtl(): { [key: string]: AbstractControl } {
    return this.formulario.controls;
  }

  /* Valida los parametros del Router para identificar si va a modificar informacion o solo ver la infromacion. Dependiendo se habilitan los botones y el formulario. */
  stateForm(): void {
    const snapshot = this.routeAct.snapshot;
    const params = snapshot.params; // Parametros enviados por la ruta
    let cantidadParametros: number = Object.keys(params).length;
    if (cantidadParametros > 0) {
      this.getDataByParams = true;
      this.params = params;
      if (this.params['action'] == 'view') { // Si solo es para visualizar los datos se deshabilita el formulario y no muestra los botónes de acción.
        this.formulario.disable();
      } else if (this.params['action'] == 'edit') { // Si va a edityar se hailita el boton de guardar.
        this.btnAction.BtnSaveIsVisible = true;
      }
    } else {
      this.btnAction.BtnClearIsVisible = true;
      this.btnAction.BtnSaveIsVisible = true;
    };

  }

  /* Es la accion que toma el boton Regresar en la vista de formulario. */
  btnToReturn(): void {
    this.router.navigate([this.urlToReturn]);
  }

  /* Es la accion que toma el boton Limpiar en la vista de formulario. */
  btnClear(): void {
    this.formulario.reset();
    this.formulario.setValue(this.fromDefaultValue);
  }

  /* Luego de insertar un nuevo registro el sistema muestra un modal para preguntar al usurio si desea crear otro registro. */
  btnSowMdlMessage(): void {
    this.mdlShow = true;
  }

  /* Es la acción que toma el boton Si en el modal que muestra despues de agregar un nuevo registro. */
  btnYes(): void {
    this.mdlShow = false;
    this.btnClear();
  }

  /* Es la acción que toma el boton Si en el modal que muestra despues de agregar un nuevo registro. */
  btnNo(): void {
    this.mdlShow = false;
    this.btnToReturn();
  }

}
