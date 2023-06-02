import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PGlobal } from 'src/app/services/globales';

@Component({
  selector: 'app-button-float-bottom',
  templateUrl: './button-float-bottom.component.html',
  styleUrls: ['./button-float-bottom.component.css']
})
export class ButtonFloatBottomComponent implements OnInit {

  @Output() Event = new EventEmitter(); /* Ejecuta evento en el componente Padre. */

  crear: boolean = false;
  global = new PGlobal;
  constructor() {
    /* Carga el permiso de Crear en la vista actual. */
    this.crear = (this.global.permisos.crear == 1) ? true : false;
  }

  ngOnInit(): void {
  }

  sendEvent(): void {
    this.Event.emit();
  }

}
