import { Component, OnInit } from '@angular/core';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { BaseFormComponent } from 'src/app/componentes/base-form/base-form.component';
import { scannerDto, scannerRequest } from './scanner.class';
@Component({
  selector: 'app-scanner',
  templateUrl: './scanner.component.html',
  styleUrls: ['./scanner.component.css']
})
export class ScannerComponent extends BaseFormComponent implements OnInit{

  qrResultString: any;

  ngOnInit(): void {
  }

  clearResult(): void {
    this.qrResultString = null;
  }

  onCodeResult(resultString: string) {
    this.qrResultString = resultString;
    this.saveData(resultString);
  }

  parseScannerData(resultString: string) : scannerRequest{
    let datos: scannerRequest = new scannerRequest;
    let stringData = resultString.split("+");
    datos.consulta = "C";
    datos.id_Estacion = Number(stringData[0]);
    datos.id_Juego = Number(stringData[1]);
    datos.puntaje = Number(stringData[2]);
    datos.dificultad = Number(stringData[3]);

    return datos;
  }
  /* Guarda el registro. */
  async saveData(resultString: string) {
    this.loadingRequest = true;
    this.messageApi = '';
    let datos: scannerRequest = this.parseScannerData(resultString);

    var consumerApiOrden = await this.consumer.Post(this.ApiCtrl.urlPremioInst, datos);
    if (consumerApiOrden.success) {
      let Datos: scannerDto = consumerApiOrden.data;
      if (Datos.success) {
        this.toastr.success(Datos.message, 'Estado de su acción', this.global.optionsToast);
        this.mdlMsg = '¿Deseas crear otro registro?';
        this.btnSowMdlMessage();
        this.btnClear();
      } else {
        this.messageApi = Datos.message;
        this.toastr.error(Datos.message, 'Estado de su acción', this.global.optionsToast);
      }
    } else {
      this.messageApi = consumerApiOrden.message.message;
      this.toastr.error(consumerApiOrden.message.message, consumerApiOrden.message?.title, this.global.optionsToast);
    }
    this.loadingRequest = false;
  }

}
