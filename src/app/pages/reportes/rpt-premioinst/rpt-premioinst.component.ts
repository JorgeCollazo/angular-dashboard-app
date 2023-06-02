import { Component, OnInit } from '@angular/core';
import { BaseListComponent } from 'src/app/componentes/base-list/base-list.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsumerService } from 'src/app/services/http/consumer/consumer.service';
import { ToastrService } from 'ngx-toastr';

import { ReportesDto } from '../reportes.class';
import { ExcelService } from 'src/app/services/exportFile/excel.service';

@Component({
  selector: 'app-rpt-premioinst',
  templateUrl: './rpt-premioinst.component.html',
  styleUrls: ['./rpt-premioinst.component.css']
})
export class RptPremioinstComponent extends BaseListComponent implements OnInit {

  
  constructor(
    router: Router,
    consumer: ConsumerService,
    toastr: ToastrService,
    routeAct: ActivatedRoute,
    private excelService: ExcelService) {
    super(router, consumer, toastr, routeAct);
    this.urlForm = './app/pages/rpt-premioinst/rpt-premioinst'; /* Ruta del formulario */
  }

  ngOnInit(): void {
    this.getList();
  }

  async getList() {
    this.loadingPage = true;
    var consumerApiOrden = await this.consumer.Get(this.ApiCtrl.urlPremioInst);
    if (consumerApiOrden.success) {
      let Datos: ReportesDto = consumerApiOrden.data;
      if (Datos.success) {
        this.dataList = Datos.premiosInst;
      } else {
        this.messageApi = Datos.message;
        this.toastr.error(Datos.message, 'Estado de su acción', this.global.optionsToast);
      }
    } else {
      this.messageApi = consumerApiOrden.message.message;
      this.toastr.error(consumerApiOrden.message.message, consumerApiOrden.message?.title, this.global.optionsToast);
    }
    this.loadingPage = false;
  }

  async delete() {

  }

  exportAsXLSX(): void {
    let data_Export: any[] = []
    for (const i in this.dataList) {
      data_Export.push({ ID: this.dataList[i].id, ID_Estacion: this.dataList[i].id_Estacion, ID_Juego: this.dataList[i].id_Juego, Puntaje: this.dataList[i].puntaje, Dificultad: this.dataList[i].dificultad, FechaCrea: this.dataList[i].fechaCrea })
    }
    this.excelService.exportAsExcelFile(data_Export, 'Usuarios ADMIN-ICOM');
  }

  exportExcel(){
    this.excelService.exportExcel('rpt-premioinst');
  }
}
