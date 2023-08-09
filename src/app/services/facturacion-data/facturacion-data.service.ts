import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, map, shareReplay } from 'rxjs';
import { environment } from '../../../environments/environment';

import { IDataSchemeEstado } from '../../interfaces/estado.interface';
import { IDataSchemeTipoDoc } from '../../interfaces/tipoDoc.interface';
import { IDataScheme } from '../../interfaces/factura.interface';
import { IDataSucursalScheme } from '../../interfaces/sucursal.interface';
import { PGlobal } from '../globales';
import { IDataSchemeCommon } from 'src/app/interfaces/common.interface';
import { IDataFacturaScheme } from 'src/app/interfaces/facturaData.interface';
import { FormGroup } from '@angular/forms';

const BACKEND_URL = environment.SRV + "api/Interface/";
const BACKEND_URL_CONSULTAFE = environment.SRV + "api/ConsultaFE/";

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
  private datosSucursalSub = new Subject<{success: boolean, message: string, sucursalList: IDataSucursalScheme[]}>();
  private lastDateTimeUpdateSub = new Subject<string>();
  private global: PGlobal = new PGlobal;
  private id_empresa: number = -1;
  private facturasUpdated = new Subject<{facturas: IDataFacturaScheme[], facturasTotal: number, message: string, success: boolean}>();
  private facturas: IDataFacturaScheme[] = [];
  // private isDataTablaLoadedSub = new Subject<boolean>();

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

  getFacturasUpdatedListener() {
    return this.facturasUpdated.asObservable();
  }

  // getIsDataTablaLoadedListener() {
  //   return this.isDataTablaLoadedSub.asObservable();
  // }

  setId_empresa() {
    this.id_empresa = this.global.InfoUsr.idempresa;
  }

  getFacturasEstado(date_id: number, id_sucursal: string): void {

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

  getFacturasTipoDoc(date_id: number, id_sucursal: string): void {
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

  getServerDateTime(): void {
    this.http.get<{cur_date_time: Date, message: string, success: boolean}>(BACKEND_URL + 'GetServerInfo')
    .subscribe(res => {
      console.log(res);
      if(res.success) {
       this.lastDateTimeUpdate = new Date(res.cur_date_time).toLocaleString(undefined, { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: false});
       this.lastDateTimeUpdateSub.next(this.lastDateTimeUpdate);
      }
    });
  }
  // Approach 1
  getSucursales(): void {
    this.http.get<{success: boolean, message: string, sucursalList: IDataSucursalScheme[]}>(BACKEND_URL + 'GetSucursal/' +  this.global.InfoUsr.usuario_id)
    .subscribe(
      {
      next: res => {console.log('res>>>>', res);
        this.sucursales = res.sucursalList ?? [];	
        this.datosSucursalSub.next({success: res.success, message: res.message, sucursalList: [...this.sucursales]});
      },
      error: err => {
        console.log('err>>>>', err);
      }
    },
      // res => {  console.log('sucursales>>>>', res);
      // this.sucursales = res.sucursalList
      // this.datosSucursalSub.next([...this.sucursales]);
    // }
    );
  }
  //Approach 2
  getFormaPago(): Observable<any> {
    return this.http.get<{success: boolean, message: string, formaPagoList: IDataSchemeCommon[]}>(BACKEND_URL + 'GetFormaPago')
      .pipe(
        map((response) => response['formaPagoList'])
      )
  }

  getNatOperacion(): Observable<any> {
    return this.http.get<{success: boolean, message: string, natOperList: IDataSchemeCommon[]}>(BACKEND_URL + 'GetNatOper')
      .pipe(
        map((response) => response['natOperList']),
      )
  }

  getTipoDoc(): Observable<any> {
    return this.http.get<{success: boolean, message: string, tipoDocList: IDataSchemeCommon[]}>(BACKEND_URL + 'GetTipoDoc')
      .pipe(
        map((response) => response['tipoDocList']),
      )
  }

  getFEstatus(): Observable<any> {
    return this.http.get<{success: boolean, message: string, estatusDocList: IDataSchemeCommon[]}>(BACKEND_URL + 'GetFEstatus')
      .pipe(
        map((response) => response['estatusDocList']),
      )
  }

  getFacturasData(filteringData: any): void {
    this.http.post<{success: boolean, rows: number, message: string, consultaFEList: IDataFacturaScheme[]}>(BACKEND_URL_CONSULTAFE + 'GetConsultaFE/', filteringData)
      .pipe(
        map((response) => {
          // console.log('response>>>>>', response.rows);
          return {
            facturas: response['consultaFEList'],
            facturasTotal: response.rows,
            message: response.message,
            success: response.success,
          }
      }),
    ).subscribe({
      next: updatedFacturas => {
        this.facturas = updatedFacturas.facturas ?? [];
        this.facturasUpdated.next({
          facturas: [...this.facturas],
          facturasTotal: updatedFacturas.facturasTotal,
          message: updatedFacturas.message,
          success: updatedFacturas.success,
        });
        // if(updatedFacturas.success) {
        //   this.isDataTablaLoadedSub.next(true);
        // } else {
        //   this.isDataTablaLoadedSub.next(false);
        // }
      },
      error: error => {
        console.log('error>>>>', error);
        // this.isDataTablaLoadedSub.next(false);
      }
    });
  }

  downloadCaffePDF(url: string, fileName: string) {
    this.http.get(url, { responseType: 'blob' }).subscribe((response: Blob) => {
      const blob = new Blob([response], { type: 'application/pdf' });
      const downloadLink = document.createElement('a');
      downloadLink.href = URL.createObjectURL(blob);
      downloadLink.download = fileName;
      downloadLink.click();
    });
  }
}

// updatedFacturas => {
//   // console.log('updatedFactura>>>>>', updatedFacturas);


// }
