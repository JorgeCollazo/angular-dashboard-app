import { Component, Input, OnInit } from '@angular/core';
import { PGlobal } from 'src/app/services/globales';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  nombre = '';
  descripcion = '';

  global = new PGlobal;

  constructor() { }

  ngOnInit(): void {
    this.nombre = this.global.permisos.menu;
  }

}
