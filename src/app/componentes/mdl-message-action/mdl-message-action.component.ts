import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { PGlobal } from 'src/app/services/globales';

declare var $: any;

@Component({
  selector: 'app-mdl-message-action',
  templateUrl: './mdl-message-action.component.html',
  styleUrls: ['./mdl-message-action.component.css']
})
export class MdlMessageActionComponent implements OnInit {

  @Input() msg: string = '';
  @Input() mdlTitle: string = '';
  @Input() show: boolean = false;
  @Input() action: string = '';
  @Input() loadingRequest: boolean = false;
  colorAlert: string = '';

  @Output() Yes = new EventEmitter(); /* Envie evento al componente padre para ejecutar una acción */
  @Output() No = new EventEmitter(); /* Envie evento al componente padre para ejecutar una acción */


  global = new PGlobal; /* Variables y funciones globales. */
  constructor() {
  }

  ngOnInit(): void {
    switch (this.action) {
      case 'new':
        this.colorAlert = 'primary';
        break;
      case 'edit':
        this.colorAlert = 'success';
        break;
      case 'delete':
        this.colorAlert = 'danger';
        break;

      default:
        //this.colorAlert = 'default';
        break;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['show'].currentValue) {
      $('#mdlMessage').modal('show');
    } else {
      $('#mdlMessage').modal('hide');
    }
  }

  btnMdlYes() {
    this.Yes.emit();
  }

  btnMdlNo() {
    this.No.emit();
  }

}
