import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, map } from 'rxjs';
import { environment } from '../../../environments/environment';

import { IDataSchemeEstado } from '../../interfaces/estado.interface';
import { IDataSchemeTipoDoc } from '../../interfaces/tipoDoc.interface';
import { IDataScheme } from '../../interfaces/factura.interface';
import { IDataSucursalScheme } from '../../interfaces/sucursal.interface';
import { PGlobal } from '../globales';
import { IDataSchemeFormaPago } from 'src/app/interfaces/forma_pago.interface';
import { IDataSchemeNatOperation } from 'src/app/interfaces/nat_operacion.interface';

const BACKEND_URL = environment.SRV + "api/Interface/";

@Injectable({
  providedIn: 'root'
})

export class FacturacionDataService {

  private facturasEstado: IDataScheme[]  = [];
  private facturasTipoDoc: IDataScheme[] = [];
  private sucursales: IDataSucursalScheme[] = [];
  private lastDateTimeUpdate: string = "";

  private datosFacturasSub = new Subject<IDataScheme[]>();
  private datosFacturasTipoDocSub = new Subject<IDataScheme[]>();
  private datosSucursalSub = new Subject<IDataSucursalScheme[]>();
  private lastDateTimeUpdateSub = new Subject<string>();
  private global: PGlobal = new PGlobal;
  private id_empresa: number = -1;

  constructor(private http: HttpClient) { }

  get getDatosFacturasListener() {
    return this.datosFacturasSub.asObservable();
  }

  get getDatosFacturasTipoDocListener() {
    return this.datosFacturasTipoDocSub.asObservable();
  }

  get getDatosSucursalesListener() {
    return this.datosSucursalSub.asObservable();
  }

  get getLastDateUpdateListener() {
    return this.lastDateTimeUpdateSub.asObservable();
  }
  setId_empresa() {
    this.id_empresa = this.global.InfoUsr.idempresa;
  }

  getFacturasEstado(date_id: number, id_sucursal: string) {

    this.setId_empresa();

    this.http.get<IDataSchemeEstado>(BACKEND_URL + 'GetFEresumen/' + date_id + ',' + id_sucursal + ',' + this.id_empresa)
    .pipe(
      map(data => {
        if (data && data.resumenList && data.resumenList.length > 0) {
          const firstElement = data.resumenList[0] as { [key: string]: number };
          return Object.keys(firstElement).map(key => (
            {
            name: key.charAt(0).toUpperCase()+key.slice(1),
            value: firstElement[key]
          }));
        }
        return [];
      })
    )
    .subscribe(res => {
      this.facturasEstado = res;
      this.datosFacturasSub.next(
        [...this.facturasEstado]
      )
    });
  }

  getFacturasTipoDoc(date_id: number, id_sucursal: string) {
    this.setId_empresa();
    this.http.get<IDataSchemeTipoDoc>(BACKEND_URL + 'GetFEresumenDoc/' + date_id + ',' + id_sucursal + ',' + this.id_empresa)
    .pipe(
      map(data => {
        if (data && data.resumenDocList && data.resumenDocList.length > 0) {
          const firstElement = data.resumenDocList[0] as { [key: string]: number };
          return Object.keys(firstElement).map(key => (
            {
            name: key.charAt(0).toUpperCase()+key.slice(1),
            value: firstElement[key]
          }));
        }
        return [];
      })
    )
    .subscribe(res => {
      this.facturasTipoDoc = res;
      this.datosFacturasTipoDocSub.next(
                [...this.facturasTipoDoc]
              )
    });
  }

  getServerDateTime() {
    this.http.get<{cur_date_time: Date, message: string, success: boolean}>('https://localhost:44334/api/Interface/GetServerInfo/')
    .subscribe(res => {
      console.log(res);
      if(res.success) {
       this.lastDateTimeUpdate = new Date(res.cur_date_time).toLocaleString(undefined, { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false});
       this.lastDateTimeUpdateSub.next(this.lastDateTimeUpdate);
      }
    });
  }
  // Approach 1
  getSucursales() {
    this.http.get<{success: boolean, message: string, sucursalList: IDataSucursalScheme[]}>(BACKEND_URL + 'GetSucursal/' +  this.global.InfoUsr.usuario_id)
    .subscribe(res => {
      this.sucursales = res.sucursalList
      this.datosSucursalSub.next([...this.sucursales]);
    });
  }
  //Approach 2
  getFormaPago() {
    return this.http.get<{success: boolean, message: string, formaPagoList: IDataSchemeFormaPago[]}>(BACKEND_URL + 'GetFormaPago')
              .pipe(
                map((response) => response['formaPagoList'])
              )
  }

  getNatOperacion() {
    return this.http.get<{success: boolean, message: string, natOperList: IDataSchemeNatOperation[]}>(BACKEND_URL + 'GetNatOper')
              .pipe(
                map((response) => response['natOperList'])
              )
  }
}
