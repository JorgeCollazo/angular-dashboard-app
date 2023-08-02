import { Component, ViewChild, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

import { IDataSucursalScheme } from 'src/app/interfaces/sucursal.interface';
import { IDataSchemeCommon } from 'src/app/interfaces/common.interface';
import { IDataFacturaScheme } from 'src/app/interfaces/facturaData.interface';
// import { FacturacionDataItem } from './facturacion-data-datasource';
import { EXAMPLE_DATA } from './facturacion-data-datasource'
import { FacturacionDataService } from '../../services/facturacion-data/facturacion-data.service';

@Component({
  selector: 'app-facturacion-data',
  templateUrl: './facturacion-data.component.html',
  styleUrls: ['./facturacion-data.component.css']
})

export class FacturacionDataComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<IDataFacturaScheme>;

  dataSource:  MatTableDataSource<IDataFacturaScheme> = new MatTableDataSource<IDataFacturaScheme>();

  filteringForm!: FormGroup;
  fecha_inicio: Date = new Date();
  fecha_fin: Date = new Date();
  sucursal_id: string = '';
  evento: string = "";
  t_pago: string = "";
  tipo_doc: string = "";
  tipo_op: string = "";
  status: string = "";
  facturasPerPage: number = 10;
  currentPage: number = 1;
  pageSizeOptions = [1, 5, 10, 20];
  facturasTotalAmount: number = 0;
  sucursales: IDataSucursalScheme[] = [];
  formasPago: IDataSchemeCommon[] = [];
  natOperaciones: IDataSchemeCommon[] = [];
  tipoDocs: IDataSchemeCommon[] = [];
  feStatusList: IDataSchemeCommon[] = [];
  facturaDataList: IDataFacturaScheme[] = [];
  tempDate: string = new Date().toLocaleDateString("en-GB");
  startDateControl: FormControl = new FormControl(this.getFirstDayOfMonth());
  endDateControl: FormControl = new FormControl(new Date());
  private datosSucursales: Subscription = new Subscription();
  private formasPago$: Subscription = new Subscription();
  private natOperacion$: Subscription = new Subscription();
  private tipoDoc$: Subscription = new Subscription();
  private feStatus$: Subscription = new Subscription();
  private facturaData$: Subscription = new Subscription();
  tableDataSet: boolean = false;
  isDataTablaLoaded: boolean = true;
  resultMessage: string = '';
  // private isDataTablaLoadedSub$: Subscription = new Subscription();

  filteringData = {
    i_fechaini: this.startDateControl.value,
    i_fechafin: this.endDateControl.value,
    i_filtrosuc: null,
    i_filtrocia: 1,
    i_estatus: null,
    i_tipo_op: null,
    i_tipo_doc: null,
    i_forma_pago: null,
    i_pagina: this.currentPage,
    i_registropagina: this.facturasPerPage
  }

  // EXAMPLE_DATA: FacturacionDataItem[] = [
  //   {nro: 1, fecha_creacion: new Date(), fecha_inicio: new Date(), t_pago: 51, t_doc: 15, t_op: 71, status: 1, evento: 1, sucursal: 'Xtra'},
  //   {nro: 2, fecha_creacion: new Date(), fecha_inicio: new Date(), t_pago: 52, t_doc: 25, t_op: 72, status: 2, evento: 2, sucursal: 'Campeon'},
  //   {nro: 3, fecha_creacion: new Date(), fecha_inicio: new Date(), t_pago: 53, t_doc: 35, t_op: 73, status: 3, evento: 3, sucursal: 'El Costo'},
  //   {nro: 4, fecha_creacion: new Date(), fecha_inicio: new Date(), t_pago: 54, t_doc: 45, t_op: 74, status: 4, evento: 4, sucursal: 'Oca Loca'},
  //   {nro: 5, fecha_creacion: new Date(), fecha_inicio: new Date(), t_pago: 55, t_doc: 55, t_op: 75, status: 5, evento: 5, sucursal: 'Conway'},
  //   {nro: 6, fecha_creacion: new Date(), fecha_inicio: new Date(), t_pago: 56, t_doc: 65, t_op: 76, status: 6, evento: 6, sucursal: 'Titan'},
  //   {nro: 7, fecha_creacion: new Date(), fecha_inicio: new Date(), t_pago: 57, t_doc: 75, t_op: 77, status: 7, evento: 7, sucursal: 'Super 99'},
  // ]


  /* Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['rownum', 'fecha', 'suc', 'fpago', 'tipodoc', 'nop', 'estatus', 'actions'];

  constructor(private facturacionDataService: FacturacionDataService, private datePipe: DatePipe) {}

  ngOnInit(): void {

  // const newDate = new Date();
  // const localizedDateString = newDate.toLocaleDateString("en-GB");
  // const parts = localizedDateString.split("/");
  // const formattedDateString = `${parts[1]}/${parts[0]}/${parts[2]}`;
  // const formattedDate = new Date(formattedDateString);
  // const formattedDateString2 = this.formatDate(formattedDate);
  // this.startDateControl.setValue(formattedDateString2)
  // console.log('Date2>>>>', formattedDateString2);

    // for(let i=0; EXAMPLE_DATA.length<100; i++) {
    //   let j = this.getRandomInt(6);
    //   EXAMPLE_DATA.push(EXAMPLE_DATA[j]);
    // }
    // console.log(EXAMPLE_DATA);

    this.filteringForm = new FormGroup({
      startDateControl: this.startDateControl,
      endDateControl: this.endDateControl,
      formaPagoControl: new FormControl(),
      tipoDocControl: new FormControl(),
      tipoOperControl: new FormControl(),
      tipoEstadoControl: new FormControl(),
      tipoSucursalControl: new FormControl(),
    })


  // console.log('this.filteringForm>>>>>', this.filteringForm.value.startDateControl);

    this.facturacionDataService.getSucursales();
    this.datosSucursales = this.facturacionDataService.getDatosSucursalesListener.subscribe(
      (sucursales => {
        this.sucursales = sucursales;
      })
    );

  this.formasPago$ = this.facturacionDataService.getFormaPago()
    .subscribe((formasPago) => {
      this.formasPago = formasPago;
    })

  this.natOperacion$ = this.facturacionDataService.getNatOperacion()
    .subscribe((natOper) => {
      this.natOperaciones = natOper;
    })

  this.tipoDoc$ = this.facturacionDataService.getTipoDoc()
    .subscribe((tipoDoc) => {
      this.tipoDocs = tipoDoc;
    })

  this.feStatus$ = this.facturacionDataService.getFEstatus()
    .subscribe((feStatus) => {
      this.feStatusList = feStatus;
    })

  this.getFacturaData(this.filteringData);
  this.facturaData$ = this.facturacionDataService.getFacturasUpdatedListener()
    .subscribe(facturaData => {
      console.log('facturaData>>>>', facturaData);
      this.facturaDataList = facturaData.facturas;
      this.facturasTotalAmount = facturaData.facturasTotal;
      this.isDataTablaLoaded = facturaData.success;
      this.resultMessage = facturaData.message;
      this.setTableData();
    });
    // this.isDataTablaLoadedSub$ = this.facturacionDataService.getIsDataTablaLoadedListener()
    //   .subscribe(isDataTablaLoaded => {
    //     console.log('isDataTablaLoaded>>>>', isDataTablaLoaded);

    //     this.isDataTablaLoaded = isDataTablaLoaded;
    //   })
  // this.facturaData$ = this.facturacionDataService.getFacturasData(this.filteringData)
  //   .subscribe((factura) => {
  //     this.facturaDataList = factura;
  //     this.facturasTotalAmount = factura.rows
  //     this.setTableData();
  //   })
  }

  ngOnDestroy() {
    this.formasPago$.unsubscribe();
    this.natOperacion$.unsubscribe();
    this.tipoDoc$.unsubscribe();
    this.datosSucursales.unsubscribe();
    this.feStatus$.unsubscribe();
    this.facturaData$.unsubscribe();
  }

  applyFilter(event: Event): void {
    let filterValue = (event.target as HTMLInputElement)?.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  resetForm() {
    this.filteringForm.reset();
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }

  onSucursalChangeSelection(e: any): void {
    this.sucursal_id = e.value;
  }

  // formatDate(date: Date): string {
  //   return this.datePipe.transform(date, 'dd/MM/yyyy')!;
  // }

  onChangePage(pageData: PageEvent) {
  // this.facturasTotalAmount = pageData.length;
    this.currentPage = pageData.pageIndex + 1;
    this.facturasPerPage = pageData.pageSize;
    this.updateDataFactura();
    this.getFacturaData(this.filteringData);
    // this.facturacionDataService.getFacturasData(this.filteringData)
    //   .subscribe((factura) => {
    //     this.facturaDataList = factura.facturas;
    //     this.facturasTotalAmount = factura.facturasTotal;
    //     this.setTableData();
    //   });
  }

  setTableData() {
    console.log('this.isDataTablaLoaded>>>', this.isDataTablaLoaded);
    this.dataSource = new MatTableDataSource<IDataFacturaScheme>(this.facturaDataList);
    this.table.dataSource = this.dataSource;
    this.dataSource.sort = this.sort;
    if(!this.tableDataSet) {
      this.dataSource.paginator = this.paginator;
      this.tableDataSet = true;
    }
  }

  filterFacturaData() {
    this.updateDataFactura();
    this.getFacturaData(this.filteringData);

  }

  getFacturaData(filteringData: any) {
    this.facturacionDataService.getFacturasData(filteringData);
      // .subscribe((factura) => {
      //   this.facturaDataList = factura.facturas;
      //   this.facturasTotalAmount = factura.facturasTotal;
      //   this.setTableData();
      // })
  }

  updateDataFactura() {
    this.filteringData = {
      i_fechaini: this.filteringForm.value.startDateControl,
      i_fechafin: this.filteringForm.value.endDateControl,
      i_filtrosuc: this.filteringForm.value.tipoSucursalControl,
      i_filtrocia: 1,                                                 //this.filteringForm.value.tipo  -----> Filtro de empresa
      i_estatus: this.filteringForm.value.tipoEstadoControl,
      i_tipo_op: this.filteringForm.value.tipoOperControl,
      i_tipo_doc: this.filteringForm.value.tipoDocControl,
      i_forma_pago: this.filteringForm.value.formaPagoControl,
      i_pagina: this.currentPage,
      i_registropagina: this.facturasPerPage
    }
    console.log('this.filteringData>>>>>', this.filteringForm);

  }

  getFirstDayOfMonth(): Date {
    const currentDate = new Date();
    return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  }

  downloadCaffePDF(facturaNumber: number) {

    const isSigned = true;
    // const url = 'https://factura.key-pac.com/KeyPac/Facturacion/ExportZip/' + facturaNumber + '?issigned=' + isSigned;
    const url = 'https://ipv4.download.thinkbroadband.com/100MB.zip';
    const name = 'Pdf name';
    console.log('url>>>>', url);

    this.facturacionDataService.downloadCaffePDF(url, name);
  }

}


