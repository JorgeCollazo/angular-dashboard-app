import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PGlobal } from 'src/app/services/globales';

@Component({
  selector: 'app-button-list-add',
  templateUrl: './button-list-add.component.html',
  styleUrls: ['./button-list-add.component.css']
})
export class ButtonListAddComponent implements OnInit {

  @Output() Add = new EventEmitter(); /* Ejecuta evento en el componente Padre. */

  crear: boolean = false;
  global = new PGlobal;
  constructor() {
    /* Carga el permiso de Crear en la vista actual. */
    this.crear = (this.global.permisos.crear == 1) ? true : false;
  }

  ngOnInit(): void {
    /* Carga el permiso de Crear en la vista actual. */
    this.crear = (this.global.permisos.crear == 1) ? true : false;
  }

  btnAdd() {
    this.Add.emit();
  }

}
