import { TestBed } from '@angular/core/testing';

import { GeoJsService } from './geo-js.service';

describe('GeoJsService', () => {
  let service: GeoJsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeoJsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit a expected value when using getCountryInformation function', () => {
    // TODO: fill
  });

  it('should emit a expected value after specified delay when using getCountryInformationDelayed function', () => {
    // TODO: fill
  });

});
