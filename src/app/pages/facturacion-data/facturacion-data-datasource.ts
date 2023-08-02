import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { IDataFacturaScheme } from 'src/app/interfaces/facturaData.interface';

// TODO: Replace this with your own data model type
// export interface FacturacionDataItem {
//   nro: number;
//   fecha_creacion: Date;
//   fecha_inicio: Date;
//   t_pago: number;
//   t_doc: number;
//   t_op: number;
//   status: number;
//   evento: number;
//   sucursal: string;
// }

// TODO: replace this with real data from your application
export const EXAMPLE_DATA: IDataFacturaScheme[] = [
]
// export const EXAMPLE_DATA: FacturacionDataItem[] = [
//   {nro: 1, fecha_creacion: new Date(), fecha_inicio: new Date(), t_pago: 51, t_doc: 15, t_op: 71, status: 1, evento: 1, sucursal: 'Xtra'},
//   {nro: 2, fecha_creacion: new Date(), fecha_inicio: new Date(), t_pago: 52, t_doc: 25, t_op: 72, status: 2, evento: 2, sucursal: 'Campeon'},
//   {nro: 3, fecha_creacion: new Date(), fecha_inicio: new Date(), t_pago: 53, t_doc: 35, t_op: 73, status: 3, evento: 3, sucursal: 'El Costo'},
//   {nro: 4, fecha_creacion: new Date(), fecha_inicio: new Date(), t_pago: 54, t_doc: 45, t_op: 74, status: 4, evento: 4, sucursal: 'Oca Loca'},
//   {nro: 5, fecha_creacion: new Date(), fecha_inicio: new Date(), t_pago: 55, t_doc: 55, t_op: 75, status: 5, evento: 5, sucursal: 'Conway'},
//   {nro: 6, fecha_creacion: new Date(), fecha_inicio: new Date(), t_pago: 56, t_doc: 65, t_op: 76, status: 6, evento: 6, sucursal: 'Titan'},
//   {nro: 7, fecha_creacion: new Date(), fecha_inicio: new Date(), t_pago: 57, t_doc: 75, t_op: 77, status: 7, evento: 7, sucursal: 'Super 99'},
// ]
/**
 * Data source for the FacturacionData view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class FacturacionDataDataSource extends DataSource<IDataFacturaScheme> {
  data: IDataFacturaScheme[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<IDataFacturaScheme[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: IDataFacturaScheme[]): IDataFacturaScheme[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: IDataFacturaScheme[]): IDataFacturaScheme[] { console.log(data);

    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'numeroFE': return compare(a.numeroFE, b.numeroFE, isAsc);
        case 'fecha': return compare(a.fecha, b.fecha, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number | Date, b: string | number | Date, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

