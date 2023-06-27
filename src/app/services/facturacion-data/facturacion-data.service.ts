import { Injectable } from '@angular/core';

interface DataScheme {
  name: string;
  value: number;
}

@Injectable({
  providedIn: 'root'
})

export class FacturacionDataService {

  private facturacionData: DataScheme[] =
  [
    {
      "name": "Aprobados",
      "value": 5000000
    },
    {
      "name": "Pendientes",
      "value": 7200000
    },
      {
      "name": "Rechazados",
      "value": 6200000
    }
  ];

  private facturacionData2: DataScheme[] =
  [
    {
      "name": "Factura",
      "value": 5000000
    },
    {
      "name": "Débito",
      "value": 7200000
    },
      {
      "name": "Crédito",
      "value": 6200000
    }
  ];

  constructor() { }

  get getFacturacionData() {
    return this.facturacionData;
  }

  get getFacturacionData2() {
    return this.facturacionData2;
  }
}
