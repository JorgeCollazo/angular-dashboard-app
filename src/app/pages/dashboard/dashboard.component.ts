import { Component } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Color, ScaleType  } from '@swimlane/ngx-charts';
import { FacturacionDataService } from 'src/app/services/facturacion-data/facturacion-data.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { title: 'Card 1', cols: 1, rows: 1 },
          { title: 'Card 2', cols: 1, rows: 1 },
          { title: 'Card 3', cols: 1, rows: 1 },
          { title: 'Card 4', cols: 1, rows: 1 }
        ];
      }

      return [
        { title: 'Card 1', cols: 2, rows: 1 },
        { title: 'Card 2', cols: 1, rows: 1 },
        { title: 'Card 3', cols: 1, rows: 2 },
        { title: 'Card 4', cols: 1, rows: 1 }
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
  colorScheme = 'cool'

  dateNow = new Date(Date.now());
  lastDay = this.dateNow.toLocaleString();
  sucursales = [
    {id: 1, name: 'Xtra'},
    {id: 2, name: 'El Campeon'},
    {id: 3, name: 'Oca Loca'},
    {id: 4, name: 'El Costo'}
  ]

  constructor(private breakpointObserver: BreakpointObserver, private facturacionDataService: FacturacionDataService) {}

  get data() {
    return this.facturacionDataService.getFacturacionData;
  }

  get data2() {
    return this.facturacionDataService.getFacturacionData2;
  }

  onSelect(data: any): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data: any): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data: any): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
