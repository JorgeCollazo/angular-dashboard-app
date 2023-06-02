import { TestBed } from '@angular/core/testing';

import { BreadcrumbResolveService } from './breadcrumb-resolve.service';

describe('BreadcrumbResolveService', () => {
  let service: BreadcrumbResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreadcrumbResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
