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
      "name": "Germany",
      "value": 8940000
    },
    {
      "name": "USA",
      "value": 5000000
    },
    {
      "name": "Panama",
      "value": 7200000
    },
      {
      "name": "UK",
      "value": 6200000
    }
  ];

  constructor() { }

  get getFacturacionData() {
    return this.facturacionData;
  }
}
