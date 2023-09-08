import {
  Component,
  ViewChild,
  OnInit,
  OnDestroy,
  AfterViewInit,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';

import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';

import { IDataSucursalScheme } from 'src/app/interfaces/sucursal.interface';
import { IDataSchemeCommon } from 'src/app/interfaces/common.interface';
import { IDataFacturaScheme } from 'src/app/interfaces/facturaData.interface';
// import { FacturacionDataItem } from './facturacion-data-datasource';
import { EXAMPLE_DATA } from './facturacion-data-datasource';
import { FacturacionDataService } from '../../services/facturacion-data/facturacion-data.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ActivatedRoute } from '@angular/router';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { IResumenData } from 'src/app/interfaces/IResumenData.interface';

// import pdfMake from 'pdfmake/build/pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';
// pdfMake.vfs = pdfFonts.pdfMake.vfs;

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { MatSelect } from '@angular/material/select';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-facturacion-data',
  templateUrl: './facturacion-data.component.html',
  styleUrls: ['./facturacion-data.component.css'],
})
export class FacturacionDataComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<IDataFacturaScheme>;
  @ViewChild('table2') table2!: MatTable<IDataFacturaScheme>;
  @ViewChild('table3') table3!: MatTable<IResumenData>;
  @ViewChild('tipo_pago_select') tipo_pago_select!: MatSelect;
  @ViewChild('tipo_operacion_select') tipo_operacion_select!: MatSelect;
  @ViewChild('estado_select') estado_select!: MatSelect;
  @ViewChild('sucursal_select') sucursal_select!: MatSelect;
  @ViewChild('tipo_doc_select') tipo_doc_select!: MatSelect;

  dataSource: MatTableDataSource<IDataFacturaScheme> =
    new MatTableDataSource<IDataFacturaScheme>();

  dataSourceTotales: MatTableDataSource<IResumenData> =
    new MatTableDataSource<IResumenData>();

  filteringForm!: FormGroup;
  fecha_inicio: Date = new Date();
  fecha_fin: Date = new Date();
  sucursal_id: string = '';
  sucursal_label: string = 'Todos';
  evento: string = '';
  t_pago: string = '';
  t_pago_label: string = 'Todos';
  tipo_doc: string = '';
  tipo_doc_label: string = '';
  tipo_op: string = '';
  tipo_op_label: string = 'Todos';
  status: string = '';
  status_label: string = 'Todos';
  facturasPerPage: number = 25;
  currentPage: number = 1;
  pageSizeOptions = [25, 50, 100];
  facturasTotalAmount: number = 0;
  sucursales: IDataSucursalScheme[] = [];
  formasPago: IDataSchemeCommon[] = [];
  natOperaciones: IDataSchemeCommon[] = [];
  tipoDocs: IDataSchemeCommon[] = [];
  feStatusList: IDataSchemeCommon[] = [];
  facturaDataList: IDataFacturaScheme[] = [];
  facturasTotales: IResumenData[] = [];
  tempDate: string = new Date().toLocaleDateString('en-GB');
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
  private totalesFacturas$: Subscription = new Subscription();

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
    i_registropagina: this.facturasPerPage,
  };

  /* Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'rownum',
    'ruc',
    'transCode',
    'fecha',
    'suc',
    'fpago',
    'tipodoc',
    'nop',
    'estatus',
    'actions',
  ];
  displayedColumnsAuditoria = [
    'rownum',
    'ruc',
    'transCode',
    'tipodoc',
    'receptor',
    'subtotal',
    'montodesc',
    'itbmTotal',
    'total',
    'exento',
    'ISC_5%',
    'subtot_imp2_7%',
    '%imp2_7%',
    'subtot_imp3_10%',
    '%imp3_10%',
    'subtot_imp4_15%',
    '%imp4_15%',
    'actions',
  ];
  displayedColumnsAuditoria2 = [
    'rownum',
    'subtotal',
    'montodesc',
    'exento',
    'gravado',
    'itbms_percent',
    'itbms',
    'total',
  ];

  constructor(
    private facturacionDataService: FacturacionDataService,
    private datePipe: DatePipe,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.filteringForm = new FormGroup({
      startDateControl: this.startDateControl,
      endDateControl: this.endDateControl,
      formaPagoControl: new FormControl(),
      tipoDocControl: new FormControl(),
      tipoOperControl: new FormControl(),
      tipoEstadoControl: new FormControl(),
      tipoSucursalControl: new FormControl(),
      ruc: new FormControl(),
    });

    this.facturacionDataService.getSucursales();
    this.datosSucursales =
      this.facturacionDataService.getDatosSucursalesListener.subscribe(
        (sucursales) => {
          this.sucursales = sucursales.sucursalList;
        }
      );

    this.formasPago$ = this.facturacionDataService
      .getFormaPago()
      .subscribe((formasPago) => {
        this.formasPago = formasPago;
      });

    this.natOperacion$ = this.facturacionDataService
      .getNatOperacion()
      .subscribe((natOper) => {
        this.natOperaciones = natOper;
      });

    this.tipoDoc$ = this.facturacionDataService
      .getTipoDoc()
      .subscribe((tipoDoc) => {
        this.tipoDocs = tipoDoc;
      });

    this.feStatus$ = this.facturacionDataService
      .getFEstatus()
      .subscribe((feStatus) => {
        this.feStatusList = feStatus;
      });

    if (Object.keys(this.queryParams).length == 0) {
      this.getFacturaData(this.filteringData);

      this.facturaData$ = this.facturacionDataService
        .getFacturasUpdatedListener()
        .subscribe((facturaData) => {
          this.facturaDataList = facturaData.facturas;
          this.facturasTotalAmount = facturaData.facturasTotal;
          this.isDataTablaLoaded = facturaData.success;
          this.resultMessage = facturaData.message;
          this.isSpinnerLoading = false;
          this.setTableData();
        });
    }
  }

  ngAfterViewInit(): void {
    if (Object.keys(this.queryParams).length != 0) {
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
    this.totalesFacturas$.unsubscribe();
  }

  applyFilter(event: Event): void {
    let filterValue = (event.target as HTMLInputElement)?.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  resetForm() {
    this.filteringForm.reset();

    this.filteringForm
      .get('startDateControl')
      ?.setValue(this.getFirstDayOfMonth());
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
    this.dataSource = new MatTableDataSource<IDataFacturaScheme>(
      this.facturaDataList
    );
    this.dataSourceTotales = new MatTableDataSource<IResumenData>(
      this.facturasTotales
    );

    this.table.dataSource = this.dataSource;
    this.table2.dataSource = this.dataSource;
    this.table3.dataSource = this.dataSourceTotales;

    this.dataSource.sort = this.sort;
    if (!this.tableDataSet) {
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
    this.getFacturasTotales();
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
      i_filtrocia: 1, //this.filteringForm.value.tipo  -----> Filtro de empresa
      ruc: this.filteringForm.value.ruc,
      i_estatus: this.filteringForm.value.tipoEstadoControl,
      i_tipo_op: this.filteringForm.value.tipoOperControl,
      i_tipo_doc: this.filteringForm.value.tipoDocControl,
      i_forma_pago: this.filteringForm.value.formaPagoControl,
      i_pagina: 1,
      i_registropagina: this.facturasPerPage,
    };
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
    const url = window.location.origin + '/assets/' + facturaNumber + '.pdf';
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
    console.log('data>>>>', data);
    switch (data.category) {
      case 'Aprobado':
        this.filteringForm.controls['tipoEstadoControl'].setValue('1');
        this.status_label = 'Aprobado';
        break;
      case 'Pendiente':
        this.filteringForm.controls['tipoEstadoControl'].setValue('3');
        this.status_label = 'Pendiente';
        break;
      case 'Rechazado':
        this.filteringForm.controls['tipoEstadoControl'].setValue('2');
        this.status_label = 'Rechazado';
        break;
      case 'Facturas':
        this.filteringForm.controls['tipoDocControl'].setValue([
          '01',
          '02',
          '03',
          '08',
          '10',
        ]);
        break;
      case 'Credito':
        this.filteringForm.controls['tipoDocControl'].setValue(['04', '06']);
        break;
      case 'Debito':
        this.filteringForm.controls['tipoDocControl'].setValue(['05', '07']);
        break;
    }

    if (data.date == 3) {
      this.filteringForm
        .get('startDateControl')
        ?.setValue(this.getFirstDayOfYear());
    } else if (data.date == 2) {
      this.filteringForm
        .get('startDateControl')
        ?.setValue(this.getFirstDayOfMonth());
    } else {
      this.filteringForm.get('startDateControl')?.setValue(new Date());
    }
    this.filteringForm.controls['tipoSucursalControl'].setValue(data.sucursal);

    this.updateDataFactura();
    this.getFacturaData(this.filteringData);
    this.facturaData$ = this.facturacionDataService
      .getFacturasUpdatedListener()
      .subscribe((facturaData) => {
        this.facturaDataList = facturaData.facturas;
        this.facturasTotalAmount = facturaData.facturasTotal;
        this.isDataTablaLoaded = facturaData.success;
        this.resultMessage = facturaData.message;
        this.isSpinnerLoading = false;
        this.setTableData();
      });
    this.totalesFacturas$ = this.facturacionDataService
      .getFacturasTotales(this.filteringData)
      .subscribe((totales) => {
        this.facturasTotales = totales;
      });
  }
  onLoadTabPanel3Data(event: MatTabChangeEvent): void {
    this.getFacturasTotales();
  }

  getFacturasTotales() {
    this.updateDataFactura();
    this.totalesFacturas$ = this.facturacionDataService
      .getFacturasTotales(this.filteringData)
      .subscribe((totales) => {
        this.facturasTotales = totales;
      });
  }

  createPdf() {
    console.log('this.filteringData>>>>>>>>>', this.filteringData);
    console.log('this.filteringForm>>>>>>>>>', this.filteringForm);
    console.log('facturaDataList>>>>>>>>>', this.facturaDataList);

    const dynamicData = [
      ['John', 30],
      ['Alice', 25],
      ['Bob', 40],
    ];

    const pdfDefinition: any = {
      content: [
        {
          text: `Reporte de Transacciones \n \n`,
          style: 'header',
        },
        {
          text: [
            { text: 'Sucursal: ', style: 'subheader' },
            { text: this.sucursal_label + '\n \n', style: 'sub' },
          ],
        },
        {
          style: 'tableExample',
          table: {
            widths: [100, 100, 100, '*'],
            body: [
              [
                {
                  text:[
                    {text: 'Fecha inicio: ', bold: true}, this.filteringData.i_fechaini.toLocaleDateString(),
                    {text: '      Tipo de Pago: ', bold: true}, this.t_pago_label,
                    {text: '      Tipo de Operación: ', bold: true}, this.tipo_op_label,
                    {text: '      Estado: ', bold: true}, this.status_label,
                  ],
                  colSpan: 4,
                  border: [true, true, true, false],

                },
                '',
                '',
                '',
              ],
              [
                {
                  text:[
                    {text: 'Fecha fin: ', bold: true}, this.filteringData.i_fechafin.toLocaleDateString(),
                    {text: '      RUC:  ', bold: true}, this.filteringForm.get('ruc')?.value ?? '-',
                    {text: '      Tipo de Pago: ', bold: true}, this.status_label,

                  ],
                  colSpan: 4,
                  border: [true, false, true, true],
                },
                '',
                '',
                '',
              ]
            ],
          },
        },
        {
          style: 'tableExample',
          table: {
            body: [
              ['Nro.', 'RUC', 'Cod.Transacción', 'Fecha Emisión', 'Sucursal', 'Tipo Pago', 'Tipo Documento', 'Tipo Operación', 'Estado'],
              ['Sample value 1', 'Sample value 2', 'Sample value 3', 'Sample value 3', 'Sample value 3', 'Sample value 3', 'Sample value 3', 'Sample value 3', 'Sample value 3'],
            ]
          },
          layout: {
            fillColor: function (rowIndex: any, node:any , columnIndex: any) {
              return (rowIndex === 0) ? '#08c49e' : null;
            }
          }
        },
      ],

      styles: {
        header: {
          alignment: 'center',
          bold: true,
          fontSize: '16',
        },
        subheader: {
          alignment: 'center',
          fontSize: '14',
          bold: true,
        },
        sub: {
          alignment: 'center',
          fontSize: '14',
        },
        tableExample: {
          margin: [0, 5, 0, 15],
          fontSize: '10',
        },
      },
    };

    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();
  }

  onSelectChangeTipoPago(): void {
    this.t_pago_label = this.tipo_pago_select.triggerValue;
  }

  onSelectChangeTipoOperacion(): void {
    this.tipo_op_label = this.tipo_operacion_select.triggerValue;
  }

  onSelectChangeEstado(): void {
    this.status_label = this.estado_select.triggerValue;
  }

  onSelectChangeSucursal(): void {
    this.sucursal_label = this.sucursal_select.triggerValue;
  }
  selectedLabels: string[] = [];
  onSelectChangeTipoDoc(event: any): void {
    console.log('this.filteringForm>>>>', this.filteringForm);
    console.log('event>>>>', event);
    this.tipo_doc_label = this.tipo_doc_select.triggerValue;

    this.selectedLabels = event.value.map((option: any) => option.name);
    console.log('selectedLabels>>>>', this.selectedLabels);
  }

}
