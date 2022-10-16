import { TestBed } from '@angular/core/testing';

import { GatewayResService } from './gateway-res.service';

describe('GatewayResService', () => {
  let service: GatewayResService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GatewayResService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
