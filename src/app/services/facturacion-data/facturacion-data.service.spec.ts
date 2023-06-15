import { TestBed } from '@angular/core/testing';

import { FacturacionDataService } from './facturacion-data.service';

describe('FacturacionDataService', () => {
  let service: FacturacionDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FacturacionDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
