import { Component, ViewChild, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
import {MatTooltipModule} from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-facturacion-data',
  templateUrl: './facturacion-data.component.html',
  styleUrls: ['./facturacion-data.component.css']
})

export class FacturacionDataComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<IDataFacturaScheme>;
  @ViewChild('table2') table2!: MatTable<IDataFacturaScheme>;

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
  facturasPerPage: number = 25;
  currentPage: number = 1;
  pageSizeOptions = [25,50,100];
  facturasTotalAmount: number = 0;
  sucursales: IDataSucursalScheme[] = [];
  formasPago: IDataSchemeCommon[] = [];
  natOperaciones: IDataSchemeCommon[] = [];
  tipoDocs: IDataSchemeCommon[] = [];
  feStatusList: IDataSchemeCommon[] = [];
  facturaDataList: IDataFacturaScheme[] = [];
  tempDate: string = new Date().toLocaleDateString("en-GB");
  predefinedDate = this.getFirstDayOfMonth();
  startDateControl: FormControl = new FormControl(this.predefinedDate, [
    Validators.required,
    this.requiredIfClearedValidator(this.predefinedDate),
  ]);
  endDateControl: FormControl = new FormControl(new Date(), [
    Validators.required,
    this.requiredIfClearedValidator(new Date()),
  ]);
  private datosSucursales: Subscription = new Subscription();
  private formasPago$: Subscription = new Subscription();
  private natOperacion$: Subscription = new Subscription();
  private tipoDoc$: Subscription = new Subscription();
  private feStatus$: Subscription = new Subscription();
  private facturaData$: Subscription = new Subscription();
  tableDataSet: boolean = false;
  isDataTablaLoaded: boolean = false;
  resultMessage: string = '';
  isSucursalLoaded: boolean = false;
  isSpinnerLoading: boolean = true;
  // private isDataTablaLoadedSub$: Subscription = new Subscription();
  queryParams = this.route.snapshot.queryParams;
  filteringData = {
    i_fechaini: this.startDateControl.value,
    i_fechafin: this.endDateControl.value,
    i_filtrosuc: null,
    i_filtrocia: 1,
    i_estatus: null,
    i_tipo_op: null,
    i_tipo_doc: null,
    i_forma_pago: null,
    ruc: '',
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
  displayedColumns = ['rownum','ruc','transCode','fecha', 'suc', 'fpago', 'tipodoc', 'nop', 'estatus', 'actions'];
  displayedColumnsAuditoria = ['rownum','ruc','transCode','receptor','tipodoc','subtotal','montodesc','itbmTotal','total','exento','subTotalIMP1_5%','ISC_5%', 'actions'];
  displayedColumnsAuditoria2 = ['rownum','ruc','transCode','subtotal','montodesc','exento','gravado','itbms_percent','itbms','total', 'actions'];

  constructor(private facturacionDataService: FacturacionDataService, private datePipe: DatePipe, private route: ActivatedRoute) {}


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
      ruc: new FormControl(),
    })


  // console.log('this.filteringForm>>>>>', this.filteringForm.value.startDateControl);

    this.facturacionDataService.getSucursales();
    this.datosSucursales = this.facturacionDataService.getDatosSucursalesListener.subscribe(
      (sucursales => {

        this.sucursales = sucursales.sucursalList;
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

    // const queryParams = this.route.snapshot.queryParams;
    // console.log('Object.keys>>>>>>>>', Object.keys(this.queryParams).length);
    if(Object.keys(this.queryParams).length == 0) {

      this.getFacturaData(this.filteringData);

      this.facturaData$ = this.facturacionDataService.getFacturasUpdatedListener()
      .subscribe(facturaData => {

        this.facturaDataList = facturaData.facturas;
        this.facturasTotalAmount = facturaData.facturasTotal;
        this.isDataTablaLoaded = facturaData.success;
        this.resultMessage = facturaData.message;
        this.isSpinnerLoading = false;
        this.setTableData();
      });
    }


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

  ngAfterViewInit(): void {
    // const queryParams = this.route.snapshot.queryParams;

    if(Object.keys(this.queryParams).length != 0) {
      this.setFilter(this.queryParams);
    }
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

    this.filteringForm.get('startDateControl')?.setValue(this.getFirstDayOfMonth());
    this.filteringForm.get('endDateControl')?.setValue(new Date());
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
    this.isSpinnerLoading = true;
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
    this.table2.dataSource = this.dataSource;
    this.dataSource.sort = this.sort;
    if(!this.tableDataSet) {
      this.dataSource.paginator = this.paginator;
      this.tableDataSet = true;
    }
  }

  filterFacturaData() {
    if (!this.filteringForm.valid) {
      return;
    }
    this.isSpinnerLoading = true;
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
      ruc: this.filteringForm.value.ruc,
      i_estatus: this.filteringForm.value.tipoEstadoControl,
      i_tipo_op: this.filteringForm.value.tipoOperControl,
      i_tipo_doc: this.filteringForm.value.tipoDocControl,
      i_forma_pago: this.filteringForm.value.formaPagoControl,
      i_pagina: 1,
      i_registropagina: this.facturasPerPage
    }
    console.log('this.filteringData>>>>>', this.filteringData);
  }

  getFirstDayOfMonth(): Date {
    const currentDate = new Date();
    return new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  }

  getFirstDayOfYear(): Date {
    const currentDate = new Date();
    return new Date(currentDate.getFullYear(), 0, 1);
  }

  downloadCaffePDF(facturaNumber: number) {

    const isSigned = true;
    facturaNumber = 1024139574;
    // const url = 'https://factura.key-pac.com/KeyPac/Facturacion/ExportZip/' + facturaNumber + '?issigned=' + isSigned;
    const url = window.location.origin + "/assets/" + facturaNumber + ".pdf";
    const name = 'Pdf name';
    console.log('url>>>>', url);

    this.facturacionDataService.downloadCaffePDF(url, name);
  }

  requiredIfClearedValidator(predefinedDate: Date): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      // Check if the date is manually cleared (null) but was originally the predefined date
      if (value === null && predefinedDate && control.dirty) {
        return { required: true };
      }

      return null;
    };
  }

  setFilter(data: any): void {
console.log("data>>>>", data);
  switch (data.category) {
    case 'Aprobado':
      this.filteringForm.controls['tipoEstadoControl'].setValue('1');
        break;
    case 'Pendiente':
      this.filteringForm.controls['tipoEstadoControl'].setValue('3');
        break;
    case 'Rechazado':
      this.filteringForm.controls['tipoEstadoControl'].setValue('2');
        break;
    case 'Facturas':
      this.filteringForm.controls['tipoDocControl'].setValue(['01', '02', '03', '08', '10']);
        break;
    case 'Credito':
      this.filteringForm.controls['tipoDocControl'].setValue(['04', '06']);
        break;
    case 'Debito':
      this.filteringForm.controls['tipoDocControl'].setValue(['05', '07']);
        break;
  }

    if (data.date == 3) {
      this.filteringForm.get('startDateControl')?.setValue(this.getFirstDayOfYear());
    }
    else if (data.date == 2) {
      this.filteringForm.get('startDateControl')?.setValue(this.getFirstDayOfMonth());
    }
    else {
      this.filteringForm.get('startDateControl')?.setValue(new Date());
    }
    this.filteringForm.controls['tipoSucursalControl'].setValue(data.sucursal);

    this.updateDataFactura();
    this.getFacturaData(this.filteringData);
    this.facturaData$ = this.facturacionDataService.getFacturasUpdatedListener()
      .subscribe(facturaData => {
        this.facturaDataList = facturaData.facturas;
        this.facturasTotalAmount = facturaData.facturasTotal;
        this.isDataTablaLoaded = facturaData.success;
        this.resultMessage = facturaData.message;
        this.isSpinnerLoading = false;
        this.setTableData();
      });
  }
}


