import { TestBed } from '@angular/core/testing';

import { PeripheralResService } from './peripheral-res.service';

describe('PeripheralResService', () => {
  let service: PeripheralResService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeripheralResService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
