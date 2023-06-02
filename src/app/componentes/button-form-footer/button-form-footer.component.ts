import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-form-footer',
  templateUrl: './button-form-footer.component.html',
  styleUrls: ['./button-form-footer.component.css']
})
export class ButtonFormFooterComponent implements OnInit {

  /* Decorador de entradas,  recibe los datos de las variables componente padre. */
  @Input() formIsValid: boolean = false;  /* Si el formulario es valido habilita el bóton de lo contrario lo deshabilita. */
  @Input() loadingRequest: boolean = false; /* Muestra o oculta el icono de texto de cargando. */
  @Input() BtnClearIsVisible: boolean = false; /* Muestra o oculta el botón de limpiar. */
  @Input() BtnSaveIsVisible: boolean = false; /* Muestra o oculta el botón de Guardar. */

  /* Decorador de salida, Emite eventos al componente padre. */
  @Output() Clear = new EventEmitter(); /* Al dar clic al bóton Limpiar se envia un evento al componente padre para que ejecute el método btnClear() en BaseFormComponent. */
  @Output() Return = new EventEmitter(); /* Al dar clic al bóton Regresar se envia un evento al componente padre para que ejecute el método btnToReturn() en BaseFormComponent. */
  @Output() Save = new EventEmitter(); /* Al dar clic al bóton Guardar se envia un evento al componente padre para que ejecute el método btnSave() en El componente correspondiente del formulario. */

  constructor() { }

  ngOnInit(): void {
  }

  EmitBtnToReturn(): void {
    this.Return.emit();
  }

  EmitBtnClear(): void {
    this.Clear.emit();
  }

  EmitBtnSave(): void {
    this.Save.emit();
  }

}
