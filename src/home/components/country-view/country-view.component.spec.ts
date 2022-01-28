import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CountryViewComponent} from './country-view.component';
import {GeoJsService} from "../../services/geo-js.service";
import {NEVER, of} from "rxjs";
import {By} from "@angular/platform-browser";

describe('CountryViewComponent', () => {
  let component: CountryViewComponent;
  let fixture: ComponentFixture<CountryViewComponent>;
  let mockedGeoJsService: jasmine.SpyObj<GeoJsService>;
  beforeEach(async () => {
    mockedGeoJsService = jasmine.createSpyObj("MockedGeoJsService", ["getCountryInformation"]);
    await TestBed.configureTestingModule({
      declarations: [CountryViewComponent],
      providers: [
        {provide: GeoJsService, useValue: mockedGeoJsService}
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryViewComponent);
    component = fixture.componentInstance;
  });

  describe("without data return", () => {
    beforeEach(() => {
      mockedGeoJsService.getCountryInformation.and.returnValue(NEVER);
      fixture.detectChanges();
    });

    it('should display div with loader message when service has not yet emitted value', () => {
      const loaderDiv = fixture.debugElement.query(By.css('.loader'));
      expect(loaderDiv).toBeTruthy();
    });
  });

  describe("without data return", () => {
    let returnValueOfService = {
      country_3: '3',
      ip: 'expected ip',
      name: 'expected name',
      country: 'expected country'
    };

    beforeEach(() => {
      mockedGeoJsService.getCountryInformation.and.returnValue(of(returnValueOfService));
      fixture.detectChanges();
    });

    it('should display div with emitted IP and country name when service has emitted value', () => {
      const loaderDiv = fixture.debugElement.query(By.css('.loader'));
      expect(loaderDiv).toBeFalsy();

      const ipInfoDiv = fixture.debugElement.query(By.css('.country-info'));
      expect(ipInfoDiv.nativeElement.textContent).toContain('expected ip');
      expect(ipInfoDiv.nativeElement.textContent).toContain('expected name');
    });
  });

});
