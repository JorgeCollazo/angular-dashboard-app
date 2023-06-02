import { Component, OnInit } from '@angular/core';
import { AbstractControl, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PGlobal } from 'src/app/services/globales';
import { ConsumerService } from 'src/app/services/http/consumer/consumer.service';
import { ToastrService } from 'ngx-toastr';
import { Imenu } from 'src/app/interfaces/menu.interface';
import { Login, LoginDto, Permisos, Usuario } from './auth.interface';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})

export class AuthComponent implements OnInit {

  loading: boolean = false;
  mensaje: string = '';
  formulario!: UntypedFormGroup;
  global = new PGlobal;
  WarnMostrar: boolean = false;
  WarnMensaje: string = '';

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private consumer: ConsumerService,
    private toastr: ToastrService
  ) {
    // this.global.salir();
    this.form();
  }

  ngOnInit() {

  }

  /* Inicia los campos y la configuracion del formulario. */
  form(): void {
    this.formulario = this.fb.group({
      user: ['', Validators.required],
      pwd: ['', Validators.required]
    });
  }

  /* Para obtener los controles del formulario y no escribir mucho codigo cuando se necesita. */
  get frmCrtl(): { [key: string]: AbstractControl } {
    return this.formulario.controls;
  }

  /* Metodo para la autenticacion */
  async btnAuth() {
    this.loading = true;
    let datos: Login = new Login;

    /* Obtiene los datos del formulario */
    datos.User = this.frmCrtl['user'].value;
    datos.Pwd = this.frmCrtl['pwd'].value;

    /* Consume el api y arma una respuesta dependiendo si fue correcto o ourrio un error. */
    var consumerApiOrden = await this.consumer.Post('api/Auth/authenticate/', datos);
    /* Valida que todo este correcto */
    if (consumerApiOrden.success) {
      // this.router.navigate(['./app/pages/inicio']); // Solo para entrar sin cargar permisos
      /* Guarda en variable los datos que retorno el api */
      let Datos: LoginDto = consumerApiOrden.data;
      /* Valida que la respuesta del api sea correcta. */
      if (Datos.success) {
        /* Guarda los datatos del usuario Logeado */
        let datosUsuario: Usuario = Datos.usuario;
        this.global.InfoUsr = datosUsuario;
        /* Guarda el token para las peticiones al API */
        this.global.Token = Datos.token;
        // this.router.navigate(['./app/pages/inicio']);
        /* Valida que tenga permisos para las diferentes vistas de la aplicacion */
        if (Datos.permisos) {
          /* Guarda los datos de los permisos */
          let permisosUsuario: Permisos[] = Datos.permisos;
          this.global.InfoMenu = permisosUsuario;
          /* realiza procesos par el cambio de la vista */
          this.nextPage(permisosUsuario);
        } else {
          this.WarnMostrar = true;
          this.WarnMensaje = Datos.message
        }

      } else {
        this.toastr.error(Datos.message, '', this.global.optionsToast);
      }
    } else {

      this.toastr.error(consumerApiOrden.message.message, consumerApiOrden.message?.title, this.global.optionsToast);
    }

    this.loading = false;
  }

  /* Valida que el usuario tenga asignado una vista como pricipal. De no ser asi lo envia a la vista de inicio. */
  nextPage(permisosUsuario: Permisos[]): void {
    let valida_cambio_url: Number = 0;

    for (const i in permisosUsuario) {
      if (permisosUsuario[i].principal == 1) {
        this.router.navigate(['./app/pages/' + permisosUsuario[i].link]);
        valida_cambio_url = 1;
      }
    }

    if (valida_cambio_url == 0) {
      this.router.navigate(['./app/pages/inicio']);
    }
  }

}
