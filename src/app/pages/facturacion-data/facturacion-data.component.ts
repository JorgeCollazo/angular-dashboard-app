import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { FacturacionDataItem } from './facturacion-data-datasource';
import { EXAMPLE_DATA } from './facturacion-data-datasource'
import { NgForm } from '@angular/forms';
import { FacturacionDataService } from './facturacion-data.service';
interface Post {
  userId: number;
  id: number;
  title: string;
  completed: string;
}

@Component({
  selector: 'app-facturacion-data',
  templateUrl: './facturacion-data.component.html',
  styleUrls: ['./facturacion-data.component.css']
})

export class FacturacionDataComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<FacturacionDataItem>;

  dataSource:  MatTableDataSource<FacturacionDataItem>;

  fecha_inicio: Date = new Date();
  fecha_fin: Date = new Date();
  sucursal: string = "";
  evento: string = "";
  t_pago: string = "";
  tipo_doc: string = "";
  tipo_op: string = "";
  status: string = "";

  EXAMPLE_DATA: FacturacionDataItem[] = [
    {nro: 1, fecha_creacion: new Date(), fecha_inicio: new Date(), t_pago: 51, t_doc: 15, t_op: 71, status: 1, evento: 1, sucursal: 'Xtra'},
    {nro: 2, fecha_creacion: new Date(), fecha_inicio: new Date(), t_pago: 52, t_doc: 25, t_op: 72, status: 2, evento: 2, sucursal: 'Campeon'},
    {nro: 3, fecha_creacion: new Date(), fecha_inicio: new Date(), t_pago: 53, t_doc: 35, t_op: 73, status: 3, evento: 3, sucursal: 'El Costo'},
    {nro: 4, fecha_creacion: new Date(), fecha_inicio: new Date(), t_pago: 54, t_doc: 45, t_op: 74, status: 4, evento: 4, sucursal: 'Oca Loca'},
    {nro: 5, fecha_creacion: new Date(), fecha_inicio: new Date(), t_pago: 55, t_doc: 55, t_op: 75, status: 5, evento: 5, sucursal: 'Conway'},
    {nro: 6, fecha_creacion: new Date(), fecha_inicio: new Date(), t_pago: 56, t_doc: 65, t_op: 76, status: 6, evento: 6, sucursal: 'Titan'},
    {nro: 7, fecha_creacion: new Date(), fecha_inicio: new Date(), t_pago: 57, t_doc: 75, t_op: 77, status: 7, evento: 7, sucursal: 'Super 99'},
  ]

  /* Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['nro', 'fecha_creacion', 'evento', 'sucursal', 't_pago', 't_doc', 't_op', 'status', 'actions'];

  constructor(private facturacionService: FacturacionDataService) {
    this.dataSource = new MatTableDataSource<FacturacionDataItem>(EXAMPLE_DATA);
  }

  ngOnInit(): void {
    for(let i=0; EXAMPLE_DATA.length<100; i++) {
      let j = this.getRandomInt(6)
      EXAMPLE_DATA.push(EXAMPLE_DATA[j]);
    }
    console.log(EXAMPLE_DATA);
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  applyFilter(event: Event): void {
    let filterValue = (event.target as HTMLInputElement)?.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  resetForm(filteringForm: NgForm) {
    filteringForm.reset();
  }

  getRandomInt(max: number) {
    return Math.floor(Math.random() * max);
  }
}
