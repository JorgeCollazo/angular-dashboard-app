import { Component, OnInit } from '@angular/core';
import { Permisos } from '../public/auth/auth.interface';
import { PGlobal } from '../services/globales';

declare var $: any;
import alasql from 'alasql';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  global = new PGlobal;
  menu: Permisos[] = new Array<Permisos>();
  dataToFilter: Permisos = {
    idmenu: 0,
    estado: 0,
    crear: 0,
    editar: 0,
    eliminar: 0,
    ver: 0,
    principal: 0,
    menu: 'Datos Transacciones',
    link: 'data-filter',
    orden: 0,
    muestra: 0,
  };

  dashboard: Permisos = {
    idmenu: 10,
    estado: 11,
    crear: 0,
    editar: 0,
    eliminar: 0,
    ver: 0,
    principal: 0,
    menu: 'Dashboard Transacciones',
    link: 'dashboard',
    orden: 20,
    muestra: 21,
  };

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.menu = alasql("SELECT * FROM ? WHERE muestra = 1 ORDER BY `order`", [this.global.InfoMenu]);
    console.log('this.menu>>>>>>>', this.menu);

    this.menu.push(this.dashboard);
    this.menu.push(this.dataToFilter);

  }

  open() {
    $('#sidebar').toggleClass('active');
  }

  salir() {
     this.router.navigateByUrl('/');
  }

}
