import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PGlobal } from 'src/app/services/globales';

@Component({
  selector: 'app-btn-actions',
  templateUrl: './btn-actions.component.html',
  styleUrls: ['./btn-actions.component.css']
})
export class BtnActionsComponent implements OnInit {

  @Input() btnEdit: boolean = true;
  @Input() btnView: boolean = true;
  @Input() btnDelete: boolean = true;
  @Input() btnConfig: boolean = false;

  @Output() Edit = new EventEmitter(); /* Ejecuta evento en el componente Padre. */
  @Output() View = new EventEmitter(); /* Ejecuta evento en el componente Padre. */
  @Output() Delete = new EventEmitter(); /* Ejecuta evento en el componente Padre. */
  @Output() Config = new EventEmitter(); /* Ejecuta evento en el componente Padre. */

  global = new PGlobal;
  constructor() {
    
    /* Asigna los permisos que tiene el usuario en la vista cargada. */
    this.btnEdit = (this.global.permisos.editar == 1) ? true : false;
    this.btnView = (this.global.permisos.ver == 1) ? true : false;
    this.btnDelete = (this.global.permisos.eliminar == 1) ? true : false;
  }

  ngOnInit(): void {
  }

  ViewAction() {
    this.View.emit();
  }

  EditAction() {
    this.Edit.emit();
  }

  DeleteAction() {
    this.Delete.emit();
  }

  ConfigAction() {
    this.Config.emit();
  }

}
