import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Color, ScaleType } from '@swimlane/ngx-charts';
import { FacturacionDataService } from 'src/app/services/facturacion-data/facturacion-data.service';
import { IDataScheme } from '../../interfaces/factura.interface';
import { Subscription } from 'rxjs';
import { IDataSucursalScheme } from 'src/app/interfaces/sucursal.interface';
import { Router } from '@angular/router';
import { MatButtonToggleGroup } from '@angular/material/button-toggle';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {

  @ViewChild('toggleGroupEstados') toggleGroupEstados!: MatButtonToggleGroup;

  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 },
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 },
      ];
    })
  );

  // options
  view: [number, number] = [800, 200];
  activeEntries: any[] = [2, 1];
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  colorScheme = 'cool';

  dateNow = new Date(Date.now());
  lastDateTimeUpdate: string = '';

  // sucursales = [
  //   {id: 1, name: 'Xtra'},
  //   {id: 2, name: 'El Campeon'},
  //   {id: 3, name: 'Oca Loca'},
  //   {id: 4, name: 'El Costo'}
  // ]

  sucursales: IDataSucursalScheme[] = [];

  private facturasSub: Subscription = new Subscription();
  private facturasTipoDocSub: Subscription = new Subscription();
  private datosSucursales: Subscription = new Subscription();
  private lastDateTimeUpdateSub: Subscription = new Subscription();

  facturasEstado: IDataScheme[] = [];
  facturasTipoDoc: IDataScheme[] = [];
  sucursal_id: string = '';
  date_id: number = 3; // Dia: 1, Mes: 2, Año: 3
  is_loading_spinner_estados: boolean = true;
  is_loading_spinner_tipo_doc: boolean = true;
  is_data_estado_loaded: boolean = true;
  is_data_tipo_Doc_loaded: boolean = true;


  constructor(
    private breakpointObserver: BreakpointObserver,
    private facturacionDataService: FacturacionDataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.facturacionDataService.getSucursales();
    this.datosSucursales = this.facturacionDataService.getDatosSucursalesListener.subscribe(
      (sucursales => {
        sucursales.sucursalList.shift();
        this.sucursal_id = sucursales.sucursalList[0].cod    // Setting the code of the first sucursal
        this.sucursales = sucursales.sucursalList;

        this.facturacionDataService.getFacturasEstado(
          this.date_id,
          this.sucursal_id
        );
        this.facturacionDataService.getFacturasTipoDoc(
          this.date_id,
          this.sucursal_id
        );
      })
    );

    this.facturasSub =
      this.facturacionDataService.getDatosFacturasListener.subscribe(
        (facturasData: IDataScheme[]) => {
          this.facturasEstado = facturasData;
          if (facturasData.length <= 0) {

            this.is_loading_spinner_estados = false;
          } else {
            this.is_loading_spinner_estados = false;
            this.is_data_estado_loaded = true;
          }
        }
      );

    this.facturasTipoDocSub =
      this.facturacionDataService.getDatosFacturasTipoDocListener.subscribe(
        (facturasData: IDataScheme[]) => {
          this.facturasTipoDoc = facturasData;

          if (facturasData.length <= 0) {
            this.is_loading_spinner_tipo_doc = false;
          } else {
            this.is_loading_spinner_tipo_doc = false;
            this.is_data_tipo_Doc_loaded = true;
          }
        }
      );
    this.facturacionDataService.getServerDateTime();
    this.lastDateTimeUpdateSub =
      this.facturacionDataService.getLastDateUpdateListener.subscribe(
        (updatedDate) => {
          this.lastDateTimeUpdate = updatedDate;
        }
      );
  }

  onSucursalChangeSelection(e: any): void {
    this.sucursal_id = e.value;
    this.facturacionDataService.getFacturasEstado(this.date_id, e.value);
    this.facturacionDataService.getFacturasTipoDoc(this.date_id, e.value);
  }

  onDateChange(e: any): void {
    this.date_id = e.value;
    this.facturacionDataService.getFacturasEstado(e.value, this.sucursal_id);
    this.facturacionDataService.getFacturasTipoDoc(e.value, this.sucursal_id);
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
    const dashboardData = {
      date: this.date_id,
      sucursal: this.sucursal_id,
      category: data.label
    }
    console.log('dashboardData', dashboardData);
    // const queryParams = encodeURIComponent(JSON.stringify(dashboardData));

    this.router.navigate(['app/pages/data-filter'], { queryParams: dashboardData});
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  ngOnDestroy() {
    this.facturasSub.unsubscribe();
    this.facturasTipoDocSub.unsubscribe();
    this.lastDateTimeUpdateSub.unsubscribe();
    this.datosSucursales.unsubscribe();
  }
}
