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

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.menu = alasql("SELECT * FROM ? WHERE muestra = 1 ORDER BY `order`", [this.global.InfoMenu]);
    console.log(this.global.InfoMenu);
    console.log(this.menu);

  }

  open() {
    $('#sidebar').toggleClass('active');
  }

  salir() {
     this.router.navigateByUrl('/');
  }

}
