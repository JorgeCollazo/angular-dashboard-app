import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsumerService } from 'src/app/services/http/consumer/consumer.service';
import { ToastrService } from 'ngx-toastr';
import { BaseListComponent } from 'src/app/componentes/base-list/base-list.component';
import { MesaConteoService } from '../mesa-conteo-service';
import { candidatos, candidatosDto } from '../mesa-conteo.class';
import { AbstractControl, NgForm, ValidatorFn } from '@angular/forms';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-conteo-mesa',
  templateUrl: './conteo-mesa.component.html',
  styleUrls: ['./conteo-mesa.component.css'],
})
export class ConteoMesaComponent extends BaseListComponent implements OnInit {
  datos_candidatos: any[] = [];
  solicitud: any;
  flag_envio: boolean = false;
  usu: any;
  constructor(
    router: Router,
    consumer: ConsumerService,
    toastr: ToastrService,
    routeAct: ActivatedRoute
  ) {
    super(router, consumer, toastr, routeAct);
    this.urlForm =
      './app/pages/seleccion-mesa/conteo-mesa'; /* Ruta del formulario */
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as
      | {
          id_acta: number;
          selected_mesa: string;
          selected_id_mesa: number;
        }
      | undefined;
    this.selected_mesa = state?.selected_mesa;
    this.selected_id_mesa = state?.selected_id_mesa;
    this.id_acta = state?.id_acta;
  }

  // image_src = 'data:image/svg+xml;base64,' + 'PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxOS4xLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiDQoJIHZpZXdCb3g9IjAgMCAyNTAgMjUwIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAyNTAgMjUwOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPg0KCS5zdDB7ZmlsbDojREQwMDMxO30NCgkuc3Qxe2ZpbGw6I0MzMDAyRjt9DQoJLnN0MntmaWxsOiNGRkZGRkY7fQ0KPC9zdHlsZT4NCjxnPg0KCTxwb2x5Z29uIGNsYXNzPSJzdDAiIHBvaW50cz0iMTI1LDMwIDEyNSwzMCAxMjUsMzAgMzEuOSw2My4yIDQ2LjEsMTg2LjMgMTI1LDIzMCAxMjUsMjMwIDEyNSwyMzAgMjAzLjksMTg2LjMgMjE4LjEsNjMuMiAJIi8+DQoJPHBvbHlnb24gY2xhc3M9InN0MSIgcG9pbnRzPSIxMjUsMzAgMTI1LDUyLjIgMTI1LDUyLjEgMTI1LDE1My40IDEyNSwxNTMuNCAxMjUsMjMwIDEyNSwyMzAgMjAzLjksMTg2LjMgMjE4LjEsNjMuMiAxMjUsMzAgCSIvPg0KCTxwYXRoIGNsYXNzPSJzdDIiIGQ9Ik0xMjUsNTIuMUw2Ni44LDE4Mi42aDBoMjEuN2gwbDExLjctMjkuMmg0OS40bDExLjcsMjkuMmgwaDIxLjdoMEwxMjUsNTIuMUwxMjUsNTIuMUwxMjUsNTIuMUwxMjUsNTIuMQ0KCQlMMTI1LDUyLjF6IE0xNDIsMTM1LjRIMTA4bDE3LTQwLjlMMTQyLDEzNS40eiIvPg0KPC9nPg0KPC9zdmc+DQo=';

  // getCandidato: any =
  //   {
  //     success: true,
  //     message: "string",
  //     candidatos: [
  //       {
  //         id: 1,
  //         nombre: "Gaby",
  //         foto_candidato: "123123123123",
  //         votos: 0
  //       },
  //       {
  //         id: 1,
  //         nombre: "Candidato 2",
  //         foto_candidato: "123123123123",
  //         votos: 0
  //       },
  //       {
  //         id: 1,
  //         nombre: "Candidato 3",
  //         foto_candidato: "123123123123",
  //         votos: 0
  //       },
  //     ]
  //   }

  selected_mesa: any;
  selected_id_mesa: any;
  id_acta: any;

  ngOnInit(): void {
    //Insertar request al API get Candidatos y llenar objeto this.getCandidato

    this.getmesaconteo(this.global.InfoUsr.usuario_id);
    this.getlist_candidato();
  }

  async btnGuardar(myForm: NgForm) {
    if (myForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hay errores en el formulario!',
      });
    } else { console.log('else');

      //Subir la data de los candidatos con sus respectivos votos
      this.loadingPage = true;
      this.messageApi = '';
      var consumirmesaapiconteo = await this.consumer.Get(
        this.ApiCtrl.urlmesaconteo + this.global.InfoUsr.usuario_id
      ); // validar el usuario donde se obtiene
      if (consumirmesaapiconteo.success) {
        var datos = consumirmesaapiconteo.data;
        if (!datos.success) {
          this.messageApi = 'test conteo no existe.';
          this.messageApi = consumirmesaapiconteo.message.message;
        } else {
          this.router.navigate(['./app/pages/seleccion-mesa/foto-mesa'], {
            state: {
              id_acta: this.id_acta,
              selected_mesa: this.selected_mesa,
              selected_id_mesa: this.selected_id_mesa,
            },
          });
        }
      } else {
        this.messageApi = 'test conteo existe.';
        this.messageApi = consumirmesaapiconteo.message.message;
      }
      this.loadingPage = false;
    }
  }

  async getmesaconteo(usu: any) {
    this.loadingPage = true;
    this.messageApi = '';
    var consumirmesaapiconteo = await this.consumer.Get(
      this.ApiCtrl.urlmesaconteo + usu
    ); // validar el usuario donde se obtiene
    if (consumirmesaapiconteo.success) {
      var datos = consumirmesaapiconteo.data;
      if (!datos.success) {
        this.messageApi = 'test conteo no existe.';
        this.messageApi = consumirmesaapiconteo.message.message;
      } else {
        this.router.navigate(['./app/pages/seleccion-mesa/foto-mesa'], {
          state: {
            id_acta: this.id_acta,
            selected_mesa: this.selected_mesa,
            selected_id_mesa: this.selected_id_mesa,
          },
        });
      }
    } else {
      this.messageApi = 'test conteo existe.';
      this.messageApi = consumirmesaapiconteo.message.message;
    }
    this.loadingPage = false;
  }

  async getlist_candidato() {
    this.loadingPage = true;
    var comsume_api_candidato = await this.consumer.Get(
      this.ApiCtrl.urlcandidato
    );
    if (comsume_api_candidato.success) {
      let Datos: candidatosDto = comsume_api_candidato.data;
      if (Datos.success) {
        this.dataList = Datos.candidatosList;
        if (this.dataList.length >= 2) {
          const total_votos = this.dataList.pop();
          this.dataList.unshift(total_votos);
        }
      }
    } else {
      this.messageApi = comsume_api_candidato.message.message;
      this.toastr.error(
        comsume_api_candidato.message.message,
        comsume_api_candidato.message?.title,
        this.global.optionsToast
      );
    }
    this.loadingPage = false;
  }
}
