import { TestBed } from '@angular/core/testing';

import { PermitionPageGuard } from './permition-page.guard';

describe('PermitionPageGuard', () => {
  let guard: PermitionPageGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PermitionPageGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
