import {fakeAsync, TestBed, tick} from '@angular/core/testing';

import {GeoJsService} from './geo-js.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('GeoJsService', () => {
  let service: GeoJsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(GeoJsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit a expected value when using getCountryInformation function', (done) => {
    service.getCountryInformation().subscribe((infoFromService) => {
      expect(infoFromService).toEqual({
        country: 'expectedCountry',
        ip: 'expectedIp',
        name: 'expectedName',
        country_3: 'exp'
      });
      done();
    })

    const request = httpMock.expectOne('https://get.geojs.io/v1/ip/country.json');
    request.flush({
      country: 'expectedCountry',
      ip: 'expectedIp',
      name: 'expectedName',
      country_3: 'exp'
    });

  });

  it('should emit a expected value when using getCountryInformationDelayed function', fakeAsync(() => {
    service.getCountryInformationDelayed(5).subscribe((infoFromService) => {
      expect(infoFromService).toEqual({
        country: 'expectedCountry',
        ip: 'expectedIp',
        name: 'expectedName',
        country_3: 'exp'
      });
    });

    const request = httpMock.expectOne('https://get.geojs.io/v1/ip/country.json');
    request.flush({
      country: 'expectedCountry',
      ip: 'expectedIp',
      name: 'expectedName',
      country_3: 'exp'
    });

    tick(5000);
  }));

});
