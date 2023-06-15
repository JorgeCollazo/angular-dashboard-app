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
  dataSource: FacturacionDataDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['nro', 'fecha_creacion', 'evento', 'sucursal', 't_pago', 't_doc', 't_op', 'status', 'actions'];

  // dataSource = new MatTableDataSource(EXAMPLE_DATA)

  userColl = new MatTableDataSource<FacturacionDataItem>([]);
  constructor() {
    this.dataSource = new FacturacionDataDataSource();
  }


  ngAfterViewInit(): void {

    this.userColl = new MatTableDataSource(EXAMPLE_DATA);

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    // this.table.dataSource = this.dataSource;
    this.table.dataSource = this.userColl;
  }

  applyFilter(event: Event): void {
    let filterValue = (event.target as HTMLInputElement)?.value;
    console.log(filterValue);
    console.log(this.dataSource);
    // console.log(this.dataSource2);

    this.userColl.filter = filterValue.trim().toLowerCase();
  }
}
