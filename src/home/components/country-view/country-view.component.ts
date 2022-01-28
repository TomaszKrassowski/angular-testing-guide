import {Component, OnInit} from '@angular/core';
import {GeoJsService} from "../../services/geo-js.service";
import {Observable} from "rxjs";
import {IRawCountry} from "../../models/country";

@Component({
  selector: 'app-country-view',
  templateUrl: './country-view.component.html',
  styleUrls: ['./country-view.component.scss'],
})
export class CountryViewComponent implements OnInit {
  public userCountryIPAddress$!: Observable<IRawCountry>;

  constructor(private readonly geoJsService: GeoJsService) {
  }

  ngOnInit(): void {
    this.userCountryIPAddress$ = this.geoJsService.getCountryInformation();
  }

}
