import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {delay, Observable} from "rxjs";
import {IRawCountry} from "../models/country";

@Injectable({
  providedIn: 'root'
})
export class GeoJsService {
  private readonly apiRoot = 'https://get.geojs.io/v1/ip';

  constructor(private readonly httpClient: HttpClient) {
  }

  public getCountryInformation(): Observable<IRawCountry> {
    const url = `${this.apiRoot}/country.json`;
    return this.httpClient.get<IRawCountry>(url);
  }

  public getCountryInformationDelayed(secondsOfDelay: number): Observable<IRawCountry> {
    const url = `${this.apiRoot}/country.json`;
    return this.httpClient.get<IRawCountry>(url).pipe(delay(secondsOfDelay * 1000));
  }
}
