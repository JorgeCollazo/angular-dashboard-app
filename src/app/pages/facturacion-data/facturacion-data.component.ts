import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { FacturacionDataDataSource, FacturacionDataItem } from './facturacion-data-datasource';
import { EXAMPLE_DATA } from './facturacion-data-datasource'

@Component({
  selector: 'app-facturacion-data',
  templateUrl: './facturacion-data.component.html',
  styleUrls: ['./facturacion-data.component.css']
})
export class FacturacionDataComponent implements AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<FacturacionDataItem>;

  dataSource:  MatTableDataSource<FacturacionDataItem>;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['nro', 'fecha_creacion', 'evento', 'sucursal', 't_pago', 't_doc', 't_op', 'status', 'actions'];

  // dataSource = new MatTableDataSource(EXAMPLE_DATA)

  // userColl = new MatTableDataSource<FacturacionDataItem>([]);

  constructor() {
    this.dataSource = new MatTableDataSource<FacturacionDataItem>;
  }


  ngAfterViewInit(): void {

    this.dataSource = new MatTableDataSource(EXAMPLE_DATA);

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  applyFilter(event: Event): void {
    let filterValue = (event.target as HTMLInputElement)?.value;
    console.log(filterValue);
    console.log(this.dataSource);
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
